import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAssignments, getEmployees, getProject, getTasks } from "../services/api";
import {
  ArrowLeft,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  MoreHorizontal,
} from "lucide-react";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const fallbackProject = location.state?.project || {
    name: "Payment Gateway Integration",
    description:
      "Integrate a secure payment orchestration platform with multi-currency support and automated reconciliation workflows.",
    teamSize: "4-6",
    priority: "medium",
    deadline: "2026-10-15",
  };
  const [project, setProject] = useState(fallbackProject);
  const [apiTasks, setApiTasks] = useState([]);
  const [apiTeam, setApiTeam] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    Promise.all([getProject(id), getTasks(), getAssignments(), getEmployees()])
      .then(([result, allTasks, assignments, employees]) => {
        const projectTasks = allTasks.filter((task) => task.project_id === id);
        const projectTaskIds = new Set(projectTasks.map((task) => task.task_id));
        const projectAssignments = assignments.filter((assignment) => projectTaskIds.has(assignment.task_id));
        const employeeMap = new Map(employees.map((employee) => [String(employee.employee_id), employee]));

        setProject({
          ...result,
          name: result.project_domain || result.project_id,
          description: result.project_type || "",
          teamSize: "Not specified",
          priority: result.priority || "Not specified",
          deadline: result.end_date || "Not specified",
        });
        setApiTasks(projectTasks.map((task) => {
          const assignment = projectAssignments.find((item) => item.task_id === task.task_id);
          const employee = assignment
            ? employeeMap.get(String(assignment.employee_id))
            : null;
          return {
            ...task,
            assignment,
            assigneeName: employee?.name || (assignment ? `Employee ${assignment.employee_id}` : "Unassigned"),
          };
        }));
        setApiTeam(projectAssignments.map((assignment) => {
          const employee = employeeMap.get(String(assignment.employee_id));
          const name = employee?.name || `Employee ${assignment.employee_id}`;
          return {
            name,
            initials: name.slice(0, 2).toUpperCase(),
            role: employee?.role || "Team member",
            match: null,
            status: assignment.status || "Assigned",
          };
        }));
      })
      .catch(() => setError("Project details could not be loaded."))
      .finally(() => setLoading(false));
  }, [id]);

  const team = [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      role: "Backend Developer",
      match: 96,
      status: "Assigned",
    },
    {
      name: "Michael Chen",
      initials: "MC",
      role: "Backend Developer",
      match: 92,
      status: "Assigned",
    },
    {
      name: "Emily Davis",
      initials: "ED",
      role: "Integration Engineer",
      match: 89,
      status: "Assigned",
    },
  ];

  const tasks = [
    {
      title: "Set up FastAPI backend structure",
      assignee: "Sarah Johnson",
      status: "Completed",
      priority: "High",
    },
    {
      title: "Design database schema",
      assignee: "Michael Chen",
      status: "In Progress",
      priority: "High",
    },
    {
      title: "Integrate payment provider APIs",
      assignee: "Emily Davis",
      status: "Pending",
      priority: "Medium",
    },
  ];

  const displayedTasks = apiTasks.length ? apiTasks.map((task) => ({
    title: task.task_title || "Untitled task",
    assignee: task.assigneeName || "Unassigned",
    status: task.assignment?.status || "Pending",
    priority: task.priority || "Medium",
    assigned: Boolean(task.assignment),
  })) : tasks;
  const displayedTeam = apiTeam.length ? apiTeam : team;
  const projectProgress = displayedTasks.length
    ? Math.round(displayedTasks.reduce((total, task) => {
      if (task.status === "COMPLETED" || task.status === "Completed") return total + 100;
      if (task.status === "IN_PROGRESS" || task.status === "In Progress") return total + 50;
      if (task.assigned) return total + 25;
      return total;
    }, 0) / displayedTasks.length)
    : 0;

  return (
    <div className="project-details-page">

      {loading && <p>Loading project...</p>}
      {error && <p className="form-error">{error}</p>}

      {/* Back */}

      <button
        className="back-link"
        onClick={() => navigate("/projects")}
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}

      <div className="project-details-header">

        <div>

          <p className="eyebrow">
            ACTIVE PROJECT
          </p>

          <h1>{project.name}</h1>

          <p>
            {project.description}
          </p>

        </div>

        <button className="project-action-button">
          <Plus size={16} />
          Add Task
        </button>

      </div>

      {/* Project Stats */}

      <div className="project-stats-grid">

        <div className="project-stat-card">

          <Calendar size={18} />

          <div>
            <span>Deadline</span>

            <strong>
              {project.deadline || "Not specified"}
            </strong>
          </div>

        </div>

        <div className="project-stat-card">

          <Users size={18} />

          <div>
            <span>Team Members</span>

            <strong>
              {displayedTeam.length}
            </strong>
          </div>

        </div>

        <div className="project-stat-card">

          <CheckCircle2 size={18} />

          <div>
            <span>Progress</span>

            <strong>{projectProgress}%</strong>
          </div>

        </div>

        <div className="project-stat-card">

          <Sparkles size={18} />

          <div>
            <span>AI Assignment</span>

            <strong>Active</strong>
          </div>

        </div>

      </div>

      {/* Main Layout */}

      <div className="project-details-layout">

        {/* LEFT */}

        <div className="project-main-content">

          {/* Team */}

          <section className="project-details-card">

            <div className="details-card-header">

              <div>

                <h2>Assigned Team</h2>

                <p>
                  AI-recommended team members
                </p>

              </div>

              <span className="assigned-team-count">
                {displayedTeam.length} Members
              </span>

            </div>

            <div className="assigned-team-list">

              {displayedTeam.map((member, index) => (

                <div
                  className="assigned-member"
                  key={index}
                >

                  <div className="assigned-member-avatar">

                    {member.initials}

                  </div>

                  <div className="assigned-member-info">

                    <h3>{member.name}</h3>

                    <p>{member.role}</p>

                  </div>

                  <div className="assigned-member-match">

                    <span>AI Match</span>

                    <strong>
                      {member.match}%
                    </strong>

                  </div>

                  <span className="assigned-status">

                    {member.status}

                  </span>

                </div>

              ))}

            </div>

          </section>

          {/* Tasks */}

          <section className="project-details-card">

            <div className="details-card-header">

              <div>

                <h2>Project Tasks</h2>

                <p>
                  Tasks assigned to your team
                </p>

              </div>

              <button className="text-button">

                View All Tasks →

              </button>

            </div>

            <div className="project-task-list">

              {displayedTasks.map((task, index) => (

                <div
                  className="project-task-row"
                  key={index}
                >

                  <div className="task-check">

                    {task.status === "Completed"
                      ? <CheckCircle2 size={17} />
                      : <Clock size={17} />
                    }

                  </div>

                  <div className="project-task-info">

                    <h3>{task.title}</h3>

                    <p>
                      Assigned to {task.assignee}
                    </p>

                  </div>

                  <span
                    className={`task-status ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`task-priority ${task.priority
                      .toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <button className="task-more">

                    <MoreHorizontal size={18} />

                  </button>

                </div>

              ))}

            </div>

          </section>

        </div>

        {/* RIGHT */}

        <aside className="project-details-sidebar">

          {/* Progress */}

          <div className="project-details-card progress-card">

            <h2>Project Progress</h2>

            <div className="large-progress">

              <div className="large-progress-number">

                {projectProgress}%

              </div>

            </div>

            <p className="progress-card-text">

              Your project is currently in progress.

            </p>

            <div className="progress-bar">

              <div
                className="progress-bar-fill"
                style={{ width: `${projectProgress}%` }}
              />

            </div>

          </div>

          {/* AI Info */}

          <div className="project-ai-card">

            <div className="project-ai-icon">

              <Sparkles size={19} />

            </div>

            <h3>AI Assignment Active</h3>

            <p>
              Our AI continuously monitors skills,
              workload, and task requirements to
              recommend the best assignments.
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
}