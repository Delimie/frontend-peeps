import { CHAT_ACTION, STATUS } from "../../shared/constants/socket.constant"
import { socket } from "../socket.js"

export const userSendChat = (message) => {
  const userId = useAuthStore(state => state.user?.id);
  socket.emit(CHAT_ACTION.CHAT_SEND, { message: message, userId: userId });
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