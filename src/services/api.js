/**
 * CareerFit Backend API Client
 * Provides full integration with the FastAPI backend with token management
 * and graceful fallback handling.
 */

const API_BASE = "/api";
const TOKEN_KEY = "careerfit_auth_token";

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // Ignore in fallback environments
  }
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    let errorMessage = `API Error ${res.status}`;
    try {
      const data = await res.json();
      if (data.detail) errorMessage = data.detail;
    } catch {
      // Use fallback error message
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function isBackendAvailable() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(1500)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiRegister(userData) {
  const res = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: userData.email,
      full_name: userData.fullName,
      password: userData.password,
      skills: userData.skills || {},
      target_role: userData.targetRole || "Python Developer"
    })
  });
  if (res.access_token) {
    setAuthToken(res.access_token);
  }
  return res;
}

export async function apiLogin(credentials) {
  const res = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password
    })
  });
  if (res.access_token) {
    setAuthToken(res.access_token);
  }
  return res;
}

export function apiLogout() {
  setAuthToken(null);
}

export async function apiGetProfile() {
  return request("/profile");
}

export async function apiUpdateProfile(updates) {
  return request("/profile", {
    method: "PATCH",
    body: JSON.stringify({
      full_name: updates.fullName,
      email: updates.email,
      skills: updates.skills
    })
  });
}

export async function apiSetTargetRole(roleName, preferences = {}) {
  return request("/profile/role", {
    method: "POST",
    body: JSON.stringify({
      target_role: roleName,
      career_preferences: preferences
    })
  });
}

export async function apiDeleteSkill(skillName) {
  return request(`/profile/skills/${encodeURIComponent(skillName)}`, {
    method: "DELETE"
  });
}

export async function apiGetAdaptiveQuestions({ skill, type = "MCQ", count = 3, capabilityLevel = null }) {
  return request("/assessments/questions", {
    method: "POST",
    body: JSON.stringify({
      skill,
      type,
      count,
      capability_level: capabilityLevel
    })
  });
}

export async function apiSubmitAssessment(result) {
  return request("/assessments/submit", {
    method: "POST",
    body: JSON.stringify({
      skill: result.skill,
      type: result.type,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      difficulty: result.difficulty || "medium"
    })
  });
}

export async function apiGetAssessmentHistory() {
  return request("/assessments/history");
}

export async function apiToggleStudyTask(dayId) {
  return request(`/study/toggle/${encodeURIComponent(dayId)}`, {
    method: "PATCH"
  });
}
