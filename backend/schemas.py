from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field

# ── Auth Schemas ─────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=6)
    skills: Optional[dict[str, str]] = Field(default_factory=dict)
    target_role: Optional[str] = "Python Developer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"

# ── User & Profile Schemas ───────────────────────────────────────────────────

class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    skills: dict[str, str] = Field(default_factory=dict)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    skills: Optional[dict[str, str]] = None

class TargetRoleUpdate(BaseModel):
    target_role: str
    career_preferences: Optional[dict[str, Any]] = None

class CareerGoalOut(BaseModel):
    id: str
    user_id: str
    target_role: str
    career_preferences: dict[str, Any] = Field(default_factory=dict)
    goal_history: list[dict[str, Any]] = Field(default_factory=list)
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# ── Assessment Schemas ───────────────────────────────────────────────────────

class QuestionOption(BaseModel):
    id: str
    text: str

class AssessmentQuestion(BaseModel):
    id: int
    question: str
    options: Optional[list[str]] = None
    correctAnswer: Any
    explanation: Optional[str] = None
    initialCode: Optional[str] = None
    testCases: Optional[list[dict[str, Any]]] = None
    difficulty: Optional[str] = "medium"

class GenerateQuestionsRequest(BaseModel):
    skill: str
    type: str = "MCQ"  # MCQ, Fill in Blanks, Coding
    count: int = 3
    capability_level: Optional[str] = None  # Beginner, Intermediate, Advanced
    user_score_history: Optional[float] = None  # 0-100 average score

class AssessmentSubmit(BaseModel):
    skill: str
    type: str
    score: int
    total: int
    percentage: float
    difficulty: Optional[str] = "medium"

class AssessmentRecordOut(BaseModel):
    id: str
    user_id: str
    skill: str
    type: str
    score: int
    total: int
    percentage: float
    difficulty: str
    completed_at: datetime

    class Config:
        from_attributes = True

# ── Progress & Readiness Schemas ─────────────────────────────────────────────

class TaskToggleRequest(BaseModel):
    day_id: str

class SkillBreakdownItem(BaseModel):
    name: str
    score: int
    targetLevel: str
    currentLevel: str
    core: bool
    weight: float
    verified: bool
    color: str

class SkillGapItem(BaseModel):
    name: str
    priority: str
    currentLevel: str
    targetLevel: str
    gap: int
    reason: str

class ReadinessResponse(BaseModel):
    overallScore: int
    status: str
    skillBreakdown: list[SkillBreakdownItem]
    skillGaps: list[SkillGapItem]
    strengths: list[dict[str, Any]]

class DashboardSnapshot(BaseModel):
    user: UserOut
    career_goal: CareerGoalOut
    readiness: ReadinessResponse
    study_plan: list[dict[str, Any]]
    completed_tasks: list[str]
    assessment_history: list[AssessmentRecordOut]
