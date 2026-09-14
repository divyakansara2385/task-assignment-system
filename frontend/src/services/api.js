const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function apiRequest(path, options = {}) {
	const token = localStorage.getItem("access_token");

	const response = await fetch(`${API_URL}${path}`, {
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		if (response.status === 401) {
			localStorage.removeItem("access_token");
		}

		throw new Error(`API request failed: ${response.status}`);
	}

	return response.json();
}

export function getDashboardSummary() {
	return apiRequest("/dashboard/summary");
}

export function getEmployees() {
	return apiRequest("/employees/");
}

export function getEmployee(employeeId) {
	return apiRequest(`/employees/${employeeId}`);
}

export function getProjects() {
	return apiRequest("/projects/");
}

export function createProject(project) {
	return apiRequest("/projects/", {
		method: "POST",
		body: JSON.stringify(project),
	});
}

export function getTasks() {
	return apiRequest("/tasks/");
}

export function getTask(taskId) {
	return apiRequest(`/tasks/${taskId}`);
}

export function createTask(task) {
	return apiRequest("/tasks/", {
		method: "POST",
		body: JSON.stringify(task),
	});
}

export function login(username, password) {
	return apiRequest("/auth/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
}

export function register(username, email, password, role = "EMPLOYEE") {
	return apiRequest("/auth/register", {
		method: "POST",
		body: JSON.stringify({ username, email, password, role }),
	});
}

export function getProject(projectId) {
	return apiRequest(`/projects/${projectId}`);
}

export function getAssignmentRecommendations(taskId) {
	return apiRequest(`/assignments/task/${taskId}/recommend`);
}

export function getAssignments() {
	return apiRequest("/assignments");
}

export function getAssignmentHistory(assignmentId) {
	return apiRequest(`/assignments/${assignmentId}/history`);
}

export function createAssignment(taskId, employeeId) {
	return apiRequest("/assignments", {
		method: "POST",
		body: JSON.stringify({ task_id: taskId, employee_id: employeeId }),
	});
}

export function getTaskAssignments(taskId) {
	return apiRequest(`/assignments/task/${taskId}`);
}
