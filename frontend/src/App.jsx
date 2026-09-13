import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";
import EmployeeDetails from "./pages/EmployeeDetails";

import CreateProject from "./pages/CreateProject";
import RequirementsReview from "./pages/RequirementsReview";
import TeamRecommendation from "./pages/TeamRecommendation";
import ProjectDetails from "./pages/ProjectDetails";

import TaskManagement from "./pages/TaskManagement";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
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
    </BrowserRouter>
  );
}

export default App;