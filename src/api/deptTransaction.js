import axios from "axios";

const debtTransactionApi = axios.create({
  baseURL: "http://localhost:8000/debts",
});

debtTransactionApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create transaction
// export const createDebtTransactionApi = (body) =>
//   debtTransactionApi.post("/", body);

// Get transaction by ID
export const getDebtTransactionByIdApi = (groupId) =>
  debtTransactionApi.get(`/groups/${groupId}/debt-summary`);

// Get all transactions for a user
export const getUserDebtTransactionsApi = (groupId) =>
  debtTransactionApi.get(`/groups/${groupId}/transactions`);

// Confirm a transaction
export const confirmDebtTransactionApi = (transactionId) =>
  debtTransactionApi.patch(`/${transactionId}/confirm`);

// Upload slip to a transaction
export const uploadSlipApi = (transactionId, file) => {
  const formData = new FormData();
  formData.append("slip", file);

  return debtTransactionApi.patch(
    `/transactions/${transactionId}/upload-slip`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
