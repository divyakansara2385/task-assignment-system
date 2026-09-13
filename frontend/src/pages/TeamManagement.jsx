import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  Filter,
} from "lucide-react";

export default function TeamManagement() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const employees = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      initials: "SJ",
      role: "Backend Developer",
      availability: "Available",
      workload: 45,
      projects: 2,
      skills: ["Python", "FastAPI", "PostgreSQL"],
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      initials: "MC",
      role: "Backend Developer",
      availability: "Available",
      workload: 60,
      projects: 3,
      skills: ["Python", "REST APIs", "Docker"],
    },
    {
      id: "emily-davis",
      name: "Emily Davis",
      initials: "ED",
      role: "Integration Engineer",
      availability: "Busy",
      workload: 85,
      projects: 4,
      skills: ["REST APIs", "Docker", "PostgreSQL"],
    },
    {
      id: "david-wilson",
      name: "David Wilson",
      initials: "DW",
      role: "Frontend Developer",
      availability: "Available",
      workload: 35,
      projects: 1,
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: "jessica-brown",
      name: "Jessica Brown",
      initials: "JB",
      role: "Full Stack Developer",
      availability: "Partially Available",
      workload: 70,
      projects: 3,
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "alex-martinez",
      name: "Alex Martinez",
      initials: "AM",
      role: "Data Engineer",
      availability: "Available",
      workload: 40,
      projects: 2,
      skills: ["Python", "SQL", "Pandas"],
    },
  ];

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(searchText) ||
      employee.role.toLowerCase().includes(searchText) ||
      employee.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      )
    );
  });

  const availableEmployees = employees.filter(
    (employee) => employee.availability === "Available"
  ).length;

  const averageWorkload = Math.round(
    employees.reduce(
      (total, employee) => total + employee.workload,
      0
    ) / employees.length
  );

  const totalProjects = employees.reduce(
    (total, employee) => total + employee.projects,
    0
  );

  return (
    <div className="team-management-page">

      {/* ================= HEADER ================= */}

      <div className="team-management-header">

        <div>
          <p className="eyebrow">TEAM MANAGEMENT</p>

          <h1>Team Members</h1>

          <p>
            View employee skills, availability, workload,
            and current project assignments.
          </p>
        </div>

        <button className="primary-button">
          <Users size={16} />
          Add Team Member
        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="team-management-stats">

        <div className="team-stat-card">

          <Users size={19} />

          <div>
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
          </div>

        </div>

        <div className="team-stat-card">

          <CheckCircle2 size={19} />

          <div>
            <span>Available</span>
            <strong>{availableEmployees}</strong>
          </div>

        </div>

        <div className="team-stat-card">

          <Clock size={19} />

          <div>
            <span>Average Workload</span>
            <strong>{averageWorkload}%</strong>
          </div>

        </div>

        <div className="team-stat-card">

          <Briefcase size={19} />

          <div>
            <span>Active Projects</span>
            <strong>{totalProjects}</strong>
          </div>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="team-management-controls">

        <div className="employee-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search employees, roles, or skills..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <button className="team-filter-button">
          <Filter size={16} />
          Filter
        </button>

      </div>

      {/* ================= EMPLOYEE TABLE ================= */}

      <div className="employee-table-card">

        {/* Table Header */}

        <div className="employee-table-header">

          <span>Employee</span>
          <span>Skills</span>
          <span>Availability</span>
          <span>Workload</span>
          <span>Projects</span>

        </div>

        {/* Employee List */}

        <div className="employee-table-body">

          {filteredEmployees.length > 0 ? (

            filteredEmployees.map((employee) => (

              <div
                className="employee-row clickable-row"
                key={employee.id}
                onClick={() =>
                  navigate(`/team/${employee.id}`)
                }
              >

                {/* Employee Profile */}

                <div className="employee-profile">

                  <div className="employee-avatar">
                    {employee.initials}
                  </div>

                  <div>

                    <h3>{employee.name}</h3>

                    <p>{employee.role}</p>

                  </div>

                </div>

                {/* Skills */}

                <div className="employee-skills">

                  {employee.skills.map((skill) => (

                    <span key={skill}>
                      {skill}
                    </span>

                  ))}

                </div>

                {/* Availability */}

                <div>

                  <span
                    className={`availability-badge ${employee.availability
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {employee.availability}
                  </span>

                </div>

                {/* Workload */}

                <div className="workload-column">

                  <strong>
                    {employee.workload}%
                  </strong>

                  <div className="workload-bar">

                    <div
                      className="workload-fill"
                      style={{
                        width: `${employee.workload}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Projects */}

                <div className="project-count">
                  {employee.projects}
                </div>

              </div>

            ))

          ) : (

            <div className="no-employees-found">

              <Users size={28} />

              <h3>No employees found</h3>

              <p>
                Try searching with a different name,
                role, or skill.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}