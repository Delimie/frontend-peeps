import React from "react";
import SettingSidebar from "../../SettingSidebar";

function PaymentsSet() {
  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-white">
        <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="font-bold text-3xl">Payments</p>
          <div className="flex justify-between">
            <div className="border rounded-2xl w-full">1</div>
            <div className="border rounded-2xl w-full">
              <div className="border flex flex-row">
                <div>2</div>
                <div>3</div>
              </div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentsSet;
