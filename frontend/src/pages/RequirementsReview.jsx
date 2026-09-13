import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Sparkles,
  Trash2,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";

export default function RequirementsReview() {
  const navigate = useNavigate();
  const location = useLocation();

  // Project data received from Create Project page
  const project = location.state || {
    name: "Payment Gateway Integration",
    description:
      "Integrate a secure payment orchestration platform with multi-currency support, dynamic fraud evaluation, and automated reconciliation workflows.",
    teamSize: "4-6",
    deadline: "",
    priority: "medium",
  };

  const requiredSkills = [
    {
      name: "Python",
      level: "Advanced",
      category: "Core",
    },
    {
      name: "FastAPI",
      level: "Advanced",
      category: "Backend",
    },
    {
      name: "PostgreSQL",
      level: "Intermediate",
      category: "Database",
    },
    {
      name: "REST APIs",
      level: "Advanced",
      category: "Backend",
    },
    {
      name: "Docker",
      level: "Intermediate",
      category: "DevOps",
    },
  ];

  const suggestedRoles = [
    {
      title: "Backend Developer",
      description: "Core backend implementation",
      skills: ["Python", "FastAPI"],
    },
    {
      title: "Backend Developer",
      description: "API and database development",
      skills: ["PostgreSQL", "REST APIs"],
    },
    {
      title: "Integration Engineer",
      description: "Payment system integration",
      skills: ["APIs", "Docker"],
    },
  ];

  const technologies = [
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "REST APIs",
    "Python",
  ];

  const handleContinue = () => {
    navigate("/projects/recommendation", {
      state: {
        project,
        requiredSkills,
        suggestedRoles,
        technologies,
      },
    });
  };

  return (
    <div className="requirements-page">

      {/* Back */}
      <button
        className="back-link"
        onClick={() => navigate("/projects/new")}
      >
        <ArrowLeft size={16} />
        Back to Project Details
      </button>

      {/* Header */}
      <div className="requirements-heading">
        <div>
          <h1>Review Project Requirements</h1>

          <p>
            Our AI analyzed your project description and identified the
            skills, roles, and technologies needed for your team.
          </p>
        </div>

        <div className="ai-badge">
          <Sparkles size={14} />
          AI Analysis Complete
        </div>
      </div>

      {/* Steps */}
      <div className="project-steps requirements-steps">

        <div className="step completed">
          <div className="step-number">
            <Check size={14} />
          </div>

          <div>
            <strong>Project Details</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="step-line completed-line" />

        <div className="step active">
          <div className="step-number">2</div>

          <div>
            <strong>AI Review</strong>
            <span>Extract requirements</span>
          </div>
        </div>

        <div className="step-line" />

        <div className="step">
          <div className="step-number">3</div>

          <div>
            <strong>Team Match</strong>
            <span>AI recommendation</span>
          </div>
        </div>

      </div>

      {/* AI Analysis Message */}
      <div className="analysis-banner">

        <div className="analysis-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <h3>AI Analysis Complete</h3>

          <p>
            We've identified the key skills, roles, and technologies needed
            to build your project. Review and adjust them before continuing.
          </p>
        </div>

      </div>

      {/* Main Content */}
      <div className="requirements-layout">

        {/* LEFT */}
        <div className="requirements-main">

          {/* Required Skills */}
          <section className="requirements-card">

            <div className="requirements-card-header">
              <div>
                <h2>Required Skills</h2>

                <p>
                  Skills identified for this project
                </p>
              </div>

              <button className="add-button">
                <Plus size={14} />
                Add Skill
              </button>
            </div>

            <div className="skills-list">

              {requiredSkills.map((skill, index) => (
                <div
                  className="skill-review-row"
                  key={index}
                >

                  <div className="skill-review-icon">
                    <Sparkles size={15} />
                  </div>

                  <div className="skill-review-info">
                    <h3>{skill.name}</h3>

                    <span>
                      {skill.category}
                    </span>
                  </div>

                  <span
                    className={`skill-level ${
                      skill.level.toLowerCase()
                    }`}
                  >
                    {skill.level}
                  </span>

                  <button className="delete-skill">
                    <Trash2 size={15} />
                  </button>

                </div>
              ))}

            </div>

          </section>

          {/* Suggested Roles */}
          <section className="requirements-card">

            <div className="requirements-card-header">
              <div>
                <h2>Suggested Roles</h2>

                <p>
                  Recommended team structure based on your project
                </p>
              </div>

              <button className="add-button">
                <Plus size={14} />
                Add Role
              </button>
            </div>

            <div className="roles-grid">

              {suggestedRoles.map((role, index) => (
                <div
                  className="role-card"
                  key={index}
                >

                  <button className="role-remove">
                    <X size={13} />
                  </button>

                  <div className="role-icon">
                    👨‍💻
                  </div>

                  <h3>{role.title}</h3>

                  <p>{role.description}</p>

                  <div className="role-skills">

                    {role.skills.map((skill, i) => (
                      <span key={i}>
                        {skill}
                      </span>
                    ))}

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* Technologies */}
          <section className="requirements-card">

            <div className="requirements-card-header">
              <div>
                <h2>Tools & Technologies</h2>

                <p>
                  Technologies detected from your requirements
                </p>
              </div>

              <button className="add-button">
                <Plus size={14} />
                Add Tool
              </button>
            </div>

            <div className="technology-tags">

              {technologies.map((tech, index) => (
                <span
                  className="technology-tag"
                  key={index}
                >
                  {tech}

                  <X size={12} />
                </span>
              ))}

            </div>

          </section>

          {/* Review Note */}
          <div className="review-note">

            <Sparkles size={16} />

            <p>
              Review and adjust the requirements before continuing.
              Changes will be used to find the best team match.
            </p>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="project-summary-card">

          <div className="summary-card-heading">
            <h2>Project Summary</h2>
          </div>

          <div className="summary-project-name">
            {project.name}
          </div>

          <p className="summary-description">
            {project.description}
          </p>

          <div className="summary-details">

            <div className="summary-detail">
              <span>Team Size</span>

              <strong>
                {project.teamSize || "4-6"} people
              </strong>
            </div>

            <div className="summary-detail">
              <span>Priority</span>

              <strong className="priority-medium">
                {project.priority || "Medium"}
              </strong>
            </div>

          </div>

          <div className="summary-status">

            <div className="status-dot" />

            <div>
              <strong>AI Analysis Complete</strong>

              <span>
                Requirements successfully extracted
              </span>
            </div>

          </div>

        </aside>

      </div>

      {/* Bottom Actions */}
      <div className="requirements-actions">

        <button
          className="cancel-button"
          onClick={() => navigate("/projects/new")}
        >
          Back to Project Details
        </button>

        <div className="requirements-action-right">

          <span className="save-text">
            Changes saved automatically
          </span>

          <button
            className="continue-button"
            onClick={handleContinue}
          >
            Continue to Team Match
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}