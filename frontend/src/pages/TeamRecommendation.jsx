import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function TeamRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state || {};
  const taskId = data.task_id || "TSK000001";

  const project = data.project || {
    name: "Payment Gateway Integration",
    teamSize: "4-6",
    priority: "medium",
  };

  const requiredSkills = data.requiredSkills || [
    { name: "Python", level: "Advanced" },
    { name: "FastAPI", level: "Advanced" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "REST APIs", level: "Advanced" },
  ];

  const fallbackTeam = [
    {
      name: "Sarah Johnson",
      role: "Backend Developer",
      match: 96,
      availability: "Available",
      experience: "5 years",
      skills: ["Python", "FastAPI", "PostgreSQL"],
      reason:
        "Strong backend experience with excellent skill alignment for the project requirements.",
    },
    {
      name: "Michael Chen",
      role: "Backend Developer",
      match: 92,
      availability: "Available",
      experience: "4 years",
      skills: ["Python", "REST APIs", "Docker"],
      reason:
        "Excellent API development experience and strong knowledge of scalable backend systems.",
    },
    {
      name: "Emily Davis",
      role: "Integration Engineer",
      match: 89,
      availability: "Available Soon",
      experience: "4 years",
      skills: ["REST APIs", "Docker", "PostgreSQL"],
      reason:
        "Strong experience integrating external services and managing complex system workflows.",
    },
  ];

  const fallbackAlternatives = [
    {
      name: "David Wilson",
      role: "Backend Developer",
      match: 84,
    },
    {
      name: "Jessica Brown",
      role: "Integration Engineer",
      match: 81,
    },
  ];

  const [recommendedTeam, setRecommendedTeam] = useState(fallbackTeam);

  useEffect(() => {
    let cancelled = false;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    fetch(`${apiUrl}/recommendations/${taskId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Recommendation request failed");
        }

        return response.json();
      })
      .then((result) => {
        if (cancelled || !result.recommendations?.length) {
          return;
        }

        setRecommendedTeam(
          result.recommendations.map((member) => ({
            name: member.employee_name || `Employee ${member.employee_id}`,
            role: "Recommended team member",
            match: member.match_score,
            availability: `${member.availability_score}% available`,
            experience: `${member.experience_match}% experience match`,
            skills: [`${member.skill_match}% skill match`],
            reason: member.reason,
          }))
        );
      })
      .catch(() => {
        // Keep the local preview when the API is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const alternatives = fallbackAlternatives;

  const handleApprove = () => {
  navigate("/projects/details", {
    state: {
      project,
    },
  });
};

  return (
    <div className="team-recommendation-page">

      {/* Back Button */}
      <button
        className="back-link"
        onClick={() => navigate("/projects/requirements")}
      >
        <ArrowLeft size={16} />
        Back to Requirements Review
      </button>

      {/* Header */}
      <div className="team-match-heading">

        <div>
          <p className="eyebrow">
            AI TEAM RECOMMENDATION
          </p>

          <h1>Recommended Team</h1>

          <p>
            Our AI analyzed the project requirements and found the best
            available team members for your project.
          </p>
        </div>

        <div className="recommendation-badge">
          <Sparkles size={15} />
          AI Recommendation Ready
        </div>

      </div>

      {/* Steps */}

      <div className="project-steps team-steps">

        <div className="step completed">
          <div className="step-number">
            <CheckCircle2 size={14} />
          </div>

          <div>
            <strong>Project Details</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="step-line completed-line" />

        <div className="step completed">
          <div className="step-number">
            <CheckCircle2 size={14} />
          </div>

          <div>
            <strong>AI Review</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="step-line completed-line" />

        <div className="step active">
          <div className="step-number">
            3
          </div>

          <div>
            <strong>Team Match</strong>
            <span>AI recommendation</span>
          </div>
        </div>

      </div>

      {/* AI Match Summary */}

      <div className="match-summary">

        <div className="match-score-box">

          <div className="match-score">
            92%
          </div>

          <div>
            <h3>Overall Team Match</h3>

            <p>
              Excellent skill and availability alignment
            </p>
          </div>

        </div>

        <div className="match-summary-info">

          <div>
            <Users size={18} />

            <span>Team Members</span>

            <strong>
              {recommendedTeam.length}
            </strong>
          </div>

          <div>
            <CheckCircle2 size={18} />

            <span>Skills Covered</span>

            <strong>
              {requiredSkills.length}
            </strong>
          </div>

          <div>
            <Clock size={18} />

            <span>Availability</span>

            <strong>High</strong>
          </div>

        </div>

      </div>

      {/* Layout */}

      <div className="team-recommendation-layout">

        {/* LEFT */}

        <div className="recommended-team-section">

          <div className="team-section-header">

            <div>
              <h2>Recommended Team Members</h2>

              <p>
                Ranked by AI compatibility score
              </p>
            </div>

            <span className="team-count">
              {recommendedTeam.length} Recommended
            </span>

          </div>

          <div className="recommended-members">

            {recommendedTeam.map((member, index) => (

              <div
                className="team-member-card"
                key={index}
              >

                {/* Top */}

                <div className="member-card-top">

                  <div className="member-profile">

                    <div className="member-avatar">
                      {member.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div>
                      <h3>{member.name}</h3>

                      <p>{member.role}</p>
                    </div>

                  </div>

                  <div className="member-match">

                    <span>AI Match</span>

                    <strong>
                      {member.match}%
                    </strong>

                  </div>

                </div>

                {/* Details */}

                <div className="member-details">

                  <div>

                    <Clock size={14} />

                    <span>
                      {member.availability}
                    </span>

                  </div>

                  <div>

                    <Briefcase size={14} />

                    <span>
                      {member.experience}
                    </span>

                  </div>

                </div>

                {/* Skills */}

                <div className="member-skills">

                  {member.skills.map((skill, skillIndex) => (

                    <span
                      key={skillIndex}
                    >
                      {skill}
                    </span>

                  ))}

                </div>

                {/* AI Reason */}

                <div className="ai-reason">

                  <Sparkles size={14} />

                  <div>

                    <strong>
                      Why AI selected this member
                    </strong>

                    <p>
                      {member.reason}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <aside className="team-sidebar">

          {/* Project */}

          <div className="team-sidebar-card">

            <h2>Project</h2>

            <h3>
              {project.name}
            </h3>

            <div className="team-project-info">

              <div>

                <span>
                  Team Size
                </span>

                <strong>
                  {project.teamSize}
                </strong>

              </div>

              <div>

                <span>
                  Priority
                </span>

                <strong className="priority-medium">
                  {project.priority}
                </strong>

              </div>

            </div>

          </div>

          {/* Required Skills */}

          <div className="team-sidebar-card">

            <h2>Required Skills</h2>

            <div className="required-skills-list">

              {requiredSkills.map((skill, index) => (

                <div
                  className="required-skill-item"
                  key={index}
                >

                  <CheckCircle2 size={14} />

                  <span>
                    {skill.name}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Alternatives */}

          <div className="team-sidebar-card">

            <h2>Alternative Candidates</h2>

            <p className="alternative-subtitle">
              Other strong matches
            </p>

            <div className="alternative-list">

              {alternatives.map((member, index) => (

                <div
                  className="alternative-member"
                  key={index}
                >

                  <div className="alternative-avatar">

                    {member.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}

                  </div>

                  <div className="alternative-info">

                    <strong>
                      {member.name}
                    </strong>

                    <span>
                      {member.role}
                    </span>

                  </div>

                  <div className="alternative-match">

                    {member.match}%

                  </div>

                </div>

              ))}

            </div>

          </div>

        </aside>

      </div>

      {/* Bottom Actions */}

      <div className="team-actions">

        <button
          className="cancel-button"
          onClick={() => navigate("/projects/requirements")}
        >
          Back
        </button>

        <button
          className="approve-team-button"
          onClick={handleApprove}
        >
          Approve Recommended Team
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}