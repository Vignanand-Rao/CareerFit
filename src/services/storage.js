/**
 * CareerFit Storage & Domain State Service
 * 
 * Implements strict separation of concerns across:
 * A. User Profile
 * B. Career Goal (with historical goal retention)
 * C. Assessment History
 * D. Career Progress
 * 
 * Includes defensive fallback handling for deployment across SSR, edge, and sandboxed storage environments.
 */

import { calculateReadiness, generateStudyPlan, ROLES } from "../utils/careerData.js";

const KEYS = {
  USER_PROFILE: "careerfit_user_profile",
  CAREER_GOAL: "careerfit_career_goal",
  ASSESSMENT_HISTORY: "careerfit_assessment_history",
  CAREER_PROGRESS: "careerfit_career_progress",
  ACTIVE_SESSION: "careerfit_active_session"
};

// Memory fallback if localStorage is disabled or restricted
const memoryStorage = {};

function safeStorageGet(key) {
  if (typeof window === "undefined" || !window.localStorage) {
    return memoryStorage[key] || null;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.warn(`[CareerFit Storage] Read fallback for ${key}:`, err);
    return memoryStorage[key] || null;
  }
}

function safeStorageSet(key, value) {
  const serialized = JSON.stringify(value);
  if (typeof window === "undefined" || !window.localStorage) {
    memoryStorage[key] = value;
    return;
  }
  try {
    window.localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn(`[CareerFit Storage] Write fallback for ${key}:`, err);
    memoryStorage[key] = value;
  }
}

