from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ..core.database import get_session
from ..models.ai_training import AiTrainingData, AiTrainingDataCreate, AiTrainingDataRead, AiTrainingDataUpdate

router = APIRouter(prefix="/ai-training", tags=["AI Training"])

@router.post("/", response_model=AiTrainingDataRead)
def create_training_data(
    training_data: AiTrainingDataCreate,
    db: Session = Depends(get_session)
):
    """Create new AI training data."""
    db_training_data = AiTrainingData.model_validate(training_data)
    db.add(db_training_data)
    db.commit()
    db.refresh(db_training_data)
    return db_training_data

@router.get("/", response_model=List[AiTrainingDataRead])
def get_training_data(
    owner_id: int = None,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    """Get AI training data."""
    query = select(AiTrainingData)
    if owner_id:
        query = query.where(AiTrainingData.owner_id == owner_id)
    query = query.limit(limit)
    training_data = db.exec(query).all()
    return training_data

@router.get("/{training_data_id}", response_model=AiTrainingDataRead)
def get_training_data_by_id(
    training_data_id: int,
    db: Session = Depends(get_session)
):
    """Get specific AI training data by ID."""
    training_data = db.get(AiTrainingData, training_data_id)
    if not training_data:
        raise HTTPException(status_code=404, detail="Training data not found")
    return training_data

@router.put("/{training_data_id}", response_model=AiTrainingDataRead)
def update_training_data(
    training_data_id: int,
    training_data_update: AiTrainingDataUpdate,
    db: Session = Depends(get_session)
):
    """Update AI training data."""
    db_training_data = db.get(AiTrainingData, training_data_id)
    if not db_training_data:
        raise HTTPException(status_code=404, detail="Training data not found")
    
    training_data_data = training_data_update.model_dump(exclude_unset=True)
    for key, value in training_data_data.items():
        setattr(db_training_data, key, value)
    
    db.add(db_training_data)
    db.commit()
    db.refresh(db_training_data)
    return db_training_data

@router.delete("/{training_data_id}")
def delete_training_data(
    training_data_id: int,
    db: Session = Depends(get_session)
):
    """Delete AI training data."""
    training_data = db.get(AiTrainingData, training_data_id)
    if not training_data:
        raise HTTPException(status_code=404, detail="Training data not found")
    
    db.delete(training_data)
    db.commit()
    return {"message": "Training data deleted successfully"}

