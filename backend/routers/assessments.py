from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, CareerGoal, AssessmentRecord
from ..schemas import (
    GenerateQuestionsRequest,
    AssessmentQuestion,
    AssessmentSubmit,
    AssessmentRecordOut
)
from ..auth import get_current_user
from ..question_generator import generate_adaptive_questions

router = APIRouter(prefix="/assessments", tags=["Assessments"])

@router.post("/questions", response_model=list[AssessmentQuestion])
def get_adaptive_questions(
    req: GenerateQuestionsRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Dynamically generates on-the-spot questions tailored to the user's demonstrated capability.
    Calculates average past score on this skill to adjust question difficulty.
    """
    user_score_history = None
    capability = req.capability_level

    if current_user:
        # Check if user has explicit proficiency level
        if not capability and current_user.skills:
            capability = current_user.skills.get(req.skill)

        # Check past assessment scores for this skill
        past = db.query(AssessmentRecord).filter(
            AssessmentRecord.user_id == current_user.id,
            AssessmentRecord.skill == req.skill
        ).all()
        if past:
            user_score_history = sum(p.percentage for p in past) / len(past)

    generated = generate_adaptive_questions(
        skill=req.skill,
        qtype=req.type,
        count=req.count,
        capability_level=capability,
        user_score_history=user_score_history
    )

    return [AssessmentQuestion(**q) for q in generated]

@router.post("/submit", response_model=AssessmentRecordOut)
def submit_assessment(
    sub: AssessmentSubmit,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(CareerGoal).filter(CareerGoal.user_id == current_user.id).first()
    target_role = goal.target_role if goal else None

    record = AssessmentRecord(
        user_id=current_user.id,
        target_role=target_role,
        skill=sub.skill,
        type=sub.type,
        score=sub.score,
        total=sub.total,
        percentage=sub.percentage,
        difficulty=sub.difficulty or "medium"
    )
    db.add(record)

    # Automatically reinforce skill if scored >= 75%
    if sub.percentage >= 75.0:
        current_skills = dict(current_user.skills or {})
        current_prof = current_skills.get(sub.skill)
        if not current_prof or current_prof == "Beginner":
            current_skills[sub.skill] = "Advanced" if sub.percentage >= 90.0 else "Intermediate"
            current_user.skills = current_skills

    db.commit()
    db.refresh(record)
    return AssessmentRecordOut.model_validate(record)

@router.get("/history", response_model=list[AssessmentRecordOut])
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    records = db.query(AssessmentRecord).filter(
        AssessmentRecord.user_id == current_user.id
    ).order_by(AssessmentRecord.completed_at.desc()).all()
    return [AssessmentRecordOut.model_validate(r) for r in records]
