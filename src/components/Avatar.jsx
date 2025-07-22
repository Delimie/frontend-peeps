import React from "react";

function Avatar({ avatar, size = 100 }) {
  return (
    <div
      className="w-[80px] h-[80px] rounded-full border-3 border-white shadow-lg flex items-center justify-center bg-[#ffed90] overflow-hidden"
      style={{
        width: size,
        height: size,
      }}
    >
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
      ) : (
        <span className="text-3xl">🎨</span>
      )}
    </div>
  );
}

export default Avatar;
