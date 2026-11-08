from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import engine, Base
from .routers import auth, profile, assessments, study

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all database tables on application launch
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="CareerFit Career Readiness & Assessment Backend API",
    lifespan=lifespan
)

# Configure CORS for Vite client and deployment origins
origins = settings.cors_origins_list
if "*" not in origins and settings.ENVIRONMENT == "development":
    origins.extend(["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ENVIRONMENT == "development" else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Sub-Routers
app.include_router(auth.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
app.include_router(assessments.router, prefix="/api")
app.include_router(study.router, prefix="/api")

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "CareerFit API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }
