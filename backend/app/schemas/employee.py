from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class EmployeeBase(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    seniority: Optional[str] = None

    years_experience: Optional[float] = Field(
        default=None,
        ge=0
    )

    performance_score: Optional[float] = Field(
        default=None,
        ge=0,
        le=100
    )

    current_workload_pct: Optional[float] = Field(
        default=None,
        ge=0,
        le=100
    )

    availability_pct: Optional[float] = Field(
        default=None,
        ge=0,
        le=100
    )

    available_from: Optional[str] = None

    critical_project_experience: Optional[int] = Field(
        default=None,
        ge=0
    )


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    employee_id: int

    model_config = ConfigDict(from_attributes=True)