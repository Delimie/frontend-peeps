import TimeAgo from "../ChatComponent/TimeAgo";

function ChatBubble({ userName, createdAt, content, position, img, footer }) {
  return (
    <div className={`chat chat-${position}`}>
      <div className="chat-image avatar">
        <div className="w-12 rounded-full">
          {img && <img src={img} alt="User Avatar" />}
        </div>
      </div>
      <div className="chat-header">
        {userName}
        <time className="text-xs opacity-50 ml-2">{<TimeAgo date={createdAt} />}</time>
      </div>
      <div
        className={`chat-bubble rounded-xl ${
          position === "end"
            ? "bg-[#8CBEB2] text-white"
            : "bg-[#F3B761] text-[#5C4B51]"
        } text-lg`}
      >
        {content}
      </div>
      {footer && <div className="chat-footer opacity-50">{footer}</div>}
    </div>
  );
}

export default ChatBubble;
