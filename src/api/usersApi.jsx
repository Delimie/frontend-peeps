import axios from "axios";

export const usersApi = axios.create({
  baseURL: "http://localhost:8000/users",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getUserApi = (token) => usersApi.post("/", addToken(token));
export const updateUserApi = (body , token) => usersApi.post("/", body);
