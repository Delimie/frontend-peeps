import React from "react";
import { Link } from "react-router-dom";
import * as motion from "motion/react-client";

function SettingSidebar() {
  return (
    <div className="h-fit flex justify-center p-5 rounded-2xl flex-col gap-8 fixed mx-5 text-lg font-medium bg-[#F2EBBF]">
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
        to="/CardSet"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Cards and Payments
      </Link>
      <Link
        to="/Transactions"
        className="hover:text-[#de9227] transition hover:scale-105"
      >
        Transactions
      </Link>
    </div>
  );
}

export default SettingSidebar;
