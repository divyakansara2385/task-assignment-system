import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../services/api";
import {
  Search,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
} from "lucide-react";

export default function TaskManagement() {
  const [search, setSearch] = useState("");
  const [apiTasks, setApiTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTasks()
      .then(setApiTasks)
      .catch(() => setError("Task data could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const tasks = [
    {
      id: 1,
      title: "Design database models",
      project: "Payment Gateway Integration",
      assignee: "Sarah Johnson",
      initials: "SJ",
      priority: "High",
      status: "Completed",
      deadline: "Sep 20, 2026",
    },
    {
      id: 2,
      title: "Develop authentication APIs",
      project: "Payment Gateway Integration",
      assignee: "Michael Chen",
      initials: "MC",
      priority: "High",
      status: "In Progress",
      deadline: "Sep 25, 2026",
    },
    {
      id: 3,
      title: "Integrate payment provider APIs",
      project: "Payment Gateway Integration",
      assignee: "Emily Davis",
      initials: "ED",
      priority: "Medium",
      status: "In Progress",
      deadline: "Sep 30, 2026",
    },
    {
      id: 4,
      title: "Build analytics dashboard",
      project: "Customer Analytics Platform",
      assignee: "David Wilson",
      initials: "DW",
      priority: "Medium",
      status: "Pending",
      deadline: "Oct 5, 2026",
    },
    {
      id: 5,
      title: "Optimize database queries",
      project: "Customer Analytics Platform",
      assignee: "Sarah Johnson",
      initials: "SJ",
      priority: "Low",
      status: "Pending",
      deadline: "Oct 10, 2026",
    },
  ];

  const displayedTasks = apiTasks?.map((task) => ({
    id: task.task_id,
    title: task.task_title || "Untitled task",
    project: task.project_id,
    assignee: "Unassigned",
    initials: "--",
    priority: task.priority || "Medium",
    status: "Pending",
    deadline: task.task_due_date || "No deadline",
  })) || tasks;

  // Search filtering
  const filteredTasks = displayedTasks.filter((task) => {
    const searchText = search.toLowerCase();

    return (
      task.title.toLowerCase().includes(searchText) ||
      task.project.toLowerCase().includes(searchText) ||
      task.assignee.toLowerCase().includes(searchText)
    );
  });

  // Statistics
  const completedTasks = displayedTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = displayedTasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = displayedTasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="task-management-page">

      {loading && <p>Loading tasks...</p>}
      {error && <p className="form-error">{error}</p>}

      {/* ================= HEADER ================= */}

      <div className="task-management-header">

        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>

          <h1>Tasks</h1>

          <p>
            Track tasks, assignments, priorities,
            deadlines, and progress across projects.
          </p>
        </div>

        <button
    className="primary-button"
    onClick={() => navigate("/tasks/new")}
>
  <Plus size={16} />
  Create Task
</button>

      </div>

      {/* ================= TASK STATS ================= */}

      <div className="task-stats-grid">

        {/* Total Tasks */}

        <div className="task-stat-card">

          <ListTodo size={19} />

          <div>
            <span>Total Tasks</span>
            <strong>{displayedTasks.length}</strong>
          </div>

        </div>

        {/* Completed */}

        <div className="task-stat-card completed">

          <CheckCircle2 size={19} />

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

        </div>

        {/* In Progress */}

        <div className="task-stat-card progress">

          <Clock size={19} />

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>

        </div>

        {/* Pending */}

        <div className="task-stat-card pending">

          <AlertCircle size={19} />

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="task-controls">

        <div className="task-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search tasks, projects, or employees..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

      </div>

      {/* ================= TASK TABLE ================= */}

      <div className="task-table-card">

        {/* Table Header */}

        <div className="task-table-header">

          <span>Task</span>
          <span>Project</span>
          <span>Assignee</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Deadline</span>

        </div>

        {/* Task List */}

        <div className="task-table-body">

          {filteredTasks.length > 0 ? (

            filteredTasks.map((task) => (

              <div
                className="task-table-row clickable-task-row"
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >

                {/* Task Title */}

                <div className="task-title-cell">

                  <div className="task-icon">

                    {task.status === "Completed" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Clock size={16} />
                    )}

                  </div>

                  <strong>{task.title}</strong>

                </div>

                {/* Project */}

                <div className="task-project">
                  {task.project}
                </div>

                {/* Assignee */}

                <div className="task-assignee">

                  <div className="task-avatar">
                    {task.initials}
                  </div>

                  <span>
                    {task.assignee}
                  </span>

                </div>

                {/* Priority */}

                <div>

                  <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                </div>

                {/* Status */}

                <div>

                  <span
                    className={`task-status-badge ${task.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                </div>

                {/* Deadline */}

                <div className="task-deadline">
                  {task.deadline}
                </div>

              </div>

            ))

          ) : (

            /* Empty Search State */

            <div className="no-tasks-found">

              <ListTodo size={30} />

              <h3>No tasks found</h3>

              <p>
                Try searching with different keywords.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}