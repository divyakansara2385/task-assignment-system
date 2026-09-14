from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Task, Project

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# ---------------------------------------------------------
# CREATE TASK
# ---------------------------------------------------------

@router.post(
    "",
    response_model=TaskResponse,
    status_code=201
)
def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db)
):

    # Verify project exists
    project = (
        db.query(Project)
        .filter(
            Project.project_id == task_data.project_id
        )
        .first()
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    task = Task(
        **task_data.model_dump()
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


# ---------------------------------------------------------
# GET ALL TASKS
# ---------------------------------------------------------

@router.get(
    "",
    response_model=list[TaskResponse]
)
def get_tasks(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):

    tasks = (
        db.query(Task)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return tasks


# ---------------------------------------------------------
# GET SINGLE TASK
# ---------------------------------------------------------

@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: str,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(
            Task.task_id == task_id
        )
        .first()
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


# ---------------------------------------------------------
# UPDATE TASK
# ---------------------------------------------------------

@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: str,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(
            Task.task_id == task_id
        )
        .first()
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    update_data = task_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():

        setattr(
            task,
            field,
            value
        )

    db.commit()
    db.refresh(task)

    return task


# ---------------------------------------------------------
# DELETE TASK
# ---------------------------------------------------------

@router.delete(
    "/{task_id}"
)
def delete_task(
    task_id: str,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(
            Task.task_id == task_id
        )
        .first()
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully",
        "task_id": task_id
    }