from typing import Optional

from pydantic import BaseModel, ConfigDict


class SkillCreate(BaseModel):
    skill_name: str
    description: Optional[str] = None


class SkillUpdate(BaseModel):
    skill_name: Optional[str] = None
    description: Optional[str] = None


class SkillResponse(BaseModel):
    skill_id: str
    skill_name: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)