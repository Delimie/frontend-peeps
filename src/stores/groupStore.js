import { create } from "zustand";
import {
  addUserToGroupApi,
  createGroupApi,
  deleteGroupApi,
  getGroupByIdApi,
  removeUserFromGroupApi,
  updateGroupApi,
} from "../api/groupApi";

const useGroupStore = create((set, get) => ({
  groups: [],
  currentGroup: null,
  loading: false,

  //สร้างกลุ่มใหม่
  createGroup: async (body, user) => {
    set({ loading: true });
    const resp = await createGroupApi(body);
    const newGroup = { ...resp.data.result, users: [user] };
    set((state) => ({
      loading: false,
      groups: [newGroup, ...state.groups],
    }));
    return resp;
  },

  //ดึงกลุ่มด้วย ID
  getGroupById: async (id) => {
    set({ loading: true });
    const resp = await getGroupByIdApi(id);
    set({ currentGroup: resp.data.result, loading: false });
    return resp;
  },

  //แก้ไขกลุ่ม
  updateGroup: async (id, body) => {
    const resp = await updateGroupApi(id, body);
    await get().getGroupById(id); // รีเฟรชข้อมูลกลุ่มหลังอัปเดต
    return resp;
  },

  //ลบกลุ่ม
  deleteGroup: async (id) => {
    const resp = await deleteGroupApi(id);
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    }));
    return resp;
  },

  //เพิ่มผู้ใช้เข้ากลุ่ม
  addUserToGroup: async (groupId, userId) => {
    const resp = await addUserToGroupApi(groupId, userId);
    await get().getGroupById(groupId);
    return resp;
  },

  //เอาผู้ใช้ออกจากกลุ่ม
  removeUserFromGroup: async (groupId, userId) => {
    const resp = await removeUserFromGroupApi(groupId, userId);
    await get().getGroupById(groupId);
    return resp;
  },

  //ตั้งค่ากลุ่มปัจจุบัน
  setCurrentGroup: (group) => set({ currentGroup: group }),
}));

export default useGroupStore;
