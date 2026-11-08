import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid(prefix: str = "id") -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"

class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True, default=lambda: generate_uuid("usr"))
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    skills = Column(JSON, default=dict)  # e.g., {"Python": "Intermediate", "SQL": "Beginner"}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    career_goals = relationship("CareerGoal", back_populates="user", cascade="all, delete-orphan")
    assessments = relationship("AssessmentRecord", back_populates="user", cascade="all, delete-orphan")
    progress = relationship("CareerProgress", back_populates="user", uselist=False, cascade="all, delete-orphan")

class CareerGoal(Base):
    __tablename__ = "career_goals"

    id = Column(String(64), primary_key=True, index=True, default=lambda: generate_uuid("goal"))
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    target_role = Column(String(100), default="Python Developer", nullable=False)
    career_preferences = Column(JSON, default=dict)
    goal_history = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="career_goals")

class AssessmentRecord(Base):
    __tablename__ = "assessment_records"

    id = Column(String(64), primary_key=True, index=True, default=lambda: generate_uuid("asm"))
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    target_role = Column(String(100), nullable=True)
    skill = Column(String(100), nullable=False, index=True)
    type = Column(String(50), nullable=False)  # MCQ, Fill in Blanks, Coding
    score = Column(Integer, nullable=False)
    total = Column(Integer, nullable=False)
    percentage = Column(Float, nullable=False)
    difficulty = Column(String(30), default="medium")
    completed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="assessments")

class CareerProgress(Base):
    __tablename__ = "career_progress"

    id = Column(String(64), primary_key=True, index=True, default=lambda: generate_uuid("prog"))
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)
    completed_tasks = Column(JSON, default=list)  # e.g., ["DAY 01", "DAY 02"]
    completed_activities = Column(JSON, default=list)
    readiness_history = Column(JSON, default=list)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="progress")
