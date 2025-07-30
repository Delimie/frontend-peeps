import axios from "axios";

const groupApi = axios.create({
  baseURL: "http://localhost:8000/groups",
});

// แนบ token จาก localStorage
groupApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const createGroupApi = (body) => groupApi.post("/", body);
export const getGroupByIdApi = (id) => groupApi.get(`/${id}`);
export const updateGroupApi = (id, body) => groupApi.patch(`/${id}`, body);
export const deleteGroupApi = (id) => groupApi.delete(`/${id}`);

export const addUserToGroupApi = (groupId, body) =>
  groupApi.post(`/${groupId}/users`, body);

export const removeUserFromGroupApi = (groupId, userId) =>
  groupApi.delete(`/${groupId}/users/${userId}`);

export const getUsersInGroupApi = (groupId) =>
  groupApi.get(`/${groupId}/users`);

export const getGroupSummaryApi = (groupId) =>
  groupApi.get(`/${groupId}/summary`);
