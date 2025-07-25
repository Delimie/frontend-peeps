import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authApi } from "../api/authApi";
import { getUserApi } from "../api/usersApi";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzNDI5OTU0LCJleHAiOjE3NTYwMjE5NTR9.W5n7IwlPo3LtvctOYXLz55ty6SHRFhRXiIKxQVmZpSs",
      isLoading: true,
      login: async (input) => {
        const res = await authApi.post("/login", input);
        set({ token: res.data.token, user: res.data.payload });
        return res;
      },
      logout: () => set({ token: "", user: null }),
      getUserProfile: async (id) => {
        const res = await getUserApi(id);
        console.log("res", res.data)
        set({ user: res.data.result });
        return res;
      },
    }),
    { name: "authStorage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
