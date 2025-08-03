import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addUserToGroupApi,
  createGroupApi,
  deleteGroupApi,
  getGroupByIdApi,
  removeUserFromGroupApi,
  updateGroupApi,
  getUsersInGroupApi,
  getMyGroupsAPI,
} from "../api/groupApi";

const useGroupStore = create(
  persist(
    (set, get) => ({
      groups: [],
      currentGroup: null,
      groupUsers: [],
      loading: false,
      error: null,

      getMyGroups: async () => {
        set({ loading: true, error: null });
        try {
          const res = await getMyGroupsAPI();
          set({ groups: res.data.result, loading: false });
        } catch (err) {
          set({ error: err.message || "Failed to fetch groups", loading: false });
        }
      },

      createGroup: async (body) => {
        set({ loading: true });
        try {
          const resp = await createGroupApi(body);  
          await get().getMyGroups();
          set({ loading: false });
          return resp.data; 
        } catch (err) {
          set({ loading: false, error: err.message || "Failed to create group" });
          throw err;
        }
      },

      getGroupById: async (id) => {
        set({ loading: true });
        const resp = await getGroupByIdApi(id);
        set({ currentGroup: resp.data.result, loading: false });
        return resp;
      },

      getUsersInGroup: async (groupId) => {
        set({ loading: true });
        const resp = await getUsersInGroupApi(groupId);
        console.log("members", resp.data.message.members);
        set({ groupUsers: resp.data.message.members, loading: false });
        return resp;
      },

      addUserToGroup: async (groupId, userId, role = "USER") => {
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
        await get().getMyGroups();
        return resp;
      },

      setCurrentGroup: (group) => set({ currentGroup: group }),
    }),
    { name: "group-storage" }
  )
);

export default useGroupStore;
