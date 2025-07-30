from fastapi import APIRouter, Depends
from ..core.dependencies import get_current_active_user
from ..models.user import User

router = APIRouter(
    prefix="/plans",
    tags=["plans"],
)

@router.get("/")
async def get_plans(current_user: User = Depends(get_current_active_user)):
    return {"plans": []}

