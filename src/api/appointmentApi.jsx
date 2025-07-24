import axios from "axios";

export const appointmentsApi = axios.create({
  baseURL: "http://localhost:8000/appointments",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const createAppointmentApi = (token) => appointmentsApi.post("/", addToken(token));
export const inviteAppointmentApi = (token) => appointmentsApi.post("/", addToken(token));

export const getAppointmentApi = (token) => appointmentsApi.get(`/${id}`, addToken(token));
export const getAllAppointmentApi = (appointId, token) => appointmentsApi.get(`/${appointId}/balance`, addToken(token));

export const updateAppointmentApi = (appointId, body, token) => appointmentsApi.patch(`/${appointId}`, body, addToken(token));

export const deleteAppointmentApi = (appointId, token) => appointmentsApi.delete(`/${appointId}`, addToken(token));