import React from "react";

function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7fbff]">
      <div className="rounded-2xl min-w-screen shadow-lg p-6 m-12 bg-white flex flex-col gap-4">
        {/* ส่วน Avatar + Username + Email แบบแนวนอน */}
        <div className="flex gap-5 mb-2">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400">👤</span>
          </div>
            <button>Change Avatar</button>
          {/* Username + Email */}
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-bold">Username</div>
            <div className="text-gray-600">email@example.com</div>
          </div>
        </div>

        {/* ข้อมูลอื่น ๆ */}
        <div className="flex gap-2">
          <span className="font-semibold">Age:</span>
          <span>22</span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold">Gender:</span>
          <span>Female</span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold">Address:</span>
          <span>123 Blue Ocean</span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold">Occupation:</span>
          <span>Web Developer</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
