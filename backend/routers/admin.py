from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from auth_utils import require_admin
from database import get_session
from models import User
from schemas import UserResponse

router = APIRouter()


class RoleUpdate(BaseModel):
    role: str


@router.get("/users", response_model=list[UserResponse])
def list_users(
    session: Session = Depends(get_session),
    _: str = Depends(require_admin),
):
    users = session.exec(select(User)).all()
    return [UserResponse(email=u.email, role=u.role) for u in users]


@router.patch("/users/{email}/role", response_model=UserResponse)
def update_role(
    email: str,
    body: RoleUpdate,
    session: Session = Depends(get_session),
    _: str = Depends(require_admin),
):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = body.role
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserResponse(email=user.email, role=user.role)


@router.delete("/users/{email}", status_code=204)
def delete_user(
    email: str,
    session: Session = Depends(get_session),
    _: str = Depends(require_admin),
):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