function safeStorageRemove(key) {
  if (typeof window === "undefined" || !window.localStorage) {
    delete memoryStorage[key];
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch {
    delete memoryStorage[key];
  }
}

/**
 * Default fallback data structures
 */
const DEFAULT_USER_PROFILE = {
  id: "usr_guest",
  fullName: "CareerFit Member",
  email: "student@careerfit.io",
  skills: {
    Python: "Intermediate",
    SQL: "Beginner"
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DEFAULT_CAREER_GOAL = {
  id: "goal_default",
  targetRole: "Python Developer",
  careerPreferences: {
    employmentType: "Full-Time",
    targetTimeline: "3 Months"
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  goalHistory: []
};

const DEFAULT_PROGRESS = {
  completedTasks: ["DAY 01"],
  completedActivities: [],
  readinessHistory: []
};

// ==========================================
// A. USER PROFILE SERVICE
// ==========================================

export function getUserProfile() {
  const profile = safeStorageGet(KEYS.USER_PROFILE);
  return profile || DEFAULT_USER_PROFILE;
}

export function saveUserProfile(updates) {
  const current = getUserProfile();
  const updated = {
    ...current,
    ...updates,
    skills: updates.skills !== undefined ? updates.skills : (current.skills || {}),
    updatedAt: new Date().toISOString()
  };
  safeStorageSet(KEYS.USER_PROFILE, updated);
  return updated;
}

export function removeUserSkill(skillName) {
  const current = getUserProfile();
  const nextSkills = { ...(current.skills || {}) };
  delete nextSkills[skillName];
  return saveUserProfile({ skills: nextSkills });
}

// ==========================================
// B. CAREER GOAL SERVICE
// ==========================================

export function getCareerGoal() {
  const goal = safeStorageGet(KEYS.CAREER_GOAL);
  return goal || DEFAULT_CAREER_GOAL;
}

/**
 * Updates the user's target role while STRICTLY PRESERVING previous goal history.
 * Changing the role does NOT delete previous user skills or assessment history.
 */
export function setTargetJobRole(newRoleName, preferences = {}) {
  const current = getCareerGoal();
  if (current.targetRole === newRoleName) {
    return current;
  }

  // Preserve previous career goal into history
  const historyEntry = {
    role: current.targetRole,
    changedAt: new Date().toISOString(),
    durationDays: Math.max(1, Math.round((Date.now() - new Date(current.updatedAt || current.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
  };

  const updatedGoal = {
    ...current,
    targetRole: newRoleName,
    careerPreferences: {
      ...(current.careerPreferences || {}),
      ...preferences
    },
    updatedAt: new Date().toISOString(),
    goalHistory: [...(current.goalHistory || []), historyEntry]
  };

  safeStorageSet(KEYS.CAREER_GOAL, updatedGoal);
  return updatedGoal;
}

// ==========================================
// C. ASSESSMENT HISTORY SERVICE
// ==========================================

export function getAssessmentHistory() {
  const history = safeStorageGet(KEYS.ASSESSMENT_HISTORY);
  return Array.isArray(history) ? history : [];
}

export function recordAssessmentResult(result) {
  const history = getAssessmentHistory();
  const currentGoal = getCareerGoal();
  const newEntry = {
    id: `asm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId: getUserProfile().id,
    targetRole: currentGoal.targetRole,
    skill: result.skill,
    type: result.type,
    score: result.score,
    total: result.total,
    percentage: result.percentage,
    completedAt: result.completedAt || new Date().toISOString()
  };

  const updatedHistory = [newEntry, ...history];
  safeStorageSet(KEYS.ASSESSMENT_HISTORY, updatedHistory);

  // If user scored 75% or higher and didn't have the skill or was beginner, automatically reinforce proficiency
  if (typeof result.percentage === "number" && result.percentage >= 75) {
    const profile = getUserProfile();
    const currentProf = profile.skills?.[result.skill];
    if (!currentProf || currentProf === "Beginner") {
      saveUserProfile({
        skills: {
          ...(profile.skills || {}),
          [result.skill]: result.percentage >= 90 ? "Advanced" : "Intermediate"
        }
      });
    }
  }

  return updatedHistory;
}

// ==========================================
// D. CAREER PROGRESS SERVICE
// ==========================================

export function getCareerProgress() {
  const progress = safeStorageGet(KEYS.CAREER_PROGRESS);
  return progress || DEFAULT_PROGRESS;
}

export function toggleStudyTaskCompleted(dayId) {
  const current = getCareerProgress();
  const exists = (current.completedTasks || []).includes(dayId);
  const nextTasks = exists
    ? current.completedTasks.filter(d => d !== dayId)
    : [...(current.completedTasks || []), dayId];

  const updated = {
    ...current,
    completedTasks: nextTasks
  };
  safeStorageSet(KEYS.CAREER_PROGRESS, updated);
  return updated;
}

// ==========================================
// AGGREGATE DASHBOARD STATE CALCULATOR
// ==========================================

/**
 * Returns a fully calculated, coherent snapshot of the dashboard.
 * Ensures the dashboard adapts dynamically to any changes in skills or target role.
 */
export function getDashboardData() {
  const profile = getUserProfile();
  const goal = getCareerGoal();
  const assessmentHistory = getAssessmentHistory();
  const progress = getCareerProgress();

  const readinessAnalysis = calculateReadiness(
    profile.skills,
    goal.targetRole,
    assessmentHistory
  );

  const studyPlan = generateStudyPlan(
    readinessAnalysis.skillGaps,
    goal.targetRole,
    progress.completedTasks || []
  );

  return {
    user: profile,
    careerGoal: goal,
    assessmentHistory,
    progress,
    readiness: readinessAnalysis,
    studyPlan,
    roleMetadata: ROLES[goal.targetRole] || ROLES["Python Developer"]
  };
}

/**
 * Initializes a new user session from registration & onboarding.
 */
export function initializeSession(userData, onboardingProfile) {
  const profile = {
    id: `usr_${Date.now()}`,
    fullName: userData.fullName || "CareerFit Member",
    email: userData.email,
    skills: onboardingProfile?.skills || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const goal = {
    id: `goal_${Date.now()}`,
    targetRole: onboardingProfile?.targetRole || "Python Developer",
    careerPreferences: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    goalHistory: []
  };

  safeStorageSet(KEYS.USER_PROFILE, profile);
  safeStorageSet(KEYS.CAREER_GOAL, goal);
  safeStorageSet(KEYS.ASSESSMENT_HISTORY, []);
  safeStorageSet(KEYS.CAREER_PROGRESS, {
    completedTasks: [],
    completedActivities: [],
    readinessHistory: []
  });
  safeStorageSet(KEYS.ACTIVE_SESSION, { loggedIn: true, userId: profile.id });

  return getDashboardData();
}

/**
 * Clears active session on logout.
 */
export function clearSession() {
  safeStorageRemove(KEYS.ACTIVE_SESSION);
}

export function hasActiveSession() {
  const session = safeStorageGet(KEYS.ACTIVE_SESSION);
  return Boolean(session && session.loggedIn);
}
