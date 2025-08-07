import React from "react";
import SettingSidebar from "../../components/SettingSidebar";

function DisplaySet() {
  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-[#F2EBBF]">
        <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="font-bold text-3xl">Display Settings</p>
          <div className="flex flex-col justify-between w-120 bg-[#EFEFEF] py-3 px-4 gap-4 rounded-2xl">
            <div className="flex justify-between w-full">
              <p>Partially Mask Account Number</p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-md"
              />
            </div>
            <div className="flex justify-between w-full">
              <p>Display Balance in Home Page</p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplaySet;
