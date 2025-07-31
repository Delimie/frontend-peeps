import axios from "axios";

const debtTransactionApi = axios.create({
  baseURL: "http://localhost:8000/debt-transaction",
});

debtTransactionApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create transaction
export const createDebtTransactionApi = (body) =>
  debtTransactionApi.post("/", body);

// Get transaction by ID
export const getDebtTransactionByIdApi = (id) =>
  debtTransactionApi.get(`/${id}`);

// Get all transactions for a user
export const getUserDebtTransactionsApi = (userId) =>
  debtTransactionApi.get(`/user/${userId}`);

// Confirm a transaction
export const confirmDebtTransactionApi = (transactionId) =>
  debtTransactionApi.patch(`/${transactionId}/confirm`);
