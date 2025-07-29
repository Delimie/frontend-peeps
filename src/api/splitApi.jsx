import axios from "axios";

const splitsApi = axios.create({
  baseURL: "http://localhost:8000/expenses"
});

splitsApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// List 
export const listExpenseSplits = (expenseId) =>
  splitsApi.get(`/${expenseId}/splits`);
// Create 
export const createExpenseSplits = (expenseId, body) =>
  splitsApi.post(`/${expenseId}/splits`, body);
// Update
export const updateExpenseSplit = (expenseId, splitId, body) =>
  splitsApi.patch(`/${expenseId}/splits/${splitId}`, body);
// Delete 
export const removeExpenseSplit = (expenseId, splitId) =>
  splitsApi.delete(`/${expenseId}/splits/${splitId}`);
