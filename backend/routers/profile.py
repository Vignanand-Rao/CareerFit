from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, CareerGoal, AssessmentRecord, CareerProgress
from ..schemas import (
    UserOut,
    ProfileUpdate,
    TargetRoleUpdate,
    CareerGoalOut,
    DashboardSnapshot,
    ReadinessResponse,
    AssessmentRecordOut
)
from ..auth import get_current_user
from ..career_logic import calculate_readiness, generate_study_plan

router = APIRouter(prefix="/profile", tags=["User Profile"])

@router.get("", response_model=DashboardSnapshot)
def get_profile_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(CareerGoal).filter(CareerGoal.user_id == current_user.id).first()
    if not goal:
        goal = CareerGoal(user_id=current_user.id, target_role="Python Developer")
        db.add(goal)
        db.commit()
        db.refresh(goal)

    progress = db.query(CareerProgress).filter(CareerProgress.user_id == current_user.id).first()
    completed_tasks = progress.completed_tasks if progress else []

    assessments = db.query(AssessmentRecord).filter(
        AssessmentRecord.user_id == current_user.id
    ).order_by(AssessmentRecord.completed_at.desc()).all()

    readiness_data = calculate_readiness(
        user_skills=current_user.skills or {},
        target_role_name=goal.target_role,
        assessment_history=assessments
    )

    study_plan = generate_study_plan(
        skill_gaps=readiness_data["skillGaps"],
        target_role_name=goal.target_role,
        completed_task_days=completed_tasks
    )

    return DashboardSnapshot(
        user=UserOut.model_validate(current_user),
        career_goal=CareerGoalOut.model_validate(goal),
        readiness=ReadinessResponse(**readiness_data),
        study_plan=study_plan,
        completed_tasks=completed_tasks,
        assessment_history=[AssessmentRecordOut.model_validate(a) for a in assessments]
    )

@router.patch("", response_model=UserOut)
def update_profile(
    updates: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if updates.full_name is not None:
        current_user.full_name = updates.full_name.strip()

    if updates.email is not None:
        new_email = updates.email.lower().strip()
        if new_email != current_user.email:
            existing = db.query(User).filter(User.email == new_email).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="This email address is already in use."
                )
            current_user.email = new_email

    if updates.skills is not None:
        # Explicit skill updates replace or set the skill dictionary
        current_user.skills = updates.skills

    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)
    return UserOut.model_validate(current_user)

@router.delete("/skills/{skill_name}", response_model=UserOut)
def delete_skill(
    skill_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    skills = dict(current_user.skills or {})
    if skill_name in skills:
        del skills[skill_name]
        current_user.skills = skills
        current_user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(current_user)
    return UserOut.model_validate(current_user)

@router.post("/role", response_model=CareerGoalOut)
def set_target_role(
    role_in: TargetRoleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(CareerGoal).filter(CareerGoal.user_id == current_user.id).first()
    if not goal:
        goal = CareerGoal(user_id=current_user.id, target_role=role_in.target_role)
        db.add(goal)
    else:
        # Preserve goal history
        history = list(goal.goal_history or [])
        history.append({
            "previousRole": goal.target_role,
            "changedAt": datetime.utcnow().isoformat()
        })
        goal.goal_history = history
        goal.target_role = role_in.target_role
        if role_in.career_preferences:
            goal.career_preferences = role_in.career_preferences

    goal.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(goal)
    return CareerGoalOut.model_validate(goal)
