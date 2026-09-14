from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class TaskBase(BaseModel):

    project_id: str

    task_title: Optional[str] = None
    task_description: Optional[str] = None

    project_complexity: Optional[str] = None
    project_criticality: Optional[str] = None

    role_required: Optional[str] = None

    team_size_required: Optional[int] = Field(
        default=None,
        ge=1
    )

    estimated_hours: Optional[float] = Field(
        default=None,
        gt=0
    )

    deadline_days: Optional[int] = Field(
        default=None,
        ge=0
    )

    priority: Optional[str] = None

    required_experience_years: Optional[float] = Field(
        default=None,
        ge=0
    )

    task_start_date: Optional[date] = None
    task_due_date: Optional[date] = None

    assigned_count: Optional[int] = Field(
        default=0,
        ge=0
    )


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):

    task_title: Optional[str] = None
    task_description: Optional[str] = None

    project_complexity: Optional[str] = None
    project_criticality: Optional[str] = None

    role_required: Optional[str] = None

    team_size_required: Optional[int] = Field(
        default=None,
        ge=1
    )

    estimated_hours: Optional[float] = Field(
        default=None,
        gt=0
    )

    deadline_days: Optional[int] = Field(
        default=None,
        ge=0
    )

    priority: Optional[str] = None

    required_experience_years: Optional[float] = Field(
        default=None,
        ge=0
    )

    task_start_date: Optional[date] = None
    task_due_date: Optional[date] = None


class TaskResponse(TaskBase):

    task_id: str

    model_config = ConfigDict(from_attributes=True)