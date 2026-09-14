import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";
import EmployeeDetails from "./pages/EmployeeDetails";

import CreateProject from "./pages/CreateProject";
import RequirementsReview from "./pages/RequirementsReview";
import TeamRecommendation from "./pages/TeamRecommendation";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";

import TaskManagement from "./pages/TaskManagement";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (location.pathname === "/login") {
    return children;
  }

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ================= TEAM ================= */}

        <Route
          path="/team"
          element={<TeamManagement />}
        />

        <Route
          path="/team/:id"
          element={<EmployeeDetails />}
        />

        {/* ================= PROJECTS ================= */}

        <Route
          path="/projects/new"
          element={<CreateProject />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/requirements"
          element={<RequirementsReview />}
        />

        <Route
          path="/projects/recommendation"
          element={<TeamRecommendation />}
        />

        <Route
          path="/projects/details"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        {/* ================= TASKS ================= */}

        <Route
          path="/tasks"
          element={<TaskManagement />}
        />
        <Route
          path="/tasks/new"
          element={<CreateTask />}
        />
        <Route
          path="/tasks/:id"
          element={<TaskDetails />}
        />

        </Routes>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;