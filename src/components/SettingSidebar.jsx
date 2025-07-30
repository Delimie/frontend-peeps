import React from "react";
import { Link } from "react-router-dom";
import * as motion from "motion/react-client";

function SettingSidebar() {
  return (
    <div className="h-fit flex justify-center p-5 pr-8 rounded-2xl flex-col gap-8 fixed mx-8 text-lg font-medium bg-[#F2EBBF] shadow-[2px_6px_10px_#959EA7]">
      <Link
        to="/Profile"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Profile
      </Link>
      <Link
        to="/PassSet"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Password
      </Link>
      <Link
        to="/PaymentsSet"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Payments
      </Link>
      <Link
        to="/Display"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Display Settings
      </Link>
    </div>
  );
}

export default SettingSidebar;
