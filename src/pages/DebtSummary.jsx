import { X } from "lucide-react";
// import { useState } from "react";
import DebtSum from "../components/DebtSummaryPage/DebtSum";
import RightSide from "../components/DebtSummaryPage/RightSide";

function DebtSummary() {
  return (
    <div className="h-screen w-full bg-[#F2EBBF] flex gap-10 justify-center pt-20 pb-20">
      <DebtSum />
      <RightSide />
    </div>
  );
}
export default DebtSummary;
