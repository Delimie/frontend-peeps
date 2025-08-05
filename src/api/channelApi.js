import axios from "axios";

const channelApi = axios.create({
  baseURL: "http://localhost:8000/channels",
});

// แนบ token จาก localStorage
channelApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config; 
});


export const createChannelApi = (body) => channelApi.post("/", body);
export const getChannelByGroupIdApi = (groupId) => channelApi.get(`/${groupId}`);
export const updateChannelApi = (channelId, body) => channelApi.patch(`/${channelId}`, body);
export const deleteChannelApi = (id) => channelApi.delete(`/${id}`);

export const getMyChannelAPI = () => channelApi.get("/my");