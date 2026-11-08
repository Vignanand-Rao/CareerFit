from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, CareerGoal, AssessmentRecord, CareerProgress
from ..schemas import ReadinessResponse
from ..auth import get_current_user
from ..career_logic import calculate_readiness, generate_study_plan

router = APIRouter(prefix="/study", tags=["Study Plan & Readiness"])

@router.get("/readiness", response_model=ReadinessResponse)
def get_readiness_breakdown(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(CareerGoal).filter(CareerGoal.user_id == current_user.id).first()
    target_role = goal.target_role if goal else "Python Developer"

    assessments = db.query(AssessmentRecord).filter(
        AssessmentRecord.user_id == current_user.id
    ).all()

    analysis = calculate_readiness(
        user_skills=current_user.skills or {},
        target_role_name=target_role,
        assessment_history=assessments
    )
    return ReadinessResponse(**analysis)

@router.get("/roadmap")
def get_study_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(CareerGoal).filter(CareerGoal.user_id == current_user.id).first()
    target_role = goal.target_role if goal else "Python Developer"

    progress = db.query(CareerProgress).filter(CareerProgress.user_id == current_user.id).first()
    completed = progress.completed_tasks if progress else []

    assessments = db.query(AssessmentRecord).filter(
        AssessmentRecord.user_id == current_user.id
    ).all()

    analysis = calculate_readiness(
        user_skills=current_user.skills or {},
        target_role_name=target_role,
        assessment_history=assessments
    )

    study_plan = generate_study_plan(
        skill_gaps=analysis["skillGaps"],
        target_role_name=target_role,
        completed_task_days=completed
    )
    return study_plan

@router.patch("/toggle/{day_id}")
def toggle_task(
    day_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    progress = db.query(CareerProgress).filter(CareerProgress.user_id == current_user.id).first()
    if not progress:
        progress = CareerProgress(user_id=current_user.id, completed_tasks=[day_id])
        db.add(progress)
    else:
        current_tasks = list(progress.completed_tasks or [])
        if day_id in current_tasks:
            current_tasks.remove(day_id)
        else:
            current_tasks.append(day_id)
        progress.completed_tasks = current_tasks

    db.commit()
    db.refresh(progress)
    return {"completed_tasks": progress.completed_tasks}
