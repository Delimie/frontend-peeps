import axios from "axios";

const expensesApi = axios.create({
  baseURL: "http://localhost:8000/expenses",
});

expensesApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create new expense
export const createExpenseApi = (body) =>
  expensesApi.post("/", body);

// Get one expense by ID
export const getExpenseByIdApi = (expenseId) =>
  expensesApi.get(`/${expenseId}`);

// Update an expense
export const updateExpenseApi = (expenseId, body) =>
  expensesApi.patch(`/${expenseId}`, body);

// Delete an expense
export const deleteExpenseApi = (expenseId) =>
  expensesApi.delete(`/${expenseId}`);

// Get all expenses for a group
export const getExpensesByGroupIdApi = (groupId) =>
  expensesApi.get(`/groups/${groupId}/expenses`);
