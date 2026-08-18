from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core import security
from app.schemas.schemas import Token

router = APIRouter()

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Mock user verification for initial spin-up
    if form_data.username and form_data.password:
        access_token = security.create_access_token(subject=form_data.username)
        refresh_token = security.create_refresh_token(subject=form_data.username)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str):
    payload = security.decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=400, detail="Invalid refresh token type")
    username = payload.get("sub")
    new_access_token = security.create_access_token(subject=username)
    new_refresh_token = security.create_refresh_token(subject=username)
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }
