from sqlalchemy.orm import Session

from app.db.models import (
    Employee,
    Task,
    Assignment,
)

from app.services.workload_services import (
    WorkloadService,
)


class AssignmentValidator:

    def __init__(self, db: Session):

        self.db = db

        self.workload_service = (
            WorkloadService(db)
        )

    # =========================================================
    # GET EMPLOYEE
    # =========================================================

    def get_employee(
        self,
        employee_id: str
    ):

        return (
            self.db.query(Employee)
            .filter(
                Employee.employee_id == employee_id
            )
            .first()
        )

    # =========================================================
    # GET TASK
    # =========================================================

    def get_task(
        self,
        task_id: str
    ):

        return (
            self.db.query(Task)
            .filter(
                Task.task_id == task_id
            )
            .first()
        )

    # =========================================================
    # VALIDATE EMPLOYEE
    # =========================================================

    def validate_employee(
        self,
        employee_id: str
    ):

        employee = self.get_employee(
            employee_id
        )

        if not employee:

            return {
                "valid": False,
                "reason": "Employee not found"
            }

        return {
            "valid": True,
            "reason": None
        }

    # =========================================================
    # VALIDATE TASK
    # =========================================================

    def validate_task(
        self,
        task_id: str
    ):

        task = self.get_task(
            task_id
        )

        if not task:

            return {
                "valid": False,
                "reason": "Task not found"
            }

        return {
            "valid": True,
            "reason": None
        }

    # =========================================================
    # DUPLICATE ASSIGNMENT CHECK
    # =========================================================

    def check_duplicate(
        self,
        task_id: str,
        employee_id: str
    ):

        assignment = (
            self.db.query(Assignment)
            .filter(
                Assignment.task_id == task_id,
                Assignment.employee_id == employee_id,
                Assignment.status == "ACTIVE"
            )
            .first()
        )

        if assignment:

            return {
                "valid": False,
                "reason": (
                    "Employee is already assigned "
                    "to this task"
                )
            }

        return {
            "valid": True,
            "reason": None
        }

    # =========================================================
    # CALCULATE CURRENT ASSIGNMENTS
    # =========================================================

    def calculate_current_assignments(
        self,
        employee_id: str
    ):

        assignments = (
            self.db.query(Assignment)
            .filter(
                Assignment.employee_id == employee_id,
                Assignment.status == "ACTIVE"
            )
            .all()
        )

        return len(assignments)

    # =========================================================
    # CAPACITY CHECK
    # =========================================================

    def check_capacity(
        self,
        employee_id: str
    ):

        employee = self.get_employee(
            employee_id
        )

        if not employee:

            return {
                "valid": False,
                "reason": "Employee not found.",
                "workload_pct": None,
                "active_assignments": 0
            }

        current_assignments = (
            self.calculate_current_assignments(
                employee_id
            )
        )

        # -----------------------------------------------------
        # First use WorkloadService
        # -----------------------------------------------------

        workload_check = (
            self.workload_service
            .can_accept_task(
                employee_id,
                None
            )
        )

        workload = workload_check.get(
            "workload"
        )

        # -----------------------------------------------------
        # Fallback to employee workload field
        # -----------------------------------------------------

        if workload is None:

            workload = getattr(
                employee,
                "current_workload_pct",
                None
            )

            if workload is not None:

                try:
                    workload = float(workload)

                except (TypeError, ValueError):

                    workload = None

        # -----------------------------------------------------
        # Check 100% capacity
        # -----------------------------------------------------

        if workload is not None:

            if workload >= 100:

                return {
                    "valid": False,
                    "reason": (
                        "Employee has no remaining "
                        "capacity."
                    ),
                    "workload_pct": workload,
                    "active_assignments":
                        current_assignments
                }

        # -----------------------------------------------------
        # WorkloadService may explicitly reject
        # -----------------------------------------------------

        if not workload_check.get(
            "allowed",
            True
        ):

            return {
                "valid": False,
                "reason": workload_check.get(
                    "reason",
                    "Employee cannot accept more work."
                ),
                "workload_pct": workload,
                "active_assignments":
                    current_assignments
            }

        return {
            "valid": True,
            "reason": None,
            "workload_pct": workload,
            "active_assignments":
                current_assignments
        }

    # =========================================================
    # COMPLETE ASSIGNMENT VALIDATION
    # =========================================================

    def validate_assignment(
        self,
        task_id: str,
        employee_id: str
    ):

        errors = []

        # -----------------------------------------------------
        # Employee
        # -----------------------------------------------------

        employee_check = (
            self.validate_employee(
                employee_id
            )
        )

        if not employee_check["valid"]:

            errors.append(
                employee_check["reason"]
            )

        # -----------------------------------------------------
        # Task
        # -----------------------------------------------------

        task_check = (
            self.validate_task(
                task_id
            )
        )

        if not task_check["valid"]:

            errors.append(
                task_check["reason"]
            )

        # -----------------------------------------------------
        # Stop if employee/task doesn't exist
        # -----------------------------------------------------

        if errors:

            return {
                "valid": False,
                "errors": errors,
                "employee_id": employee_id,
                "task_id": task_id
            }

        # -----------------------------------------------------
        # Duplicate
        # -----------------------------------------------------

        duplicate_check = (
            self.check_duplicate(
                task_id,
                employee_id
            )
        )

        if not duplicate_check["valid"]:

            errors.append(
                duplicate_check["reason"]
            )

        # -----------------------------------------------------
        # Capacity
        # -----------------------------------------------------

        capacity_check = (
            self.check_capacity(
                employee_id
            )
        )

        if not capacity_check["valid"]:

            errors.append(
                capacity_check["reason"]
            )

        # -----------------------------------------------------
        # Final response
        # -----------------------------------------------------

        return {
            "valid": len(errors) == 0,
            "errors": errors,

            "employee_id":
                employee_id,

            "task_id":
                task_id,

            "workload_pct":
                capacity_check.get(
                    "workload_pct"
                ),

            "active_assignments":
                capacity_check.get(
                    "active_assignments",
                    0
                )
        }