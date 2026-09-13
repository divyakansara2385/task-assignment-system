import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Team",
      path: "/team",
      icon: Users,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <div className="logo-title">Task Assignment AI</div>
          <div className="logo-subtitle">Intelligent Team Allocation</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="sidebar-link">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <div className="profile">
          <div className="profile-avatar">PM</div>

          <div className="profile-info">
            <div className="profile-name">Project Manager</div>
            <div className="profile-role">Administrator</div>
          </div>

          <button
            className="logout-button"
            onClick={() => navigate("/login")}
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}