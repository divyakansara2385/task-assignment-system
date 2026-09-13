import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export default function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamSize: "",
    deadline: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we pass the project data to the next screen.
    // Later we will replace this with the real backend API call.
    navigate("/projects/requirements", {
      state: formData,
    });
  };

  return (
    <div className="create-project-page">

      {/* Back */}
      <button
        className="back-link"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="page-heading">
        <h1>Create New Project</h1>
        <p>
          Tell us about your project and we'll help you find the right team.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="project-steps">

        <div className="step active">
          <div className="step-number">1</div>

          <div>
            <strong>Project Details</strong>
            <span>Set up your project</span>
          </div>
        </div>

        <div className="step-line" />

        <div className="step">
          <div className="step-number">2</div>

          <div>
            <strong>AI Review</strong>
            <span>Extract skills</span>
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

      {/* Form */}
      <form
        className="project-form-card"
        onSubmit={handleSubmit}
      >

        <div className="form-section-heading">
          <h2>Project Details</h2>

          <p>
            Provide basic information about your project to get started.
          </p>
        </div>

        {/* Project Name */}
        <div className="form-group">
          <label>
            Project Name <span>*</span>
          </label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Payment Gateway Integration"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <div className="label-row">
            <label>
              Project Description <span>*</span>
            </label>

            <span className="character-hint">
              Describe your project goals and requirements
            </span>
          </div>

          <textarea
            name="description"
            placeholder="Describe the project, technologies, goals, and expected outcome..."
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Team Size + Deadline */}
        <div className="form-row">

          <div className="form-group">
            <label>
              Team Size <span>*</span>
            </label>

            <div className="select-wrapper">
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select team size
                </option>

                <option value="2-3">
                  2-3 people
                </option>

                <option value="4-6">
                  4-6 people
                </option>

                <option value="7-10">
                  7-10 people
                </option>

                <option value="10+">
                  10+ people
                </option>
              </select>

              <ChevronDown
                size={17}
                className="select-icon"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Deadline <span>*</span>
            </label>

            <div className="date-wrapper">
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />

              <Calendar
                size={17}
                className="date-icon"
              />
            </div>
          </div>

        </div>

        {/* Priority */}
        <div className="form-group">
          <label>
            Project Priority <span>*</span>
          </label>

          <div className="priority-options">

            <button
              type="button"
              className={`priority-card ${
                formData.priority === "low" ? "selected" : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  priority: "low",
                })
              }
            >
              <span className="priority-title">
                Low
              </span>

              <span className="priority-text">
                Flexible timeline and requirements
              </span>
            </button>

            <button
              type="button"
              className={`priority-card ${
                formData.priority === "medium"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  priority: "medium",
                })
              }
            >
              <span className="priority-title">
                Medium
              </span>

              <span className="priority-text">
                Standard project with moderate urgency
              </span>
            </button>

            <button
              type="button"
              className={`priority-card ${
                formData.priority === "high" ? "selected" : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  priority: "high",
                })
              }
            >
              <span className="priority-title">
                High
              </span>

              <span className="priority-text">
                Urgent project requiring faster delivery
              </span>
            </button>

          </div>
        </div>

        {/* AI Information */}
        <div className="ai-info-box">

          <div className="ai-info-icon">
            <Sparkles size={19} />
          </div>

          <div>
            <h3>What happens next?</h3>

            <p>
              Our AI will analyze your project description and identify
              the skills, roles, and requirements needed for your team.
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="continue-button"
          >
            Continue →
          </button>

        </div>

      </form>

    </div>
  );
}