import { create } from "zustand";
import {
  addUserToGroupApi,
  createGroupApi,
  deleteGroupApi,
  getGroupByIdApi,
  removeUserFromGroupApi,
  updateGroupApi,
  getUsersInGroupApi,
} from "../api/groupApi";

const useGroupStore = create((set, get) => ({
  groups: [],
  currentGroup: null,
  groupUsers: [], // <-- เพิ่ม state เก็บ users ในกลุ่ม
  loading: false,

  // สร้างกลุ่มใหม่
  createGroup: async (body, userId) => {
    set({ loading: true });
    const resp = await createGroupApi(body); // resp.data คือ group ที่ backend ส่งกลับ
    console.log("createGroup resp.data:", resp.data);
    const newGroup = resp.data;
    set((state) => ({
      loading: false,
      groups: [newGroup, ...state.groups],
    }));
    return resp;
  },

  // ดึงกลุ่มด้วย ID
  getGroupById: async (id) => {
    set({ loading: true });
    const resp = await getGroupByIdApi(id);
    set({ currentGroup: resp.data.result, loading: false });
    return resp;
  },

  // ดึง users ในกลุ่ม
  getUsersInGroup: async (groupId) => {
    set({ loading: true });
    const resp = await getUsersInGroupApi(groupId);
    set({ groupUsers: resp.data.message, loading: false });
    return resp;
  },

  addUserToGroup: async (groupId, userId, role = "USER") => {
    // API รับเป็น body { userId, role }
    const resp = await addUserToGroupApi(groupId, { userId, role });
    await get().getUsersInGroup(groupId);
    await get().getGroupById(groupId);
    return resp;
  },

  removeUserFromGroup: async (groupId, userId) => {
    const resp = await removeUserFromGroupApi(groupId, userId);
    await get().getUsersInGroup(groupId);
    await get().getGroupById(groupId);
    return resp;
  },

  updateGroup: async (id, body) => {
    const resp = await updateGroupApi(id, body);
    await get().getGroupById(id);
    return resp;
  },

  deleteGroup: async (id) => {
    const resp = await deleteGroupApi(id);
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    }));
    return resp;
  },

  setCurrentGroup: (group) => set({ currentGroup: group }),
}));

export default useGroupStore;
