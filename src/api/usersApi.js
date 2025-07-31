import axios from "axios";

export const usersApi = axios.create({
  baseURL: "http://localhost:8000/users",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getMeApi = (token) => usersApi.get("/getme", addToken(token));
export const getAllUsersApi = (token) => usersApi.get("/", addToken(token));
export const getUserApi = (id, token) =>
  usersApi.get(`/${id}`, addToken(token));
// export const updateUserApi = (id, body, token) =>
//   usersApi.patch(`/${id}`, body, addToken(token));
export const updateUserApi = (id, body, token) =>
  usersApi.patch(`/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteUserApi = (id, token) =>
  usersApi.delete(`/${id}`, addToken(token));
export const getUserBalanceApi = (id, token) =>
  usersApi.get(`/${id}/balance`, addToken(token));
export const postNewPassword = (body, token) =>
  usersApi.post(`/change-password`, body, addToken(token));