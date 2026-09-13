import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default function EmployeeDetails() {
  const navigate = useNavigate();

  const employee = {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Backend Developer",
    email: "sarah.johnson@company.com",
    availability: "Available",
    workload: 45,
    performance: 94,
    projects: 2,
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "Docker",
    ],
  };

  const projects = [
    {
      name: "Payment Gateway Integration",
      progress: 65,
      status: "In Progress",
    },
    {
      name: "Customer Analytics Platform",
      progress: 30,
      status: "In Progress",
    },
  ];

  const tasks = [
    {
      title: "Design database models",
      project: "Payment Gateway Integration",
      status: "Completed",
    },
    {
      title: "Develop authentication APIs",
      project: "Payment Gateway Integration",
      status: "In Progress",
    },
    {
      title: "Optimize database queries",
      project: "Customer Analytics Platform",
      status: "Pending",
    },
  ];

  return (
    <div className="employee-details-page">

      {/* Back Button */}

      <button
        className="back-link"
        onClick={() => navigate("/team")}
      >
        <ArrowLeft size={16} />
        Back to Team
      </button>

      {/* Profile Header */}

      <div className="employee-profile-header">

        <div className="employee-profile-main">

          <div className="employee-large-avatar">
            {employee.initials}
          </div>

          <div>

            <p className="eyebrow">
              TEAM MEMBER
            </p>

            <h1>{employee.name}</h1>

            <p className="employee-role">
              {employee.role}
            </p>

            <div className="employee-contact">

              <Mail size={14} />

              {employee.email}

            </div>

          </div>

        </div>

        <span className="employee-availability-large">
          {employee.availability}
        </span>

      </div>

      {/* Stats */}

      <div className="employee-details-stats">

        <div className="employee-detail-stat">

          <Briefcase size={18} />

          <div>
            <span>Active Projects</span>
            <strong>{employee.projects}</strong>
          </div>

        </div>

        <div className="employee-detail-stat">

          <Clock size={18} />

          <div>
            <span>Current Workload</span>
            <strong>{employee.workload}%</strong>
          </div>

        </div>

        <div className="employee-detail-stat">

          <TrendingUp size={18} />

          <div>
            <span>Performance Score</span>
            <strong>{employee.performance}%</strong>
          </div>

        </div>

        <div className="employee-detail-stat">

          <CheckCircle2 size={18} />

          <div>
            <span>Completed Tasks</span>
            <strong>24</strong>
          </div>

        </div>

      </div>

      {/* Main Layout */}

      <div className="employee-details-layout">

        {/* Left Content */}

        <div className="employee-details-main">

          {/* Skills */}

          <section className="employee-details-card">

            <div className="details-card-header">

              <div>

                <h2>Skills & Expertise</h2>

                <p>
                  Technical skills and competencies
                </p>

              </div>

            </div>

            <div className="employee-skills-large">

              {employee.skills.map((skill) => (

                <span key={skill}>
                  {skill}
                </span>

              ))}

            </div>

          </section>

          {/* Projects */}

          <section className="employee-details-card">

            <div className="details-card-header">

              <div>

                <h2>Active Projects</h2>

                <p>
                  Projects currently assigned
                </p>

              </div>

            </div>

            <div className="employee-project-list">

              {projects.map((project) => (

                <div
                  className="employee-project-row"
                  key={project.name}
                >

                  <div className="employee-project-info">

                    <h3>{project.name}</h3>

                    <span>{project.status}</span>

                  </div>

                  <div className="employee-project-progress">

                    <strong>
                      {project.progress}%
                    </strong>

                    <div className="employee-progress-track">

                      <div
                        className="employee-progress-fill"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* Tasks */}

          <section className="employee-details-card">

            <div className="details-card-header">

              <div>

                <h2>Assigned Tasks</h2>

                <p>
                  Current task assignments
                </p>

              </div>

            </div>

            <div className="employee-task-list">

              {tasks.map((task) => (

                <div
                  className="employee-task-row"
                  key={task.title}
                >

                  <div className="employee-task-icon">

                    {task.status === "Completed"
                      ? <CheckCircle2 size={17} />
                      : <Clock size={17} />
                    }

                  </div>

                  <div className="employee-task-info">

                    <h3>{task.title}</h3>

                    <p>{task.project}</p>

                  </div>

                  <span
                    className={`employee-task-status ${
                      task.status
                        .toLowerCase()
                        .replaceAll(" ", "-")
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

        </div>

        {/* Right Sidebar */}

        <aside className="employee-details-sidebar">

          {/* Workload */}

          <div className="employee-details-card employee-workload-card">

            <h2>Current Workload</h2>

            <div className="employee-workload-circle">

              <strong>
                {employee.workload}%
              </strong>

              <span>Capacity Used</span>

            </div>

            <p>
              Sarah currently has available capacity
              for additional assignments.
            </p>

          </div>

          {/* Performance */}

          <div className="employee-performance-card">

            <div className="performance-icon">

              <Star size={19} />

            </div>

            <h3>Excellent Performance</h3>

            <strong>
              {employee.performance}%
            </strong>

            <p>
              Consistently delivers high-quality work
              and completes tasks on schedule.
            </p>

          </div>

          {/* Team Info */}

          <div className="employee-details-card employee-team-card">

            <Users size={18} />

            <h3>Team Contribution</h3>

            <p>
              Currently contributing to{" "}
              {employee.projects} active projects.
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
}