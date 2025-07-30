import { create } from "zustand";
import { persist } from "zustand/middleware";
import { socket } from "../socket/socket";
import { CHAT_ACTION, CHAT_EVENT } from "../shared/constants/socket.constant";

const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [
        {
          id: 1,
          userId: 1,
          content: "Hello Hey",
          createdAt: 'dayjs',
          updatedAt: 'dayjs',
          channelId: 2345,
          attachment: {
            id: 5,
            url: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
            type: "image/png",
            name: "dog.png",
            size: "1234kbps",
            messageId: 1
          }
        }
      ],
      sendMessage: (data) => {
        // const { content = null, userId, channelId, groupId, file = null, ...restData } = data 

        //Server side can handle callback if you want
        socket.emit(CHAT_ACTION.CHAT_SEND, data);
      },
      deleteMessage: (data) => {
        const { id } = data

        socket.emit(CHAT_ACTION.CHAT_DELETE, { id: id }, (res) => {
          if (res.success) {
            console.log(res.message);
            const newDeleteChats = get().chats.reduce((acc, el) => el.id != id ? acc.push(el) : acc, []);
            set({ chats: [newDeleteChats] });
            return;
          }
          console.log(res.message);
        });
      },
      editMessage: (data) => {
        const { id, content } = data

        socket.emit(CHAT_ACTION.CHAT_EDIT, { id: id, content: content }, (res) => {
          if (res.success) {
            console.log(res.message);
            const newDeleteChats = get().chats.reduce((acc, el) => el.id != id ? acc.push(el) : acc, []);
            set({ chats: [newDeleteChats] });
            return;
          }
          console.log(res.message);
        });
      },
      listenToMessage: (socket) => {
        socket.on(CHAT_EVENT.SYNC_MESSAGE, (data) => {
          const { message, attachment } = data;
          const finalMessage = { ...message, attachment };

          set((state) => ({ chats: [...state.chats, finalMessage] }))
        });

        socket.on(CHAT_ACTION.CHAT_DELETE, (data) => {
          const { id } = data;
          const newDeleteChats = get().chats.reduce((acc, el) => el.id != id ? acc.push(el) : acc, []);

          set((state) => ({ chats: [newDeleteChats] }));
        });

        socket.on(CHAT_ACTION.CHAT_EDIT, (data) => {
          const { id } = data;
          const newUpdatedChats = get().chats.reduce((acc, el) => el.id === id ? acc.push(data) : acc.push(el), []);

          set((state) => ({ chats: [newUpdatedChats] }));
        });
      },
      stopListenToMessage: () => {
        socket.off(CHAT_EVENT.SYNC_MESSAGE);
        socket.off(CHAT_ACTION.CHAT_DELETE);
        socket.off(CHAT_ACTION.CHAT_EDIT);
      },
    }),
    {
      name: "group-storage"
    }
  )
);

export default useChatStore;