import { create } from "zustand";
import {
  createAppointmentApi,
  getAllAppointmentApi,
  getAppointmentApi,
  updateAppointmentApi,
  deleteAppointmentApi,
} from "../api/appointmentApi";

const useAppointmentStore = create((set, get) => ({
  appointments: [],
  currentAppointment: null,
  loading: false,

  // 📄 ดึงข้อมูลนัดหมาย (เช่น รายการ balance)
  getAllAppointments: async (appointId) => {
    set({ loading: true });
    const resp = await getAllAppointmentApi(appointId); // เช่น /:appointId/balance
    set({ appointments: resp.data.result, loading: false });
    return resp;
  },

  // 🔍 ดึงนัดหมายทีละรายการ
  getAppointmentById: async (id) => {
    set({ loading: true });
    const resp = await getAppointmentApi(id);
    set({ currentAppointment: resp.data.result, loading: false });
    return resp;
  },

  // ➕ สร้างนัดหมายใหม่
  createAppointment: async (body) => {
    set({ loading: true });
    const resp = await createAppointmentApi(body);
    // Optionally เพิ่มเข้า appointments ทันที
    // set(state => ({ appointments: [resp.data.result, ...state.appointments], loading: false }));
    set({ loading: false });
    return resp;
  },

  // 🛠 อัปเดตนัดหมาย
  updateAppointment: async (appointId, body) => {
    set({ loading: true });
    const resp = await updateAppointmentApi(appointId, body);
    await get().getAppointmentById(appointId); // อัปเดต current
    set({ loading: false });
    return resp;
  },

  // ❌ ลบนัดหมาย
  deleteAppointment: async (appointId) => {
    set({ loading: true });
    const resp = await deleteAppointmentApi(appointId);
    // หลังลบควรไป fetch รายการใหม่ถ้าต้องการ
    set({ loading: false });
    return resp;
  },

  // 🎯 ตั้งค่านัดหมายปัจจุบัน (ใช้ตอนแก้ไข)
  setCurrentAppointment: (appointment) => set({ currentAppointment: appointment }),
}));

export default useAppointmentStore;
