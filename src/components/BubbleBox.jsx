import React from "react";
import Baymax from "../assets/ProfilePic/Baymax.jpg";
import Snoopy from "../assets/ProfilePic/Snoopy.jpg";
import Spiderman from "../assets/ProfilePic/spiderman.jpg";

function BubbleBox() {
  return (
    <div className="px-3 py-3 mt-80">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full">
            <img src={Baymax} alt="User Avatar" />
          </div>
        </div>
        <div className="chat-header">
          Baymax
          <time className="text-xs opacity-50">10:10</time>
        </div>
        <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
          Good Morning
        </div>
      </div>

      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full">
            <img src={Spiderman} alt="User Avatar" />
          </div>
        </div>
        <div className="chat-header">
          Spiderman
          <time className="text-xs opacity-50">12:34</time>
        </div>
        <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
          Hello!
        </div>
      </div>

      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full">
            <img src={Snoopy} alt="User Avatar" />
          </div>
        </div>
        <div className="chat-header">
          Snoopy
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble rounded-xl bg-[#8CBEB2] text-lg">
          Hi! 🙋‍♂️
        </div>
        <div className="chat-footer opacity-50">Seen by 2</div>
      </div>
    </div>
  );
}

export default BubbleBox;
