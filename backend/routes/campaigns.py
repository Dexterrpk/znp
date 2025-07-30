from fastapi import APIRouter

router = APIRouter(prefix="/campaigns", tags=["Campaigns"])

@router.get("/")
def read_campaigns():
    return {"message": "Campaigns endpoint"}


