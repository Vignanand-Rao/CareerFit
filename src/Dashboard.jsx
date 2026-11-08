import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Target,
  BookOpen,
  TrendingUp,
  UserRound,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flame,
  BrainCircuit,
  Code2,
  Database,
  Sparkles,
  Menu,
  X,
  Cpu,
  BriefcaseBusiness
} from "lucide-react";
import "./Dashboard.css";
import { assessmentQuestions, assessmentTypes } from "./data/assessmentBank.js";
import {
  recordAssessmentResult,
  getAssessmentHistory,
  getDashboardData,
  toggleStudyTaskCompleted,
  saveUserProfile,
  removeUserSkill,
  setTargetJobRole
} from "./services/storage.js";
import { ALL_SKILLS, ROLES } from "./utils/careerData.js";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "assessments", label: "My Assessments", icon: ClipboardList },
  { id: "skills", label: "Skill Gaps", icon: Target },
  { id: "study", label: "Study Plan", icon: BookOpen },
  { id: "progress", label: "My Progress", icon: TrendingUp }
];

function getSkillIcon(skillName) {
  const lower = String(skillName || "").toLowerCase();
  if (lower.includes("sql") || lower.includes("dbms") || lower.includes("database")) {
    return Database;
  }
  if (lower.includes("machine") || lower.includes("learning") || lower.includes("ai") || lower.includes("deep") || lower.includes("pytorch")) {
    return BrainCircuit;
  }
  if (lower.includes("data structure") || lower.includes("algorithm") || lower.includes("oop")) {
    return Target;
  }
  return Code2;
}

function renderRoleIcon(roleName, size = 15) {
  switch (roleName) {
    case "AI/ML Engineer":
      return <Cpu size={size} />;
    case "Data Analyst":
      return <Database size={size} />;
    case "Software Engineer":
      return <BriefcaseBusiness size={size} />;
    default:
      return <Code2 size={size} />;
  }
}

function getTimestampIso() {
  return new Date().toISOString();
}

function getFormattedDate(isoString) {
  return isoString ? new Date(isoString).toLocaleDateString() : new Date().toLocaleDateString();
}

// Master Assessment Question Bank & Types imported from ./data/assessmentBank.js

