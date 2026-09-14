from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


def parse_project_date(value):
    if isinstance(value, str):
        try:
            return date.fromisoformat(value)
        except ValueError:
            return datetime.strptime(
                value,
                "%d/%m/%Y",
            ).date()

    return value


class ProjectCreate(BaseModel):

    project_id: str

    project_domain: Optional[str] = None
    project_type: Optional[str] = None

    project_complexity: Optional[str] = None
    project_criticality: Optional[str] = None

    priority: Optional[str] = None

    start_date: Optional[date] = None
    end_date: Optional[date] = None

    _parse_dates = field_validator(
        "start_date",
        "end_date",
        mode="before",
    )(parse_project_date)


class ProjectUpdate(BaseModel):

    project_domain: Optional[str] = None
    project_type: Optional[str] = None

    project_complexity: Optional[str] = None
    project_criticality: Optional[str] = None

    priority: Optional[str] = None

    start_date: Optional[date] = None
    end_date: Optional[date] = None


class ProjectResponse(BaseModel):

    project_id: str

    project_domain: Optional[str] = None
    project_type: Optional[str] = None

    project_complexity: Optional[str] = None
    project_criticality: Optional[str] = None

    priority: Optional[str] = None

    start_date: Optional[date] = None
    end_date: Optional[date] = None

    model_config = ConfigDict(from_attributes=True)