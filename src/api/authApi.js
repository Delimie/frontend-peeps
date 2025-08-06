import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8000/auth",
});

export const registerApi = (body) => authApi.post("/register", body);
export const loginApi = (body) => authApi.post("/login", body);
export const googleLoginApi = (idToken) => authApi.post("/google-login", { idToken });
