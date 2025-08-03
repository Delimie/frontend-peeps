import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserListStore = create(
  persist(
    (set, get) => ({
      userList: [
        {
          id: 1,
          name: 'GODROGER',
          profileImage: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/04/roger-optc-1.jpg'
        },
        {
          id: 3,
          name: 'ACE IN THE HOLE',
          profileImage: 'https://static.wikia.nocookie.net/onepiece-fairytail/images/a/a8/Portgas_D._Ace.png/revision/latest?cb=20160810233432'
        },
      ],
      onlineUser:[], // Contain userId to check whose on and off
      offlineUser:[],
      getUserListProfile: async () => {
        // const token = get().token;
        // const res = await getUserListApi(token);
        // console.log("res", res.data);
        // set({ userList: res.data.result });
        // return res;
      },
      updateUser: async (id, body) => {
        // const token = useAuthStore.getState().token;
        // const res = await updateUserApi(id, body, token);
        // await get().getUser(id);
        // return res;
      },
      deleteUser: async (id) => {
        // const token = useAuthStore.getState().token;
        // const res = await deleteUserApi(id, token);
        // set((state) => ({
        //   users: state.users.filter((u) => u.id !== id),
        // }));
        // return res;
      },
    }),
    { name: "userListStorage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useUserListStore;
