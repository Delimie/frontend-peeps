import axios from "axios";

export const appointmentsApi = axios.create({
  baseURL: "http://localhost:8000/appointments",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// Create a new appointment
export const createAppointmentApi = (body, token) =>
  appointmentsApi.post("/", body, addToken(token));

// Invite to an appointment (assumed to be same as create for now)
export const inviteAppointmentApi = (body, token) =>
  appointmentsApi.post("/", body, addToken(token));

// Get one appointment by ID
export const getAppointmentApi = (id, token) =>
  appointmentsApi.get(`/${id}`, addToken(token));

// Get balance of an appointment
export const getAllAppointmentApi = (appointId, token) =>
  appointmentsApi.get(`/${appointId}/balance`, addToken(token));

// Update an appointment
export const updateAppointmentApi = (appointId, body, token) =>
  appointmentsApi.patch(`/${appointId}`, body, addToken(token));

// Delete an appointment
export const deleteAppointmentApi = (appointId, token) =>
  appointmentsApi.delete(`/${appointId}`, addToken(token));
