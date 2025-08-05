import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authApi } from "../api/authApi";
import { getAllUsersApi, getMeApi, postNewPassword } from "../api/usersApi";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      isLoading: true,
      users: [],
      login: async (input) => {
        const res = await authApi.post("/login", input);
        set({ token: res.data.token, user: res.data.user });
        return res;
      },
      logout: () => set({ token: "", user: null }),
      getUserProfile: async () => {
        const token = get().token;
        const res = await getMeApi(token);
        console.log("res", res.data);
        set({ user: res.data.result });
        return res;
      },
      updateUser: async (id, body) => {
        const token = useAuthStore.getState().token;
        const res = await updateUserApi(id, body, token);
        await get().getUser(id);
        return res;
      },
      deleteUser: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await deleteUserApi(id, token);
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
        return res;
      },
      getUserBalance: async (id) => {
        set({ loading: true });
        const token = useAuthStore.getState().token;
        const res = await getUserBalanceApi(id, token);
        set({ userBalance: res.data.result, loading: false });
        return res;
      },
      postUserNewPassword: async (id, body) => {
        const token = useAuthStore.getState().token;
        const res = await postNewPassword(id, body, token);
        // await get().getUser(id);
        return res;
      },
      getAllUsers: async () => {
        const token = get().token;
        set({ isLoading: true });
        try {
          const res = await getAllUsersApi(token);
           console.log("API getAllUsers response:", res.data.result);
          set({ users: res.data.result, isLoading: false });
          return res;
        } catch (err) {
          console.error("getAllUsers failed:", err);
          set({ isLoading: false });
          throw err;
        }
      },
    }),
    { name: "userStorage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
