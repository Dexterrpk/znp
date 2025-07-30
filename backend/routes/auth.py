from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    # Simplified login - in production implement proper authentication
    if login_data.email == "admin@zynapse.com":
        return LoginResponse(access_token="mock_token", token_type="bearer")
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

