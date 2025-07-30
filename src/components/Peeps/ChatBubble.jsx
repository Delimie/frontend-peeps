import React from "react";

function ChatBubble({ user, time, text, img, position = "start", footer }) {
  return (
    <div className={`chat chat-${position}`}>
      <div className="chat-image avatar">
        <div className="w-12 rounded-full">
          <img src={img} alt="User Avatar" />
        </div>
      </div>
      <div className="chat-header">
        {user}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div
        className={`chat-bubble rounded-xl ${
          position === "end" ? "bg-[#8CBEB2] text-white" : "bg-[#F3B761] text-[#5C4B51]"
        } text-md`}
      >
        {text}
      </div>
      {footer && <div className="chat-footer opacity-50">{footer}</div>}
    </div>
  );
}

export default ChatBubble;
