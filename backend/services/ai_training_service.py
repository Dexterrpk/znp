from sqlmodel import Session, select
from typing import List

from ..models.ai_training import AiTrainingData

def get_training_data_by_owner(db: Session, owner_id: int, limit: int = 50) -> List[AiTrainingData]:
    """Fetches AI training data for a specific owner."""
    query = select(AiTrainingData).where(AiTrainingData.owner_id == owner_id).limit(limit)
    return db.exec(query).all()


