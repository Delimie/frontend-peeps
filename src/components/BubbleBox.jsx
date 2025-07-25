import React from "react";
import Baymax from "../assets/Baymax.jpg";
import Snoopy from "../assets/Snoopy.jpg";
import Spiderman from "../assets/Spiderman.jpg";

function BubbleBox() {
  const chat = [
  {
    id: id,
    posterId: userId,
    message: "some message",
    type: 'message'
  },
  {
    id: id,
    posterId: userId,
    img: 'img.jpg',
    type: 'image'
  },
  {
    id: id,
    posterId: userId,
    file: 'file.doc',
    type: 'file'
  },
  {
    id: id,
    posterId: userId,
    message: "some message 2",
    type: 'message'
  }
]
  return (
    <div className="px-3 py-3 mt-80">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full">
            <img src={Baymax} alt="Tailwind CSS chat bubble component" />
          </div>
        </div>
        <div className="chat-header">
          Baymax
          <time className="text-xs opacity-50">12:12</time>
        </div>
        <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
          {id.message}
        </div>
      </div>

      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full">
            <img src={Spiderman} alt="Tailwind CSS chat bubble component" />
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
            <img src={Snoopy} alt="Tailwind CSS chat bubble component" />
          </div>
        </div>
        <div className="chat-header">
          Snoopy
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble rounded-xl bg-[#8CBEB2] text-lg">
          Hi! 🙋‍♂️
        </div>
        <div className="chat-footer opacity-50">Seen at 12:48</div>
      </div>
    </div>
  );
}

export default BubbleBox;
