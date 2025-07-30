import { CHAT_ACTION, STATUS } from "../../shared/constants/socket.constant"
import { socket } from "../socket.js"

export const userSendChat = (message) => {
  const userId = useAuthStore(state => state.user?.id);
<<<<<<< HEAD
  socket.emit(CHAT_ACTION.CHAT_SEND, { content: message, userId: userId, channelId : channelId });
=======
  socket.emit(CHAT_ACTION.CHAT_SEND, { message: message, userId: userId });
>>>>>>> a75da525be20dc4d21f6de21b8d7246d88d79b12
}

export function userTyping(input) {
  if (!input) {
    socket.emit(CHAT_ACTION.CHAT_TYPING, {
      status: STATUS.INACTIVE
    })
    return;
  }

  socket.emit(CHAT_ACTION.CHAT_TYPING, {
    status: STATUS.ACTIVE
  });
}