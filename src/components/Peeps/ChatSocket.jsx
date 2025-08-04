import { SendHorizontal, UserIcon } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import { userTyping } from "../../socket/handlers/chatHandler";
import { socket } from "../../socket/socket";
import {
  CHANNEL_ACTION,
  CHAT_ACTION,
} from "../../shared/constants/socket.constant";
import useChatStore from "../../stores/chatStore";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import useUserListStore from "../../stores/userListStore";

function ChatSocket() {
  const params = useParams();
  const groupId = Number(params.groupId), channelId = Number(params.channelId);
  const scrollToEndRef = useRef(null);

  const user = useAuthStore(state => state.user);
  const users = useAuthStore(state => state.users);
  const userList = useUserListStore(state => state.userList);

  const memberTyping = useChatStore((state) => state.memberTyping);
  const updateMemberTyping = useChatStore((state) => state.updateMemberTyping);

  const chats = useChatStore(state => state.chats);
  const sendMessage = useChatStore(state => state.sendMessage);
  const getChatByChannelId = useChatStore(state => state.getChatByChannelId);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Socket useEffect : start
  useEffect(() => {
    useChatStore.setState({ memberTyping: [] });

    socket.on(CHAT_ACTION.CHAT_SYNC, (data) => {
      console.log(`Server response with ${data.message}`);
    });

    socket.on(CHAT_ACTION.CHAT_TYPING, (data) => {
      if (data.status) {
        console.log(`User ${data.userName} is Typing`);
        updateMemberTyping(data);
        return;
      }
      console.log(`User ${data.userName} is not Typing `);
      updateMemberTyping(data);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message, "Error code :");
      console.log(err);
    });

    useChatStore.getState().listenToMessage();

    return () => {
      socket.off(CHAT_ACTION.CHAT_SYNC);
      socket.off(CHAT_ACTION.CHAT_TYPING);

      useChatStore.getState().stopListenToMessage();
    };
  }, []);

  // Socket useEffect : handle Change Channel
  useEffect(() => {

    getChatByChannelId(channelId);

    if (channelId) {
      // console.log('join channel ', channelId);
      socket.emit(CHANNEL_ACTION.CHANNEL_JOIN, { channelId: channelId });
    }

    return () => {
      // console.log('Leaving channel ', channelId);
      socket.emit(CHANNEL_ACTION.CHANNEL_LEAVE, { channelId: channelId });
    }
  }, [channelId])

  // Socket useEffect : setIsTyping
  useEffect(() => {
    if (!messageInput) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
  }, [messageInput]);

  // Socket useEffect : chat status
  useEffect(() => {
    if (isTyping) {
      userTyping({ status: isTyping, channelId: channelId });
      return;
    }
    userTyping({ status: isTyping, channelId: channelId });
  }, [isTyping]);

  // For handle ChatSocket function---------------------------------------------------------------------------------------
  const scrollToBottom = () => {
    scrollToEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  // Scrolltobottom use effect
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const hdlSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!messageInput.trim()) return;

      //Compose Data to send update
      const data = {
        content: messageInput,
        userId: useAuthStore.getState().user.id,
        channelId: channelId,
        groupId: groupId,
        file: null, // PUT IT HERE FOR MULTER OPERATION LATER
      };

      sendMessage(data);
      setMessageInput("");
      return;
    }
    return;
  };
  //----------------------------------------------------------------------------------------------------------------------


  return (
    <>
      <div className="text-2xl font-bold mb-2 text-[#8CBEB2]">
        # Channel Name
      </div>
      <div className="flex-1 border border-[#EFEFEF] rounded-xl bg-[#F7FBFF] p-4 mb-4 flex flex-col gap-2">
        {chats.map((el, idx) => (el.channelId === parseInt(channelId) &&
          <ChatBubble
            key={el.id}
            userName={el.userId === user.id ? users[0].name : users.find((element) => element.id === el.userId)?.name}
            createdAt={el.createdAt}
            content={el.content}
            img = {el.userId === user.id ? users[0]?.profileImage : users.find((element) => element.id === el.userId)?.profileImage}
            footer={null}
            position={el.userId === user.id ? "end" : "start"}
          />
        ))}
        <div ref={scrollToEndRef} />
      </div>
      {memberTyping.length > 0 ? (
        <div className="font-semibold inline-block">
          {memberTyping.map((member, index) => (
            <span key={index}>{`${member.userName} `}</span>
          ))}
          <span>is typing...</span>
        </div>
      ) : null}
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-[#8CBEB2] rounded-full px-4 py-2 focus:outline-none"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => hdlSendMessage(e)}
        />
        <button
          type="submit"
          className="bg-[#F3B562] text-[#5C4B51] px-5 py-2 rounded-full hover:bg-[#8CBEB2] hover:text-white transition"
        >
          <SendHorizontal />
        </button>
      </form>
    </>
  );
}

export default ChatSocket;
