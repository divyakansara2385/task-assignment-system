import { useLocation, useNavigate } from "react-router-dom";
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

  const project = location.state?.project || {
    name: "Payment Gateway Integration",
    description:
      "Integrate a secure payment orchestration platform with multi-currency support and automated reconciliation workflows.",
    teamSize: "4-6",
    priority: "medium",
    deadline: "2026-10-15",
  };

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

  return (
    <div className="project-details-page">

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
              {team.length}
            </strong>
          </div>

        </div>

        <div className="project-stat-card">

          <CheckCircle2 size={18} />

          <div>
            <span>Progress</span>

            <strong>35%</strong>
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
                {team.length} Members
              </span>

            </div>

            <div className="assigned-team-list">

              {team.map((member, index) => (

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

              {tasks.map((task, index) => (

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

                35%

              </div>

            </div>

            <p className="progress-card-text">

              Your project is currently in progress.

            </p>

            <div className="progress-bar">

              <div
                className="progress-bar-fill"
                style={{ width: "35%" }}
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