export default function Dashboard({ onLogout, onProfile, user: _userProp, careerGoal: _goalProp, onUpdateDashboard }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [, setRevision] = useState(0);

  const dashboardState = getDashboardData();
  const activeUser = _userProp || dashboardState.user;
  const activeGoal = _goalProp || dashboardState.careerGoal;
  const { readiness, studyPlan, roleMetadata } = dashboardState;

  const targetRoleName = activeGoal.targetRole || "Python Developer";
  const userFullName = activeUser.fullName || "CareerFit Member";
  const userInitials = userFullName.charAt(0).toUpperCase() || "U";
  const userFirstName = userFullName.split(" ")[0] || "there";
  const completedTasksCount = studyPlan.filter((t) => t.status === "Completed").length;

  function handleToggleTask(dayId) {
    toggleStudyTaskCompleted(dayId);
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
  }

  function handleContinueAssessmentClick() {
    if (readiness.skillGaps.length > 0 && assessmentQuestions[readiness.skillGaps[0].name]) {
      setSelectedSkill(readiness.skillGaps[0].name);
    }
    navigateTo("assessments");
  }

  // ── Phase 5: Profile editor state ──────────────────────────────────────────
  const [profileEdit, setProfileEdit] = useState({
    fullName: activeUser.fullName || "",
    email: activeUser.email || ""
  });
  const [addingSkill, setAddingSkill] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  function handleSaveProfile() {
    saveUserProfile({ fullName: profileEdit.fullName.trim(), email: profileEdit.email.trim() });
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 2500);
  }

  function handleRemoveSkill(skillName) {
    removeUserSkill(skillName);
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
  }

  function handleUpdateProficiency(skillName, level) {
    const currentProfile = getDashboardData().user;
    const updatedSkills = { ...currentProfile.skills, [skillName]: level };
    saveUserProfile({ skills: updatedSkills });
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
  }

  function handleAddSkill(skillName) {
    if (!skillName) return;
    const currentProfile = getDashboardData().user;
    const updatedSkills = { ...currentProfile.skills, [skillName]: "Beginner" };
    saveUserProfile({ skills: updatedSkills });
    setAddingSkill("");
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
  }

  function handleChangeRole(newRoleName) {
    setTargetJobRole(newRoleName);
    setRevision((r) => r + 1);
    if (onUpdateDashboard) onUpdateDashboard();
  }
  // ───────────────────────────────────────────────────────────────────────────

  const [assessmentStep, setAssessmentStep] = useState("skills");
  const [selectedSkill, setSelectedSkill] = useState("Python");
  const [selectedType, setSelectedType] = useState("MCQ");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [completedAssessments, setCompletedAssessments] = useState(() => {
    return getAssessmentHistory().map((item) => ({
      ...item,
      date: getFormattedDate(item.completedAt || item.date)
    }));
  });

  const questions = assessmentQuestions[selectedSkill]?.[selectedType] || [];
  const currentAssessmentQuestion = questions[currentQuestion];

  function navigateTo(page) {
    setActivePage(page);
    setProfileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleLogout() {
    if (onLogout) onLogout();
  }

  useEffect(() => {
    if (
      activePage !== "assessments" ||
      assessmentStep !== "taking" ||
      assessmentSubmitted
    ) {
      return undefined;
    }

    if (timeLeft <= 0) {
      const timeout = window.setTimeout(() => {
        setAssessmentSubmitted(true);
        setAssessmentStep("results");
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [activePage, assessmentStep, assessmentSubmitted, timeLeft]);

  function startAssessment() {
    if (!questions.length) return;

    setCurrentQuestion(0);
    setAssessmentAnswers({});
    setAssessmentSubmitted(false);

    const duration =
      assessmentTypes.find((type) => type.id === selectedType)?.duration || 10;

    setTimeLeft(duration * 60);
    setAssessmentStep("taking");
  }

  function submitAssessment() {
    if (assessmentSubmitted) return;

    setAssessmentSubmitted(true);
    setAssessmentStep("results");

    if (selectedType !== "Coding") {
      const objectiveQuestions = questions;
      let score = 0;

      objectiveQuestions.forEach((question, index) => {
        const userAnswer = assessmentAnswers[index];

        if (typeof question.answer === "number") {
          if (userAnswer === question.answer) score += 1;
        } else if (
          String(userAnswer ?? "").trim().toLowerCase() ===
          String(question.answer).trim().toLowerCase()
        ) {
          score += 1;
        }
      });

      const percentage = Math.round((score / objectiveQuestions.length) * 100);

      const record = {
        skill: selectedSkill,
        type: selectedType,
        score,
        total: objectiveQuestions.length,
        percentage,
        completedAt: getTimestampIso()
      };

      recordAssessmentResult(record);

      setCompletedAssessments((previous) => [
        {
          ...record,
          date: getFormattedDate()
        },
        ...previous
      ]);

      setRevision((r) => r + 1);
      if (onUpdateDashboard) {
        onUpdateDashboard();
      }
    } else {
      const record = {
        skill: selectedSkill,
        type: selectedType,
        score: null,
        total: questions.length,
        percentage: null,
        completedAt: getTimestampIso()
      };

      recordAssessmentResult(record);

      setCompletedAssessments((previous) => [
        {
          ...record,
          date: getFormattedDate()
        },
        ...previous
      ]);

      setRevision((r) => r + 1);
      if (onUpdateDashboard) {
        onUpdateDashboard();
      }
    }
  }

  function resetAssessment() {
    setAssessmentStep("skills");
    setCurrentQuestion(0);
    setAssessmentAnswers({});
    setTimeLeft(0);
    setAssessmentSubmitted(false);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  const objectiveScore = questions.reduce((score, question, index) => {
    const userAnswer = assessmentAnswers[index];

    if (userAnswer === undefined || userAnswer === null) return score;

    if (typeof question.answer === "number") {
      return score + (userAnswer === question.answer ? 1 : 0);
    }

    return (
      score +
      (String(userAnswer).trim().toLowerCase() ===
      String(question.answer).trim().toLowerCase()
        ? 1
        : 0)
    );
  }, 0);

  const answeredCount = questions.filter((question, index) => {
    const answer = assessmentAnswers[index];
    return answer !== undefined && String(answer).trim() !== "";
  }).length;

  const percentageScore = questions.length
    ? Math.round((objectiveScore / questions.length) * 100)
    : 0;

  return (
    <div className={`cf-dashboard ${sidebarOpen ? "" : "cf-sidebar-hidden"}`}>
      <aside className={`cf-sidebar ${sidebarOpen ? "cf-sidebar-visible" : ""}`}>
        <div className="cf-sidebar-brand">
          <a
            href="#dashboard"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("dashboard");
            }}
          >
            <span className="cf-brand-icon">
              <Target size={24} />
              <span />
            </span>
            <span className="cf-brand-name">
              Career<span>Fit</span>
            </span>
          </a>
          <button
            type="button"
            className="cf-sidebar-close"
            aria-label="Hide sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="cf-sidebar-caption">WORKSPACE</div>

        <nav className="cf-sidebar-nav" aria-label="Dashboard navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`cf-nav-item ${isActive ? "cf-nav-active" : ""}`}
                onClick={() => navigateTo(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {isActive && <span className="cf-nav-indicator" />}
              </button>
            );
          })}
        </nav>

        <div className="cf-sidebar-bottom">
          <div className="cf-sidebar-tip">
            <span className="cf-tip-icon">
              <Sparkles size={18} />
            </span>
            <h4>Small steps. Big progress.</h4>
            <p>
              Keep learning consistently to move closer to your career goal.
            </p>
          </div>

          <button
            type="button"
            className={`cf-nav-item ${activePage === "profile" ? "cf-nav-active" : ""}`}
            onClick={() => {
              navigateTo("profile");
              if (onProfile) onProfile();
            }}
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            className="cf-nav-item cf-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Log out</span>
          </button>

          <div className="cf-sidebar-version">CAREERFIT · YOUR NEXT STEP</div>
        </div>
      </aside>

      <main className="cf-main">
        <header className="cf-topbar">
          <div className="cf-topbar-left">
            {!sidebarOpen && (
              <button
                type="button"
                className="cf-icon-button cf-open-sidebar"
                aria-label="Show sidebar"
                onClick={() => setSidebarOpen(true)}
              >
                <PanelLeftOpen size={21} />
              </button>
            )}

            <div className="cf-breadcrumb">
              <button
                type="button"
                className="cf-workspace-link"
                onClick={() => navigateTo("dashboard")}
              >
                Workspace
              </button>
              <span className="cf-breadcrumb-slash">/</span>
              <strong>
                {navigation.find((item) => item.id === activePage)?.label ||
                  (activePage === "profile" ? "My Profile" : "Dashboard")}
              </strong>
            </div>
          </div>

          <div className="cf-topbar-actions">
            <span className="cf-role-badge">
              {renderRoleIcon(targetRoleName, 15)}
              {targetRoleName}
            </span>

            <button
              type="button"
              className="cf-icon-button cf-notification"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="cf-profile-wrap">
              <button
                type="button"
                className="cf-profile-button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-expanded={profileMenuOpen}
              >
                <span className="cf-avatar">{userInitials}</span>
                <span className="cf-profile-name">{userFullName}</span>
                <ChevronDown size={15} />
              </button>

              {profileMenuOpen && (
                <div className="cf-profile-menu">
                  <button type="button" onClick={() => navigateTo("profile")}>
                    <UserRound size={16} /> My Profile
                  </button>
                  <button type="button" onClick={handleLogout}>
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="cf-content">
          {activePage === "dashboard" && (
            <>
              <section className="cf-welcome">
                <div>
                  <div className="cf-welcome-kicker">
                    <Sparkles size={15} /> YOUR CAREER JOURNEY
                  </div>
                  <h1>
                    Welcome back, <span>{userFirstName}.</span>
                  </h1>
                  <p>
                    Targeting: <strong>{targetRoleName}</strong>. Every skill you build brings you closer to your career goal. Let's see where you stand today.
                  </p>
                </div>
                <button
                  type="button"
                  className="cf-primary-button"
                  onClick={handleContinueAssessmentClick}
                >
                  Continue assessment <ArrowRight size={17} />
                </button>
              </section>

              <section className="cf-stat-grid" aria-label="Career overview">
                <article className="cf-stat-card cf-stat-readiness">
                  <div className="cf-stat-top">
                    <span>JOB READINESS</span>
                    <span className="cf-stat-icon"><Target size={19} /></span>
                  </div>
                  <div className="cf-stat-value">{readiness.overallScore}<span>%</span></div>
                  <p><span className="cf-stat-dot" /> {readiness.assessedCount > 0 ? "Verified by assessment" : "Calculated from skill profile"}</p>
                  <div className="cf-stat-progress">
                    <span style={{ width: `${readiness.overallScore}%` }} />
                  </div>
                </article>

                <article className="cf-stat-card">
                  <div className="cf-stat-top">
                    <span>SKILLS ASSESSED</span>
                    <span className="cf-stat-icon cf-pink-icon"><BrainCircuit size={19} /></span>
                  </div>
                  <div className="cf-stat-value">{completedAssessments.length}</div>
                  <p>{completedAssessments.length === 1 ? "1 completed assessment" : `${completedAssessments.length} completed assessments`}</p>
                  <span className="cf-stat-bottom-label">ASSESSMENT HISTORY</span>
                </article>

                <article className="cf-stat-card">
                  <div className="cf-stat-top">
                    <span>SKILL GAPS</span>
                    <span className="cf-stat-icon cf-purple-icon"><Target size={19} /></span>
                  </div>
                  <div className="cf-stat-value">{String(readiness.skillGaps.length).padStart(2, "0")}</div>
                  <p>{readiness.skillGaps.length === 0 ? "All requirements met" : "Identified priority gaps"}</p>
                  <button
                    type="button"
                    className="cf-inline-link"
                    onClick={() => navigateTo("skills")}
                  >
                    Review skills <ArrowUpRight size={15} />
                  </button>
                </article>

                <article className="cf-stat-card">
                  <div className="cf-stat-top">
                    <span>STUDY PLAN</span>
                    <span className="cf-stat-icon cf-green-icon"><Flame size={19} /></span>
                  </div>
                  <div className="cf-stat-value">{String(completedTasksCount).padStart(2, "0")}<span className="cf-stat-small">/10 days</span></div>
                  <p>Dynamic learning roadmap</p>
                  <div className="cf-stat-progress">
                    <span className="cf-progress-pink" style={{ width: `${(completedTasksCount / 10) * 100}%` }} />
                  </div>
                </article>
              </section>

              <section className="cf-main-grid">
                <article className="cf-panel cf-readiness-panel">
                  <div className="cf-panel-heading">
                    <div>
                      <span className="cf-section-eyebrow">YOUR CURRENT STANDING</span>
                      <h2>Career readiness</h2>
                    </div>
                    <span className="cf-example-tag">DYNAMIC SCORE</span>
                  </div>

                  <div className="cf-readiness-body">
                    <div className="cf-readiness-score">
                      <div className="cf-large-score">{readiness.overallScore}<span>%</span></div>
                      <span className="cf-score-status">
                        <CheckCircle2 size={15} /> {readiness.overallScore >= 75 ? "Job Ready Profile" : readiness.overallScore >= 50 ? "Progressing Well" : "Foundational Level"}
                      </span>
                      <p>
                        Calculated from your {targetRoleName} competencies and verified assessment scores.
                      </p>
                    </div>
                    <div className="cf-readiness-chart">
                      <svg viewBox="0 0 180 180" role="img" aria-label={`Readiness score of ${readiness.overallScore} percent`}>
                        <circle cx="90" cy="90" r="70" className="cf-chart-track" />
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          className="cf-chart-value"
                          style={{
                            strokeDasharray: 439.82,
                            strokeDashoffset: 439.82 * (1 - readiness.overallScore / 100),
                            transformOrigin: "90px 90px"
                          }}
                        />
                      </svg>
                      <div className="cf-chart-center">
                        <strong>{readiness.overallScore}%</strong>
                        <span>{readiness.overallScore >= 75 ? "JOB READY" : "IN PROGRESS"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="cf-readiness-footer">
                    <span><Sparkles size={16} /> {readiness.skillGaps.length > 0 ? `Focus on your ${readiness.skillGaps.length} priority skill gaps.` : "All target competencies satisfied!"}</span>
                    <button type="button" onClick={() => navigateTo("skills")}>
                      View analysis <ArrowRight size={15} />
                    </button>
                  </div>
                </article>

                <article className="cf-panel cf-skills-panel">
                  <div className="cf-panel-heading">
                    <div>
                      <span className="cf-section-eyebrow">YOUR SKILL PROFILE</span>
                      <h2>Skill snapshot</h2>
                    </div>
                    <button
                      type="button"
                      className="cf-text-button"
                      onClick={() => navigateTo("skills")}
                    >
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <div className="cf-skills-list">
                    {readiness.skillBreakdown.slice(0, 4).map((skill) => {
                      const Icon = getSkillIcon(skill.name);
                      return (
                        <div className="cf-skill-item" key={skill.name}>
                          <div className="cf-skill-heading">
                            <span className="cf-skill-name">
                              <span className={`cf-skill-icon ${skill.color}`}>
                                <Icon size={16} />
                              </span>
                              {skill.name}
                            </span>
                            <span className="cf-skill-score">{skill.score}%</span>
                          </div>
                          <div className="cf-skill-track">
                            <span className={skill.color} style={{ width: `${skill.score}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="cf-panel-note">
                    <Sparkles size={15} />
                    Competencies required for {targetRoleName}.
                  </div>
                </article>
              </section>

              <section className="cf-panel cf-study-panel">
                <div className="cf-panel-heading">
                  <div>
                    <span className="cf-section-eyebrow">KEEP MOVING FORWARD</span>
                    <h2>Your learning roadmap</h2>
                  </div>
                  <button
                    type="button"
                    className="cf-text-button"
                    onClick={() => navigateTo("study")}
                  >
                    View study plan <ArrowRight size={15} />
                  </button>
                </div>

                <div className="cf-study-list">
                  {studyPlan.slice(0, 3).map((task, index) => (
                    <article className="cf-study-task" key={task.day}>
                      <span className={`cf-task-number ${task.status === "Completed" ? "completed" : ""}`}>
                        {task.status === "Completed" ? <CheckCircle2 size={19} /> : `0${index + 1}`}
                      </span>
                      <div className="cf-task-copy">
                        <span className="cf-task-day">{task.day} · {task.skill}</span>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                      </div>
                      <span className="cf-task-duration"><Clock3 size={14} /> {task.duration}</span>
                      <button
                        type="button"
                        className={`cf-task-status ${task.status === "Completed" ? "done" : index === 0 ? "active" : ""}`}
                        style={{ border: "none", cursor: "pointer", background: "inherit" }}
                        onClick={() => handleToggleTask(task.day)}
                      >
                        {task.status}
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <div className="cf-bottom-note">
                <span><Sparkles size={15} /> Dynamic CareerFit profile for {targetRoleName}.</span>
                <span>CAREERFIT DYNAMIC</span>
              </div>
            </>
          )}

          {activePage === "assessments" && (
            <section className="cf-subpage cf-assessment-page">
              {assessmentStep === "skills" && (
                <>
                  <div className="cf-page-kicker">MEASURE YOUR SKILLS</div>
                  <h1>My <span>Assessments</span></h1>
                  <p className="cf-page-description">
                    Choose a skill and assessment type to evaluate your knowledge.
                  </p>

                  <div className="cf-assessment-step-label">
                    <span className="cf-step-active">01</span><span>Choose skill</span>
                    <i />
                    <span>02</span><span>Assessment</span>
                    <i />
                    <span>03</span><span>Results</span>
                  </div>

                  <div className="cf-panel cf-assessment-selection">
                    <div className="cf-panel-heading">
                      <div>
                        <span className="cf-section-eyebrow">STEP 01</span>
                        <h2>Select your skill</h2>
                      </div>
                      <span className="cf-example-tag">SAMPLE QUESTIONS</span>
                    </div>

                    <div className="cf-assessment-skill-grid">
                      {Object.keys(assessmentQuestions).map((skill) => (
                        <button
                          type="button"
                          key={skill}
                          className={`cf-assessment-skill ${selectedSkill === skill ? "selected" : ""}`}
                          onClick={() => setSelectedSkill(skill)}
                        >
                          <span className="cf-assessment-skill-icon">
                            {skill === "SQL" || skill === "DBMS" ? (
                              <Database size={23} />
                            ) : skill === "Machine Learning" || skill === "Deep Learning" ? (
                              <BrainCircuit size={23} />
                            ) : (
                              <Code2 size={23} />
                            )}
                          </span>
                          <span>
                            <strong>{skill}</strong>
                            <small>
                              {Object.values(assessmentQuestions[skill]).reduce((sum, list) => sum + list.length, 0)} sample questions
                            </small>
                          </span>
                          <span className="cf-assessment-radio">
                            {selectedSkill === skill && <CheckCircle2 size={19} />}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cf-panel cf-assessment-selection">
                    <div className="cf-panel-heading">
                      <div>
                        <span className="cf-section-eyebrow">STEP 02</span>
                        <h2>Choose assessment type</h2>
                      </div>
                    </div>

                    <div className="cf-assessment-type-grid">
                      {assessmentTypes.map((type) => {
                        const Icon = type.icon;
                        const count = assessmentQuestions[selectedSkill][type.id].length;

                        return (
                          <button
                            type="button"
                            key={type.id}
                            className={`cf-assessment-type ${selectedType === type.id ? "selected" : ""}`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <span className="cf-assessment-type-icon"><Icon size={23} /></span>
                            <strong>{type.title}</strong>
                            <p>{type.description}</p>
                            <span className="cf-assessment-type-meta">
                              <Clock3 size={14} /> {type.duration} min · {count} questions
                            </span>
                            <span className="cf-assessment-select-label">
                              {selectedType === type.id ? "SELECTED" : "SELECT"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="cf-assessment-start-row">
                      <div>
                        <strong>{selectedSkill} · {selectedType}</strong>
                        <span>
                          {questions.length} questions ·{" "}
                          {assessmentTypes.find((type) => type.id === selectedType)?.duration} minutes
                        </span>
                      </div>
                      <button
                        type="button"
                        className="cf-primary-button"
                        onClick={() => setAssessmentStep("instructions")}
                      >
                        Continue <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {assessmentStep === "instructions" && (
                <>
                  <div className="cf-page-kicker">BEFORE YOU BEGIN</div>
                  <h1>Assessment <span>Instructions</span></h1>
                  <p className="cf-page-description">
                    Review the assessment details before starting.
                  </p>

                  <div className="cf-panel cf-instructions-panel">
                    <div className="cf-instructions-header">
                      <span className="cf-assessment-type-icon">
                        {selectedType === "Coding" ? <Code2 size={25} /> : <BrainCircuit size={25} />}
                      </span>
                      <div>
                        <span className="cf-section-eyebrow">{selectedSkill.toUpperCase()}</span>
                        <h2>{assessmentTypes.find((type) => type.id === selectedType)?.title}</h2>
                        <p>{assessmentTypes.find((type) => type.id === selectedType)?.description}</p>
                      </div>
                    </div>

                    <div className="cf-instructions-stats">
                      <div><Clock3 size={20} /><span>TIME LIMIT</span><strong>{assessmentTypes.find((type) => type.id === selectedType)?.duration} minutes</strong></div>
                      <div><ClipboardList size={20} /><span>QUESTIONS</span><strong>{questions.length}</strong></div>
                      <div><Target size={20} /><span>ASSESSMENT</span><strong>{selectedType}</strong></div>
                    </div>

                    <h3>Important instructions</h3>
                    <ul className="cf-instruction-list">
                      <li>Read each question carefully before answering.</li>
                      <li>Use Previous and Next to navigate between questions.</li>
                      <li>The timer starts when you begin the assessment.</li>
                      <li>You can submit your answers before the timer expires.</li>
                      {selectedType === "Fill in the Blanks" && <li>Fill-in-the-blank answers are checked without case sensitivity.</li>}
                      {selectedType === "Coding" && <li>Coding answers are collected but are not automatically executed or graded.</li>}
                    </ul>

                    <div className="cf-instructions-actions">
                      <button type="button" className="cf-secondary-button" onClick={() => setAssessmentStep("skills")}>
                        <ArrowRight className="cf-back-arrow" size={16} /> Back
                      </button>
                      <button type="button" className="cf-primary-button" onClick={startAssessment}>
                        Start Assessment <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {assessmentStep === "taking" && currentAssessmentQuestion && (
                <>
                  <div className="cf-assessment-taking-top">
                    <div>
                      <div className="cf-page-kicker">{selectedSkill.toUpperCase()} ASSESSMENT</div>
                      <h1>{selectedType === "MCQ" ? "Multiple Choice" : selectedType}</h1>
                      <p className="cf-page-description">
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                    </div>
                    <div className={`cf-assessment-timer ${timeLeft <= 60 ? "urgent" : ""}`}>
                      <Clock3 size={19} />
                      <span><small>TIME REMAINING</small><strong>{formatTime(timeLeft)}</strong></span>
                    </div>
                  </div>

                  <div className="cf-assessment-progress-track">
                    <span style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                  </div>

                  <div className="cf-panel cf-question-panel">
                    <div className="cf-question-meta">
                      <span>QUESTION {String(currentQuestion + 1).padStart(2, "0")}</span>
                      <span>{selectedSkill} · {selectedType}</span>
                    </div>

                    <h2>{currentAssessmentQuestion.question}</h2>
                    {currentAssessmentQuestion.description && <p className="cf-question-description">{currentAssessmentQuestion.description}</p>}
                    {currentAssessmentQuestion.example && <pre className="cf-question-example">{currentAssessmentQuestion.example}</pre>}

                    {selectedType === "MCQ" && (
                      <div className="cf-answer-options">
                        {currentAssessmentQuestion.options.map((option, index) => (
                          <button
                            type="button"
                            key={option}
                            className={`cf-answer-option ${assessmentAnswers[currentQuestion] === index ? "selected" : ""}`}
                            onClick={() => setAssessmentAnswers((previous) => ({ ...previous, [currentQuestion]: index }))}
                          >
                            <span>{String.fromCharCode(65 + index)}</span>
                            <strong>{option}</strong>
                            {assessmentAnswers[currentQuestion] === index && <CheckCircle2 size={19} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedType === "Fill in the Blanks" && (
                      <div className="cf-fill-answer">
                        <label htmlFor="cf-fill-answer">Your answer</label>
                        <input
                          id="cf-fill-answer"
                          type="text"
                          autoComplete="off"
                          placeholder="Type your answer here..."
                          value={assessmentAnswers[currentQuestion] ?? ""}
                          onChange={(event) => setAssessmentAnswers((previous) => ({ ...previous, [currentQuestion]: event.target.value }))}
                        />
                      </div>
                    )}

                    {selectedType === "Coding" && (
                      <div className="cf-code-answer">
                        <div className="cf-code-toolbar">
                          <span><Code2 size={15} /> Solution editor</span>
                          <span>{selectedSkill}</span>
                        </div>
                        <textarea
                          aria-label="Your coding solution"
                          spellCheck="false"
                          value={assessmentAnswers[currentQuestion] ?? currentAssessmentQuestion.starterCode ?? ""}
                          onChange={(event) => setAssessmentAnswers((previous) => ({ ...previous, [currentQuestion]: event.target.value }))}
                        />
                        <p>Code is stored temporarily in this page. Execution and automated grading are not connected.</p>
                      </div>
                    )}

                    <div className="cf-question-footer">
                      <span>{answeredCount} of {questions.length} answered</span>
                      <div>
                        <button
                          type="button"
                          className="cf-secondary-button"
                          disabled={currentQuestion === 0}
                          onClick={() => setCurrentQuestion((number) => number - 1)}
                        >
                          Previous
                        </button>
                        {currentQuestion < questions.length - 1 ? (
                          <button type="button" className="cf-primary-button" onClick={() => setCurrentQuestion((number) => number + 1)}>
                            Next <ArrowRight size={16} />
                          </button>
                        ) : (
                          <button type="button" className="cf-primary-button" onClick={submitAssessment}>
                            Submit Assessment <CheckCircle2 size={17} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button type="button" className="cf-assessment-submit-link" onClick={submitAssessment}>
                    Submit assessment now
                  </button>
                </>
              )}

              {assessmentStep === "results" && (
                <>
                  <div className="cf-page-kicker">ASSESSMENT COMPLETED</div>
                  <h1>Your <span>Results</span></h1>
                  <p className="cf-page-description">
                    Review your answers and identify topics to practise.
                  </p>

                  <div className="cf-panel cf-results-panel">
                    <div className="cf-results-hero">
                      <span className="cf-results-icon"><CheckCircle2 size={32} /></span>
                      <span className="cf-section-eyebrow">ASSESSMENT SUMMARY</span>
                      <h2>{selectedSkill} · {selectedType}</h2>

                      {selectedType === "Coding" ? (
                        <>
                          <div className="cf-results-score">Pending</div>
                          <p>Your coding responses have not been executed or automatically graded.</p>
                        </>
                      ) : (
                        <>
                          <div className="cf-results-score">{objectiveScore}<span> / {questions.length}</span></div>
                          <p>{percentageScore}% objective-question score · {answeredCount} of {questions.length} questions answered.</p>
                          <div className="cf-results-progress"><span style={{ width: `${percentageScore}%` }} /></div>
                        </>
                      )}
                    </div>

                    <div className="cf-results-breakdown">
                      <h3>Answer review</h3>
                      {questions.map((question, index) => {
                        const userAnswer = assessmentAnswers[index];
                        const isCorrect = selectedType === "MCQ"
                          ? userAnswer === question.answer
                          : selectedType === "Fill in the Blanks"
                            ? String(userAnswer ?? "").trim().toLowerCase() === String(question.answer).trim().toLowerCase()
                            : false;

                        return (
                          <article className="cf-result-question" key={`${index}-${question.question}`}>
                            <div className="cf-result-question-top">
                              <strong>Question {index + 1}</strong>
                              {selectedType === "Coding" ? (
                                <span className="cf-result-pending">Needs evaluation</span>
                              ) : (
                                <span className={isCorrect ? "cf-result-correct" : "cf-result-incorrect"}>
                                  {isCorrect ? "Correct" : "Incorrect"}
                                </span>
                              )}
                            </div>
                            <p>{question.question}</p>

                            {selectedType === "MCQ" && (
                              <div className="cf-result-answer-copy">
                                Your answer: {userAnswer === undefined ? "Not answered" : question.options[userAnswer]}
                                <br />
                                Correct answer: {question.options[question.answer]}
                              </div>
                            )}

                            {selectedType === "Fill in the Blanks" && (
                              <div className="cf-result-answer-copy">
                                Your answer: {userAnswer || "Not answered"}
                                <br />
                                Correct answer: {question.answer}
                              </div>
                            )}

                            {selectedType === "Coding" && <pre className="cf-result-code">{userAnswer || "No solution submitted"}</pre>}
                            {question.explanation && <p className="cf-result-explanation">{question.explanation}</p>}
                          </article>
                        );
                      })}
                    </div>

                    <div className="cf-results-actions">
                      <button type="button" className="cf-secondary-button" onClick={resetAssessment}>
                        Choose another assessment
                      </button>
                      <button type="button" className="cf-primary-button" onClick={() => navigateTo("dashboard")}>
                        Back to Dashboard <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}

          {activePage === "skills" && (
            <section className="cf-subpage">
              <div className="cf-page-kicker">UNDERSTAND YOUR STRENGTHS</div>
              <h1>Skill <span>Gaps</span></h1>
              <p className="cf-page-description">
                Targeted skill requirements for {targetRoleName}. Areas marked with High Priority are core prerequisites.
              </p>
              <div className="cf-panel cf-full-panel">
                <div className="cf-panel-heading">
                  <div>
                    <span className="cf-section-eyebrow">{targetRoleName.toUpperCase()} REQUIREMENTS</span>
                    <h2>Identified Skill Gaps ({readiness.skillGaps.length})</h2>
                  </div>
                  <span className="cf-example-tag">DYNAMIC ANALYSIS</span>
                </div>
                {readiness.skillGaps.length === 0 ? (
                  <p className="cf-empty-state">
                    Outstanding progress! You have met or exceeded the benchmark across all required skills for {targetRoleName}.
                  </p>
                ) : (
                  readiness.skillGaps.map((skill) => (
                    <div className="cf-gap-row" key={skill.name}>
                      <div>
                        <strong>{skill.name}</strong>
                        <span>
                          {skill.reason} · Target: {skill.targetLevel} · Priority: {skill.priority}
                        </span>
                      </div>
                      <div className="cf-gap-bar">
                        <span className={skill.color} style={{ width: `${skill.score}%` }} />
                      </div>
                      <strong className="cf-gap-score">{skill.score}%</strong>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {activePage === "study" && (
            <section className="cf-subpage">
              <div className="cf-page-kicker">YOUR PERSONALIZED ROADMAP</div>
              <h1>Study <span>Plan</span></h1>
              <p className="cf-page-description">
                Your 10-day roadmap generated around priority skill gaps for {targetRoleName}. Click a milestone's status to toggle completion.
              </p>
              <div className="cf-panel cf-full-panel">
                <div className="cf-panel-heading">
                  <div>
                    <span className="cf-section-eyebrow">TARGET ROLE: {targetRoleName.toUpperCase()}</span>
                    <h2>10-Day Learning Roadmap ({completedTasksCount}/10 completed)</h2>
                  </div>
                  <span className="cf-example-tag">DYNAMIC ROADMAP</span>
                </div>
                <div className="cf-study-list">
                  {studyPlan.map((task, index) => (
                    <article className="cf-study-task" key={task.day}>
                      <span className={`cf-task-number ${task.status === "Completed" ? "completed" : ""}`}>
                        {task.status === "Completed" ? <CheckCircle2 size={19} /> : String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="cf-task-copy">
                        <span className="cf-task-day">{task.day} · {task.skill}</span>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                      </div>
                      <span className="cf-task-duration"><Clock3 size={14} /> {task.duration}</span>
                      <button
                        type="button"
                        className={`cf-task-status ${task.status === "Completed" ? "done" : index === 0 ? "active" : ""}`}
                        style={{ border: "none", cursor: "pointer", background: "inherit" }}
                        onClick={() => handleToggleTask(task.day)}
                      >
                        {task.status}
                      </button>
                    </article>
                  ))}
                </div>
              </div>

              {roleMetadata?.recommendedProjects?.length > 0 && (
                <div className="cf-panel cf-full-panel" style={{ marginTop: "24px" }}>
                  <div className="cf-panel-heading">
                    <div>
                      <span className="cf-section-eyebrow">PORTFOLIO ACCELERATOR</span>
                      <h2>Recommended Projects for {targetRoleName}</h2>
                    </div>
                    <span className="cf-example-tag">ROLE PROJECTS</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", padding: "16px 20px" }}>
                    {roleMetadata.recommendedProjects.map((proj) => (
                      <div key={proj.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px" }}>
                        <span style={{ fontSize: "11px", color: "#16B8E5", fontWeight: "700", letterSpacing: "1px" }}>{proj.tech}</span>
                        <h3 style={{ margin: "8px 0 6px", fontSize: "16px" }}>{proj.title}</h3>
                        <p style={{ margin: 0, fontSize: "13px", color: "#A1A1AA", lineHeight: "1.5" }}>{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {activePage === "progress" && (
            <section className="cf-subpage">
              <div className="cf-page-kicker">YOUR IMPROVEMENT OVER TIME</div>
              <h1>My <span>Progress</span></h1>
              <p className="cf-page-description">
                Review completed assessments and track learning activity.
              </p>

              <div className="cf-panel cf-full-panel">
                <div className="cf-panel-heading">
                  <div>
                    <span className="cf-section-eyebrow">ASSESSMENT HISTORY</span>
                    <h2>Completed assessments</h2>
                  </div>
                  <span className="cf-example-tag">CURRENT SESSION</span>
                </div>

                {completedAssessments.length === 0 ? (
                  <p className="cf-empty-state">
                    No assessments completed yet. Take an assessment to see your results here.
                  </p>
                ) : (
                  completedAssessments.map((assessment, index) => (
                    <article className="cf-history-row" key={`${assessment.date}-${index}`}>
                      <span className="cf-history-icon"><ClipboardList size={20} /></span>
                      <div>
                        <strong>{assessment.skill} · {assessment.type}</strong>
                        <span>{assessment.date} · {assessment.total} questions</span>
                      </div>
                      <strong className="cf-history-score">
                        {assessment.percentage === null ? "Pending" : `${assessment.percentage}%`}
                      </strong>
                    </article>
                  ))
                )}

                <button type="button" className="cf-primary-button" onClick={() => {
                  resetAssessment();
                  navigateTo("assessments");
                }}>
                  Take an assessment <ArrowRight size={17} />
                </button>
              </div>
            </section>
          )}

          {activePage === "profile" && (
            <section className="cf-subpage">
              <div className="cf-page-kicker">YOUR ACCOUNT</div>
              <h1>My <span>Profile</span></h1>
              <p className="cf-page-description">
                Update your personal info, manage skills, and switch your target career role.
              </p>

              <div className="cf-profile-editor-grid">

                {/* ── Personal Info ───────────────────────────────────────── */}
                <div className="cf-profile-section">
                  <h3>Personal Information</h3>
                  <div className="cf-profile-field">
                    <label>FULL NAME</label>
                    <input
                      type="text"
                      value={profileEdit.fullName}
                      onChange={(e) => setProfileEdit((p) => ({ ...p, fullName: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="cf-profile-field">
                    <label>EMAIL</label>
                    <input
                      type="email"
                      value={profileEdit.email}
                      onChange={(e) => setProfileEdit((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="cf-profile-save-row">
                    <button type="button" className="cf-primary-button" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    {profileSaved && (
                      <span className="cf-save-confirm">✓ Saved successfully</span>
                    )}
                  </div>
                </div>

                {/* ── Skills Manager ──────────────────────────────────────── */}
                <div className="cf-profile-section">
                  <h3>My Skills</h3>
                  {Object.entries(getDashboardData().user.skills || {}).length === 0 ? (
                    <p style={{ color: "var(--cf-muted)", fontSize: "14px" }}>
                      No skills added yet. Use the selector below to add skills.
                    </p>
                  ) : (
                    Object.entries(getDashboardData().user.skills || {}).map(([skill, level]) => (
                      <div className="cf-skill-editor-row" key={skill}>
                        <span>{skill}</span>
                        <select
                          value={level}
                          onChange={(e) => handleUpdateProficiency(skill, e.target.value)}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        <button
                          type="button"
                          className="cf-skill-remove-btn"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}

                  <div className="cf-add-skill-row">
                    <select
                      value={addingSkill}
                      onChange={(e) => setAddingSkill(e.target.value)}
                    >
                      <option value="">— Add a skill —</option>
                      {ALL_SKILLS
                        .filter((s) => !(getDashboardData().user.skills || {})[s])
                        .map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <button
                      type="button"
                      className="cf-primary-button"
                      onClick={() => handleAddSkill(addingSkill)}
                      disabled={!addingSkill}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* ── Target Role ─────────────────────────────────────────── */}
                <div className="cf-profile-section">
                  <h3>Target Career Role</h3>
                  <div className="cf-profile-role-grid">
                    {Object.entries(ROLES).map(([roleKey, roleDef]) => {
                      const isSelected = targetRoleName === roleDef.name;
                      return (
                        <button
                          key={roleKey}
                          type="button"
                          className={`cf-profile-role-card${isSelected ? " selected" : ""}`}
                          onClick={() => handleChangeRole(roleDef.name)}
                        >
                          <div style={{ marginBottom: "6px" }}>{renderRoleIcon(roleDef.name, 20)}</div>
                          <h4>{roleDef.name}</h4>
                          <p>{roleDef.description || "Click to set as your target role"}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Logout ──────────────────────────────────────────────── */}
                <div className="cf-profile-section" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button type="button" className="cf-secondary-button" onClick={handleLogout}>
                    <LogOut size={16} /> Log out
                  </button>
                  <span style={{ fontSize: "13px", color: "var(--cf-muted)" }}>
                    You are signed in as {activeUser.email || activeUser.fullName || "CareerFit Member"}
                  </span>
                </div>

              </div>
            </section>
          )}
        </div>
      </main>

      <button
        type="button"
        className="cf-mobile-menu"
        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        onClick={() => setSidebarOpen((open) => !open)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}