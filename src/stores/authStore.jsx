import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authApi } from "../api/authApi";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      isLoading: true,
      login: async (input) => {
        const res = await authApi.post("/login", input);
        set({ token: res.data.token, user: res.data.payload });
        return res;
      },
      logout: () => set({ token: "", user: null }),
    }),
    { name: "authStorage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
