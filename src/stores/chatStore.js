import { create } from "zustand";
import { persist } from "zustand/middleware";
import { socket } from "../socket/socket";
import { CHAT_ACTION, CHAT_EVENT } from "../shared/constants/socket.constant";
import useAuthStore from "./authStore";
import useUserListStore from "./userListStore";

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
          channelId: 1,
          attachment: {
            id: 5,
            url: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
            type: "image/png",
            name: "dog.png",
            size: "1234kbps",
            messageId: 1
          }
        },
        {
          id: 2,
          userId: 2,
          content: "Hello I'm Luffy",
          createdAt: 'dayjs',
          updatedAt: 'dayjs',
          channelId: 1,
          attachment: {
            id: 3,
            url: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
            type: "image/png",
            name: "dog.png",
            size: "1234kbps",
            messageId: 1
          }
        }
      ],
      memberTyping : [],
      updateMemberTyping : (data) =>{
        if(!data)return;
        const {userId, userName, status} = data;
        const existingMember = [...get().memberTyping];

        // Check if member still typing status = true
        if(status){
          // Check if updated user not existing yet?
          if(existingMember.includes((member)=> member.userId !== userId)){
            return;
          }
          set({memberTyping : [...existingMember, {userId, userName}]});
          return;
        }
        // Member is not typing status = false assume they are in array already remove them
        const newMemberTyping = existingMember.filter((member)=> member.userId !== userId);
        set ({memberTyping :[...newMemberTyping]});
      },
      sendMessage: (data) => {
        // const { content = null, userId, channelId, groupId, file = null, ...restData } = data 

        //Server side can handle callback if you want
        // console.log('testing input :',data);

        socket.emit(CHAT_ACTION.CHAT_SEND, data);
      },
      deleteMessage: (data) => {
        const { id, channelId, groupId } = data

        socket.emit(CHAT_ACTION.CHAT_DELETE, { id, channelId, groupId }, (res) => {
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
        const { id, content, channelId, groupId } = data

        socket.emit(CHAT_ACTION.CHAT_EDIT, { id, content, channelId, groupId }, (res) => {
          if (res.success) {
            console.log(res.message);
            const newDeleteChats = get().chats.reduce((acc, el) => el.id != id ? acc.push(el) : acc, []);
            set({ chats: [newDeleteChats] });
            return;
          }
          console.log(res.message);
        });
      },
      listenToMessage: () => {
        socket.on(CHAT_ACTION.CHAT_SEND, (data) => {
          console.log('recieve message');
          const { message, attachment } = data;
          const finalMessage = { ...message, attachment };

          set((state) => ({ chats: [...state.chats, finalMessage] }))
        });

        socket.on(CHAT_ACTION.CHAT_DELETE, (data) => {
          const { id, message } = data;
          console.log(message);

          const newDeleteChats = get().chats.reduce((acc, el) => el.id != id ? acc.push(el) : acc, []);

          set((state) => ({ chats: [newDeleteChats] }));
        });

        socket.on(CHAT_ACTION.CHAT_EDIT, (data) => {
          const { message, newData } = data;
          console.log(message);

          const newUpdatedChats = get().chats.reduce((acc, el) => el.id === id ? acc.push(newData) : acc.push(el), []);

          set((state) => ({ chats: [newUpdatedChats] }));
        });
      },
      stopListenToMessage: () => {
        socket.off(CHAT_ACTION.CHAT_SEND);
        socket.off(CHAT_ACTION.CHAT_DELETE);
        socket.off(CHAT_ACTION.CHAT_EDIT);
      },
    }),
    {
      name: "chat-storage"
    }
  )
);

export default useChatStore;