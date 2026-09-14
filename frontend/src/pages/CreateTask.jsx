import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Clock3,
  Flag,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { createTask, getProjects } from "../services/api";

export default function CreateTask() {
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState("");
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");
  const [criticality, setCriticality] = useState("Medium");

  const [deadline, setDeadline] = useState("");
  const [effort, setEffort] = useState("");

  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState([
    "Python",
    "FastAPI",
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setError("");

    try {
      const task = await createTask({
        project_id: project,
        task_title: taskTitle,
        task_description: description,
        project_criticality: criticality,
        priority: priority.toLowerCase(),
        estimated_hours: effort ? Number(effort) : undefined,
        task_due_date: deadline || undefined,
      });
      navigate(`/tasks/${task.task_id}`);
    } catch {
      setError("Task could not be created. Select a valid project and try again.");
      setSubmitted(false);
    }
  };

  return (
    <div className="create-task-page">

      {/* ================= BACK ================= */}

      <button
        className="create-task-back"
        onClick={() => navigate("/tasks")}
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </button>

      {/* ================= HEADER ================= */}

      <div className="create-task-header">

        <div>
          <p className="eyebrow">
            TASK MANAGEMENT
          </p>

          <h1>Create New Task</h1>

          <p>
            Define the task requirements and let AI find
            the most suitable employee.
          </p>
        </div>

      </div>

      {/* ================= FORM ================= */}

      <form
        className="create-task-form"
        onSubmit={handleSubmit}
      >

        {/* ================= BASIC INFORMATION ================= */}

        <section className="create-task-card">

          {error && <p className="form-error">{error}</p>}

          <div className="create-task-card-header">

            <div className="create-task-section-icon">
              <Briefcase size={17} />
            </div>

            <div>
              <h2>Task Information</h2>

              <p>
                Provide the basic details about the task.
              </p>
            </div>

          </div>

          <div className="create-task-fields">

            {/* Task Name */}

            <div className="create-task-field full">

              <label htmlFor="taskTitle">
                Task Name
                <span>*</span>
              </label>

              <input
                id="taskTitle"
                type="text"
                placeholder="e.g. Develop Authentication APIs"
                value={taskTitle}
                onChange={(event) =>
                  setTaskTitle(event.target.value)
                }
                required
              />

            </div>

            {/* Project */}

            <div className="create-task-field">

              <label htmlFor="project">
                Project
                <span>*</span>
              </label>

              <select
                id="project"
                value={project}
                onChange={(event) =>
                  setProject(event.target.value)
                }
                required
              >
                <option value="">
                  Select project
                </option>

                {projects.map((item) => (
                  <option key={item.project_id} value={item.project_id}>
                    {item.project_domain || item.project_id}
                  </option>
                ))}

              </select>

            </div>

            {/* Estimated Effort */}

            <div className="create-task-field">

              <label htmlFor="effort">
                Estimated Effort
              </label>

              <div className="input-with-icon">

                <Clock3 size={16} />

                <input
                  id="effort"
                  type="number"
                  min="1"
                  placeholder="e.g. 5"
                  value={effort}
                  onChange={(event) =>
                    setEffort(event.target.value)
                  }
                />

                <span>days</span>

              </div>

            </div>

            {/* Description */}

            <div className="create-task-field full">

              <label htmlFor="description">
                Description
                <span>*</span>
              </label>

              <textarea
                id="description"
                rows="5"
                placeholder="Describe what needs to be completed, expected outcome, and any important requirements..."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                required
              />

            </div>

          </div>

        </section>

        {/* ================= REQUIREMENTS ================= */}

        <section className="create-task-card">

          <div className="create-task-card-header">

            <div className="create-task-section-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <h2>Assignment Requirements</h2>

              <p>
                These requirements will be used by the AI
                recommendation engine.
              </p>
            </div>

          </div>

          <div className="create-task-fields">

            {/* Required Skills */}

            <div className="create-task-field full">

              <label>
                Required Skills
                <span>*</span>
              </label>

              <div className="skill-input-wrapper">

                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  value={skillInput}
                  onChange={(event) =>
                    setSkillInput(event.target.value)
                  }
                  onKeyDown={handleSkillKeyDown}
                />

                <button
                  type="button"
                  onClick={addSkill}
                >
                  <Plus size={15} />
                  Add
                </button>

              </div>

              <div className="selected-skills">

                {skills.map((skill) => (

                  <span
                    className="selected-skill"
                    key={skill}
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill)
                      }
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>
                  </span>

                ))}

              </div>

            </div>

            {/* Priority */}

            <div className="create-task-field">

              <label htmlFor="priority">
                Priority
                <span>*</span>
              </label>

              <div className="select-with-icon">

                <Flag size={15} />

                <select
                  id="priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value)
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

              </div>

            </div>

            {/* Deadline */}

            <div className="create-task-field">

              <label htmlFor="deadline">
                Deadline
                <span>*</span>
              </label>

              <div className="input-with-icon">

                <Calendar size={16} />

                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(event) =>
                    setDeadline(event.target.value)
                  }
                  required
                />

              </div>

            </div>

          </div>

        </section>

        {/* ================= CRITICALITY ================= */}

        <section className="create-task-card">

          <div className="create-task-card-header">

            <div className="create-task-section-icon">
              <Flag size={17} />
            </div>

            <div>
              <h2>Task Criticality</h2>

              <p>
                Criticality influences how the AI balances
                skill fit, availability, workload, and priority.
              </p>
            </div>

          </div>

          <div className="criticality-options">

            {/* LOW */}

            <label
              className={`criticality-option low ${
                criticality === "Low"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="criticality"
                value="Low"
                checked={criticality === "Low"}
                onChange={(event) =>
                  setCriticality(event.target.value)
                }
              />

              <div className="criticality-radio">
                <div />
              </div>

              <div>

                <strong>Low</strong>

                <p>
                  Availability matters more and
                  capability fit is emphasized.
                </p>

              </div>

            </label>

            {/* MEDIUM */}

            <label
              className={`criticality-option medium ${
                criticality === "Medium"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="criticality"
                value="Medium"
                checked={criticality === "Medium"}
                onChange={(event) =>
                  setCriticality(event.target.value)
                }
              />

              <div className="criticality-radio">
                <div />
              </div>

              <div>

                <strong>Medium</strong>

                <p>
                  Balanced consideration of skills,
                  availability, and workload.
                </p>

              </div>

            </label>

            {/* HIGH */}

            <label
              className={`criticality-option high ${
                criticality === "High"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="criticality"
                value="High"
                checked={criticality === "High"}
                onChange={(event) =>
                  setCriticality(event.target.value)
                }
              />

              <div className="criticality-radio">
                <div />
              </div>

              <div>

                <strong>High</strong>

                <p>
                  Skill match and similar past work
                  dominate the recommendation.
                </p>

              </div>

            </label>

          </div>

        </section>

        {/* ================= AI NOTICE ================= */}

        <div className="create-task-ai-notice">

          <div className="create-task-ai-icon">
            <Sparkles size={19} />
          </div>

          <div>

            <strong>
              AI-powered assignment
            </strong>

            <p>
              After creating this task, the system will
              analyze employee skills, workload,
              availability, past projects, performance,
              and task criticality.
            </p>

          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="create-task-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button create-task-submit"
            disabled={submitted}
          >

            {submitted ? (
              <>
                <CheckCircle2 size={16} />
                Creating Task...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Get AI Recommendation
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}