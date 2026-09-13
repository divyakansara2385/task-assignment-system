import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Flag,
  User,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Clock,
} from "lucide-react";

export default function TaskDetails() {
  const navigate = useNavigate();
  const [assigned, setAssigned] = useState(false);

  const task = {
    title: "Develop Authentication APIs",
    project: "Payment Gateway Integration",
    description:
      "Build secure authentication APIs including login, registration, token handling, and user authorization.",
    priority: "High",
    deadline: "Sep 25, 2026",
    status: "In Progress",
    requiredSkills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "JWT",
    ],
  };

  const recommendation = {
    name: "Sarah Johnson",
    initials: "SJ",
    role: "Backend Developer",
    match: 94,
    workload: 45,
    skillsMatched: 4,
    totalSkills: 5,
    reasons: [
      "Strong match with required backend skills",
      "Has experience with FastAPI and REST APIs",
      "Current workload allows additional assignments",
      "Strong performance score on similar projects",
    ],
  };

  const alternatives = [
    {
      name: "Michael Chen",
      initials: "MC",
      role: "Backend Developer",
      match: 88,
      workload: 60,
    },
    {
      name: "Jessica Brown",
      initials: "JB",
      role: "Full Stack Developer",
      match: 82,
      workload: 70,
    },
  ];

  return (
    <div className="task-details-page">

      {/* ================= BACK BUTTON ================= */}

      <button
        className="back-link"
        onClick={() => navigate("/tasks")}
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </button>

      {/* ================= HEADER ================= */}

      <div className="task-details-header">

        <div>
          <p className="eyebrow">TASK DETAILS</p>

          <h1>{task.title}</h1>

          <p>{task.description}</p>
        </div>

        <span className="task-details-status">
          {assigned ? "Assigned" : task.status}
        </span>

      </div>

      {/* ================= TASK INFORMATION ================= */}

      <div className="task-info-grid">

        <div className="task-info-card">

          <Briefcase size={18} />

          <div>
            <span>Project</span>
            <strong>{task.project}</strong>
          </div>

        </div>

        <div className="task-info-card">

          <Flag size={18} />

          <div>
            <span>Priority</span>
            <strong>{task.priority}</strong>
          </div>

        </div>

        <div className="task-info-card">

          <Calendar size={18} />

          <div>
            <span>Deadline</span>
            <strong>{task.deadline}</strong>
          </div>

        </div>

        <div className="task-info-card">

          <Clock size={18} />

          <div>
            <span>Status</span>
            <strong>{assigned ? "Assigned" : task.status}</strong>
          </div>

        </div>

      </div>

      {/* ================= MAIN LAYOUT ================= */}

      <div className="task-details-layout">

        {/* LEFT SIDE */}

        <div className="task-details-main">

          {/* Required Skills */}

          <section className="task-details-card">

            <div className="details-card-header">

              <div>
                <h2>Required Skills</h2>

                <p>
                  Skills needed to successfully complete this task
                </p>
              </div>

            </div>

            <div className="task-required-skills">

              {task.requiredSkills.map((skill) => (

                <span key={skill}>
                  {skill}
                </span>

              ))}

            </div>

          </section>

          {/* Current Assignment */}

          <section className="task-details-card">

            <div className="details-card-header">

              <div>
                <h2>Current Assignment</h2>

                <p>
                  Employee currently assigned to this task
                </p>
              </div>

            </div>

            <div className="current-assignment">

              <div className="current-assignee">

                <div className="current-assignee-avatar">
                  {recommendation.initials}
                </div>

                <div>
                  <h3>
                    {recommendation.name}
                  </h3>

                  <p>
                    {recommendation.role}
                  </p>
                </div>

              </div>

              <span className="assignment-active">
                {assigned
                  ? "Active Assignment"
                  : "Recommended"
                }
              </span>

            </div>

          </section>

        </div>

        {/* RIGHT SIDE - AI RECOMMENDATION */}

        <aside className="task-ai-sidebar">

          <div className="ai-task-recommendation">

            {/* AI Header */}

            <div className="ai-task-header">

              <div className="ai-task-icon">
                <Sparkles size={20} />
              </div>

              <div>

                <p>AI RECOMMENDATION</p>

                <h2>Best Assignment</h2>

              </div>

            </div>

            {/* Recommended Employee */}

            <div className="recommended-candidate">

              <div className="candidate-avatar">
                {recommendation.initials}
              </div>

              <div>

                <h3>
                  {recommendation.name}
                </h3>

                <p>
                  {recommendation.role}
                </p>

              </div>

              <div className="candidate-score">

                <strong>
                  {recommendation.match}%
                </strong>

                <span>Match</span>

              </div>

            </div>

            {/* Match Information */}

            <div className="candidate-match-info">

              <div>

                <span>Skill Match</span>

                <strong>
                  {recommendation.skillsMatched}/
                  {recommendation.totalSkills}
                </strong>

              </div>

              <div>

                <span>Current Workload</span>

                <strong>
                  {recommendation.workload}%
                </strong>

              </div>

            </div>

            {/* AI Reasons */}

            <div className="recommendation-reasons">

              <h3>
                Why AI recommends this employee
              </h3>

              {recommendation.reasons.map((reason) => (

                <div
                  className="recommendation-reason"
                  key={reason}
                >

                  <CheckCircle2 size={15} />

                  <span>
                    {reason}
                  </span>

                </div>

              ))}

            </div>

            {/* ASSIGN BUTTON */}

            <button
              className={`assign-ai-button ${
                assigned ? "assigned" : ""
              }`}
              onClick={() => setAssigned(true)}
              disabled={assigned}
            >

              {assigned ? (
                <>
                  <CheckCircle2 size={16} />
                  Employee Assigned Successfully
                </>
              ) : (
                <>
                  <User size={16} />
                  Assign Recommended Employee
                </>
              )}

            </button>

          </div>

        </aside>

      </div>

      {/* ================= ALTERNATIVE CANDIDATES ================= */}

      <section className="alternative-candidates">

        <div className="alternative-header">

          <div>

            <p className="eyebrow">
              OTHER OPTIONS
            </p>

            <h2>
              Alternative Candidates
            </h2>

          </div>

        </div>

        <div className="alternative-grid">

          {alternatives.map((candidate) => (

            <div
              className="alternative-card"
              key={candidate.name}
            >

              <div className="alternative-top">

                <div className="alternative-avatar">
                  {candidate.initials}
                </div>

                <div>

                  <h3>
                    {candidate.name}
                  </h3>

                  <p>
                    {candidate.role}
                  </p>

                </div>

              </div>

              <div className="alternative-info">

                <div>

                  <span>AI Match</span>

                  <strong>
                    {candidate.match}%
                  </strong>

                </div>

                <div>

                  <span>Workload</span>

                  <strong>
                    {candidate.workload}%
                  </strong>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/team/${candidate.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`
                  )
                }
              >
                View Profile
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}