import React from "react";
import Avatar from "../../components/avatar";

function Profile() {
  return (
<div className="min-h-screen flex items-center justify-center pt-12">
  <div className="rounded-2xl shadow-lg p-8 bg-white flex flex-col gap-4 max-w-md w-full">
    <h1 className="text-4xl text-center">MY PROFILE</h1>
        <div className="flex gap-5 mb-2">
          <Avatar size={150} />

          <div className="flex flex-col justify-center">
            <div className="text-4xl font-bold">Username</div>
            <div className="text-gray-600">email@example.com</div>
          </div>
        </div>
        <div className="flex justify-around border ">
        <button className="bg-amber-100 w-1/3">Change Avatar</button>
        <button className="bg-amber-400 w-2/3">Edit profile</button>
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
        <div className="flex gap-2">
          <span className="font-semibold">Date of birth:</span>
          <span>01/01/2000</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
