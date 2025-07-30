from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager

from sqlmodel import SQLModel

from .core.database import engine
from .core.config import settings

from .routes import auth, users, plans, campaigns, ai_training, ai_interaction, whatsapp, bot_control

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(users.router, prefix=settings.API_V1_STR)
app.include_router(plans.router, prefix=settings.API_V1_STR)
app.include_router(campaigns.router, prefix=settings.API_V1_STR)
app.include_router(ai_training.router, prefix=settings.API_V1_STR)
app.include_router(ai_interaction.router, prefix=settings.API_V1_STR)
app.include_router(whatsapp.router, prefix=settings.API_V1_STR)
app.include_router(bot_control.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

