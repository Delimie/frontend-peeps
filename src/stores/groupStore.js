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
import useChannelStore from "./channelStore";

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

          // const groups = [...get().groups];

          for (let eachGroup of get().groups) {
            // console.log(eachGroup);
            await useChannelStore.getState().getChannelByGroupId(Number(eachGroup.id));
          }
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
        // console.log(resp.data.message.members)
        // set({ groupUsers: resp.data.message.members, loading: false });
        console.log("API Response Members:", resp.data.message.members);
        set({ groupUsers: [...resp.data.message.members], loading: false });
        return resp;
      },

      addUserToGroup: async (groupId, userId = null, role = "USER", userName = null) => {
        const body = userId ? { userId, role } : { userName, role };
        const resp = await addUserToGroupApi(groupId, body);
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

      setCurrentGroupById: (groupId) => {
        const currentGroup = (get().groups).find( group => group.id === Number(groupId) )
        set({ currentGroup: currentGroup });
      },
      updateGroupUsers : async (userData) =>{
        const newGroupUsers = get().groupUsers.map((user) => user.id === userData.id ? userData : user);
        set({groupUsers : [...newGroupUsers]});
      }
    }),
    { name: "group-storage" }
  )
);

export default useGroupStore;
