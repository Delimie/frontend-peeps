import axios from "axios";

export const usersApi = axios.create({
  baseURL: "http://localhost:8000/users",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getAllUsersApi = (token) => usersApi.get("/", addToken(token));
export const getUserApi = (id) => usersApi.get(`/${id}`);
export const updateUserApi = (id, body, token) => usersApi.patch(`/${id}`, body, addToken(token));
export const deleteUserApi = (id, token) => usersApi.delete(`/${id}`, addToken(token));
export const getUserBalanceApi = (id, token) => usersApi.get(`/${id}/balance`, addToken(token));