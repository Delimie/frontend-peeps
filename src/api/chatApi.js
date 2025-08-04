import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://localhost:8000/chats",
});

// แนบ token จาก localStorage
chatApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config; 
});

export const getChatByChannelIdApi = (channelId) => chatApi.get(`/${channelId}`);