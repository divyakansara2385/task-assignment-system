from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, ConfigDict


# =========================================================
# REQUIRED SKILL
# =========================================================

class RequiredSkill(BaseModel):
    skill_id: str
    required_level: float = 0


# =========================================================
# ASSIGNMENT RECOMMENDATION REQUEST
# =========================================================

class AssignmentRecommendationRequest(BaseModel):

    required_skills: List[RequiredSkill] = Field(
        default_factory=list
    )

    required_experience: float = 0

    top_k: int = Field(
        default=10,
        ge=1,
        le=50
    )


# =========================================================
# EMPLOYEE RECOMMENDATION
# =========================================================

class EmployeeRecommendation(BaseModel):

    employee_id: str
    name: Optional[str] = None

    skill_match: float
    workload_score: float
    experience_score: float
    performance_score: float

    final_score: float


# =========================================================
# ASSIGNMENT RECOMMENDATION RESPONSE
# =========================================================

class AssignmentRecommendationResponse(BaseModel):

    total_candidates: int

    recommendations: List[
        EmployeeRecommendation
    ]


# =========================================================
# CREATE ASSIGNMENT
# =========================================================

class AssignmentCreate(BaseModel):

    task_id: str
    employee_id: str


# =========================================================
# UPDATE ASSIGNMENT STATUS
# =========================================================

class AssignmentStatusUpdate(BaseModel):

    status: str


# =========================================================
# ASSIGNMENT RESPONSE
# =========================================================

class AssignmentResponse(BaseModel):

    assignment_id: int
    task_id: str
    employee_id: str

    status: Optional[str] = None
    assigned_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)