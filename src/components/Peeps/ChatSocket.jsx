import { SendHorizontal } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { useEffect, useState } from "react";
import { userTyping } from "../../socket/handlers/chatHandler";
import { socket } from "../../socket/socket";
import { CHAT_ACTION } from "../../shared/constants/socket.constant";
import useChatStore from "../../stores/chatStore";
import { useParams } from "react-router-dom";

const currentUser = "Snoopy";
const messages = [
  { user: "Baymax", text: "Good Morning", time: "10:10" },
  { user: "Snoopy", text: "Hi! 🙋‍♂️", time: "12:45", footer: "Seen by 2" },
];

function ChatSocket() {
  const {groupId, menu} =useParams();

  const memberTyping = useChatStore(state => state.memberTyping);
  const updateMemberTyping = useChatStore(state => state.updateMemberTyping);
  // console.log(memberTyping);

  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Socket useEffect : start
  useEffect(() => {
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

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message, 'Error code :');
      console.log(err);
    });

    return () => {
      socket.off(CHAT_ACTION.CHAT_SYNC);
      socket.off(CHAT_ACTION.CHAT_TYPING);
    };
  }, []);

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
      userTyping({status: isTyping, channelId : menu});
      return;
    }
    userTyping({status: isTyping, channelId : menu});
  }, [isTyping]);

  return (
    <>
      <div className="text-2xl font-bold mb-2 text-[#8CBEB2]">
        # Channel Name
      </div>
      <div className="flex-1 border border-[#EFEFEF] rounded-xl bg-[#F7FBFF] p-4 mb-4 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            user={msg.user}
            time={msg.time}
            message={msg.message}
            footer={msg.footer}
            position={msg.user === currentUser ? "end" : "start"}
          />
        ))}
      </div>
      {
        memberTyping.length > 0 ?
          (<div className="font-semibold inline-block">
            {memberTyping.map((member, index) => <span key={index}>{`${member.userName} `}</span>)}
            <span>is typing...</span>
          </div>)
          : null
      }
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-[#8CBEB2] rounded-full px-4 py-2 focus:outline-none"
          onChange={(e) => setMessageInput(e.target.value)}
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
