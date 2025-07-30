import { SendHorizontal } from "lucide-react";
import ChatBubble from "./ChatBubble";

function ChatSocket() {
  return (
    <>
      <div className="text-2xl font-bold mb-2 text-[#8CBEB2]">
        # Channel Name
      </div>
      <div className="flex-1 border border-[#EFEFEF] rounded-xl bg-[#F7FBFF] p-4 mb-4">
        <ChatBubble
          user="Baymax"
          time="10:10"
          text="Good Morning"
          position="start"
        />
      </div>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-[#8CBEB2] rounded-full px-4 py-2 focus:outline-none"
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
