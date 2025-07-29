import { create } from "zustand";
import {
  createLocationApi,
  getLocationByIdApi,
  getLocationByAppointmentIdApi,
} from "../api/locationApi";

const useLocationStore = create((set, get) => ({
  locations: [],
  currentLocation: null,
  loading: false,

  //สร้าง location ใหม่
  createLocation: async (body) => {
    set({ loading: true });
    const resp = await createLocationApi(body);
    // Optionally: push เข้า locations ทันที (ถ้ามี list)
    // set(state => ({
    //   locations: [resp.data.result, ...state.locations],
    //   loading: false
    // }));
    set({ loading: false });
    return resp;
  },

  //ดึง location ทีละอัน (ด้วย id)
  getLocationById: async (id) => {
    set({ loading: true });
    const resp = await getLocationByIdApi(id);
    set({ currentLocation: resp.data.result, loading: false });
    return resp;
  },

  //ดึง location ด้วย appointment id
  getLocationByAppointmentId: async (appointmentId) => {
    set({ loading: true });
    const resp = await getLocationByAppointmentIdApi(appointmentId);
    set({ currentLocation: resp.data.result, loading: false });
    return resp;
  },

  //ตั้งค่าตัวปัจจุบัน
  setCurrentLocation: (location) => set({ currentLocation: location }),

  //เคลียร์ state
  clearLocation: () => set({ currentLocation: null, locations: [] }),
}));

export default useLocationStore;