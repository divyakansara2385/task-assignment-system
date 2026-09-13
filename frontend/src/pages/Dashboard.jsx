import {
  FolderKanban,
  Users,
  CheckCircle2,
  Clock3,
  Plus,
  ArrowRight,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const projects = [
    {
      name: "AI Customer Support",
      team: 5,
      progress: 72,
      status: "In Progress",
      deadline: "Sep 22, 2026",
    },
    {
      name: "Mobile Banking App",
      team: 4,
      progress: 45,
      status: "In Progress",
      deadline: "Oct 03, 2026",
    },
    {
      name: "Analytics Platform",
      team: 6,
      progress: 88,
      status: "Near Completion",
      deadline: "Sep 18, 2026",
    },
  ];

  const activities = [
    {
      title: "Team assigned to AI Customer Support",
      time: "12 minutes ago",
      icon: CheckCircle2,
    },
    {
      title: "New project created",
      time: "1 hour ago",
      icon: FolderKanban,
    },
    {
      title: "Recommendation generated",
      time: "3 hours ago",
      icon: Activity,
    },
    {
      title: "Team availability updated",
      time: "Yesterday",
      icon: Users,
    },
  ];

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">PROJECT MANAGER</p>

          <h1>Good morning, Project Manager 👋</h1>

          <p className="dashboard-description">
            Here's what's happening with your projects and team today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/projects/new")}
        >
          <Plus size={18} />
          Create New Project
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon blue">
              <FolderKanban size={20} />
            </div>

            <span className="summary-trend">+2 this month</span>
          </div>

          <div className="summary-number">12</div>
          <div className="summary-label">Active Projects</div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon purple">
              <Users size={20} />
            </div>

            <span className="summary-trend">92% utilized</span>
          </div>

          <div className="summary-number">38</div>
          <div className="summary-label">Team Members</div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon green">
              <CheckCircle2 size={20} />
            </div>

            <span className="summary-trend">+8.4%</span>
          </div>

          <div className="summary-number">94.2%</div>
          <div className="summary-label">Average Assignment Score</div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon orange">
              <Clock3 size={20} />
            </div>

            <span className="summary-trend warning">3 urgent</span>
          </div>

          <div className="summary-number">7</div>
          <div className="summary-label">Projects Near Deadline</div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">

        {/* Projects */}
        <section className="dashboard-section projects-section">

          <div className="section-header">
            <div>
              <h2>Active Projects</h2>
              <p>Track your ongoing projects</p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/projects")}
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="project-list">

            {projects.map((project) => (
              <div className="project-row" key={project.name}>

                <div className="project-main">

                  <div className="project-icon">
                    <FolderKanban size={19} />
                  </div>

                  <div>
                    <h3>{project.name}</h3>

                    <div className="project-meta">
                      <span>
                        <Users size={13} />
                        {project.team} members
                      </span>

                      <span>
                        Deadline: {project.deadline}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="project-progress">

                  <div className="progress-info">
                    <span>Progress</span>
                    <strong>{project.progress}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                </div>

                <div className="project-status">
                  {project.status}
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* Activity */}
        <section className="dashboard-section activity-section">

          <div className="section-header">
            <div>
              <h2>Team Activity</h2>
              <p>Recent activity</p>
            </div>
          </div>

          <div className="activity-list">

            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div className="activity-item" key={index}>

                  <div className="activity-icon">
                    <Icon size={17} />
                  </div>

                  <div className="activity-content">
                    <div className="activity-title">
                      {activity.title}
                    </div>

                    <div className="activity-time">
                      {activity.time}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </section>

      </div>

      {/* Quick Action */}
      <section className="smart-action">

        <div className="smart-action-icon">
          ✨
        </div>

        <div className="smart-action-content">
          <h3>Let AI find the right team for your next project</h3>

          <p>
            Add your project requirements and Task Assignment AI will
            analyze skills, workload, experience, and criticality to
            recommend the best-fit team.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/projects/new")}
        >
          Start Assignment
          <ArrowRight size={17} />
        </button>

      </section>

    </div>
  );
}