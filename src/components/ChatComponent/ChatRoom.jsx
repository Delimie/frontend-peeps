import ChatInput from "./ChatInput";

function ChatRoom({ messages }) {
  return (
    <div className="bg-white w-3/4 h-[80vh] rounded-r-3xl">
      <span className="flex justify-center items-center">Channel Name</span>
      <div className="h-full flex flex-col justify-end items-end pb-5">
        {/* แชตบับเบิ้ล */}
        <div className="h-[60vh] w-full flex flex-col gap-3 px-4">
          {messages.map((msg, i) => (
            <div className={`chat chat-${msg.position}`} key={i}>
              <div className="chat-image avatar">
                <div className="w-12 rounded-full">
                  <img src={msg.img} alt="User Avatar" />
                </div>
              </div>
              <div className="chat-header">
                {msg.user}
                <time className="text-xs opacity-50">{msg.time}</time>
              </div>
              <div className={`chat-bubble rounded-xl ${msg.position === "end" ? "bg-[#b9dfd6]" : "bg-[#F3B761]"} text-lg`}>
                {msg.text}
              </div>
              {msg.footer && (
                <div className="chat-footer opacity-50">{msg.footer}</div>
              )}
            </div>
          ))}
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatRoom;
