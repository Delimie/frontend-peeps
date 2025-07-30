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
} from "../api/groupApi";

const useGroupStore = create(
  persist(
    (set, get) => ({
      groups: [],
      currentGroup: null,
      groupUsers: [],
      loading: false,

      createGroup: async (body, userId) => {
        set({ loading: true });
        const resp = await createGroupApi(body);
        const newGroup = resp.data.group;
        set((state) => ({
          loading: false,
          groups: [newGroup, ...state.groups],
        }));
        return resp;
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
        set({ groupUsers: resp.data.message, loading: false });
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
        set((state) => ({
          groups: state.groups.filter((g) => g.id !== id),
        }));
        return resp;
      },

      setCurrentGroup: (group) => set({ currentGroup: group }),
    }),
    {
      name: "group-storage"
    }
  )
);

export default useGroupStore;
