from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

class AiTrainingDataBase(SQLModel):
    data_type: str = Field(index=True) # e.g., 'faq', 'product_info', 'service_info', 'sales_technique'
    content: str # The actual text data for training
    source: Optional[str] = None # e.g., 'uploaded_file.txt', 'manual_input'
    owner_id: int = Field(foreign_key="user.id")

class AiTrainingData(AiTrainingDataBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # owner: User = Relationship(back_populates="ai_training_data") # Uncomment if User model has back_populates

class AiTrainingDataCreate(AiTrainingDataBase):
    pass

class AiTrainingDataRead(AiTrainingDataBase):
    id: int
    created_at: datetime

class AiTrainingDataUpdate(SQLModel):
    data_type: Optional[str] = None
    content: Optional[str] = None
    source: Optional[str] = None


