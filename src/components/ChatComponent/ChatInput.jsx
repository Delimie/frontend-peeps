import { SendHorizontal } from "lucide-react";

function ChatInput() {
  return (
    <div className="w-11/12 h-[8vh] bg-[#F3B562] rounded-l-4xl flex items-center justify-center gap-2 pl-4">
      <textarea
        type="text"
        placeholder="Type here..."
        className="h-[6vh] w-6/7 resize-none"
      />
      <div className="bg-[#F2EBBF] rounded-full h-9 w-9 flex justify-center items-center">
        <button type="submit">
          <SendHorizontal className="text-[#5C4B51]" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
