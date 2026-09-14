from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine


# =========================================================
# DATABASE MODELS
# =========================================================

from app.db.models import (
    Employee,
    Skill,
    EmployeeSkill,
    Project,
    Task,
    TaskSkill,
    Assignment,
)


# =========================================================
# API ROUTERS
# =========================================================

from app.api.employees import (
    router as employee_router
)

from app.api.projects import (
    router as project_router
)

from app.api.tasks import (
    router as task_router
)

from app.api.skills import (
    router as skill_router
)

from app.api.employee_skills import (
    router as employee_skill_router
)

from app.api.task_skills import (
    router as task_skill_router
)

from app.api.assignment import (
    router as assignment_router
)

from app.api.recommendation import (
    router as recommendation_router
)

from app.api.workload import (
    router as workload_router
)

from app.api.dashboard import (
    router as dashboard_router
)

from app.api.auth import (
    router as auth_router
)

from app.api.graph import (
    router as graph_router
)


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "AI-powered intelligent task assignment "
        "and workforce optimization system"
    ),
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# API ROUTERS
# =========================================================

app.include_router(
    employee_router
)

app.include_router(
    assignment_router
)

app.include_router(
    task_router
)

app.include_router(
    project_router
)

app.include_router(
    skill_router
)

app.include_router(
    employee_skill_router
)

app.include_router(
    task_skill_router
)

app.include_router(
    graph_router
)

app.include_router(
    workload_router
)

app.include_router(
    auth_router
)

app.include_router(
    recommendation_router
)

app.include_router(
    dashboard_router
)


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.get("/")
def root():

    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }