from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from auth_utils import hash_password, verify_password, create_access_token, get_current_user
from database import get_session
from models import User
from schemas import RegisterRequest, LoginRequest, UserResponse, TokenResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=201)
def register(request: RegisterRequest, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == request.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=request.email,
        hashed_password=hash_password(request.password),
        role="user",
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserResponse(email=user.email, role=user.role)


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == request.email)).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return TokenResponse(access_token=create_access_token(request.email))


@router.get("/me", response_model=UserResponse)
def me(
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    user = session.exec(select(User).where(User.email == current_user)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(email=user.email, role=user.role)
