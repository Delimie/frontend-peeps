import React from "react";
import SettingSidebar from "../../components/SettingSidebar";

function DisplaySet() {
  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-white">
        <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="font-bold text-3xl">Display Settings</p>
        </div>
      </div>
    </div>
  );
}

export default DisplaySet;
