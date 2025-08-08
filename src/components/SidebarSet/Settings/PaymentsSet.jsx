import React from "react";
import SettingSidebar from "../../SettingSidebar";
import MyQR from "../../../assets/MyQR.png";

function PaymentsSet() {
  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-[#F2EBBF]">
        <div className="whitebox flex flex-col gap-6 justify-around items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="Payments font-bold text-3xl">Payments</p>
          <div className="flex justify-around w-180">
            <div className="Categories relative grid grid-cols-2 rounded-2xl p-3 w-80 h-94 bg-[#EFEFEF]">
              <div className="absolute inset-0 bg-[#5C4B51]/70 flex items-center justify-center z-10 rounded-4xl">
                <p className="text-3xl font-bold text-white itim">
                  💰 Coming Soon 💰
                </p>
              </div>
              <p>Categories</p>
              <br />
              {/* <div className="grid grid-cols-2"> */}
              <div className="flex rounded-2xl mx-auto w-35 h-35 border justify-center">
                Food
              </div>
              <div className="flex rounded-2xl mx-auto w-35 h-35 border justify-center">
                Entertainment
              </div>
              <div className="flex rounded-2xl mx-auto w-35 h-35 border justify-center">
                Travel
              </div>
              {/* </div> */}
            </div>
            <div className="rounded-2xl w-100 flex flex-col items-end gap-3">
              <div className="flex flex-row justify-around gap-5">
                <div className="My QR w-45 h-45 rounded-2xl flex flex-col p-3 bg-[#EFEFEF]">
                  <p>MY QR</p>
                  <img src={MyQR} className="h-30 w-30 mx-auto my-auto" />
                </div>
                <div className="My Subscription w-45 h-45 rounded-2xl flex p-3 bg-[#EFEFEF]">
                  <p>My Subscription</p>
                  <div></div>
                </div>
              </div>
              <div className="TransferLimit w-95 h-45 rounded-2xl p-3 bg-[#EFEFEF]">
                Transfer Limit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentsSet;
