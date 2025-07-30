from fastapi import APIRouter, Depends
from ..core.dependencies import get_current_active_user
from ..models.user import User

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.get("/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

