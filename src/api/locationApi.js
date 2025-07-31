import axios from "axios";

const locationsApi = axios.create({
  baseURL: "http://localhost:8000/locations",
});

locationsApi.interceptors.request.use((config) => {
  const userState = JSON.parse(localStorage.getItem("userStorage") || "{}");
  const token = userState?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Create location
export const createLocationApi = (body) =>
  locationsApi.post("/", body);

//Get location by ID
export const getLocationByIdApi = (id) =>
  locationsApi.get(`/${id}`);

//Get location for a specific appointment
export const getLocationByAppointmentIdApi = (appointmentId) =>
  locationsApi.get(`/appointments/${appointmentId}/location`);
