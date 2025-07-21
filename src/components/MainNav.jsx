import React from "react";
import { Link } from "react-router-dom";

function MainNav() {
  const NavBarStyle =
    "text-[#21b3af] text-lg font-medium hover:text-[#ffe066] transition hover:scale-105";

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#fff8d5] text-[#2dc1b7] px-8 py-2 h-12 z-50">
      <div className="flex gap-2 items-center">
        <span className="text-2xl drop-shadow-sm">LOGOS</span>
        <Link
          to="/"
          className="font-extrabold tracking-wider text-[#2dc1b7] text-2xl"
        >
          PEEPS!
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/" className={NavBarStyle}>
          HOME
        </Link>
        <Link to="/profile" className={NavBarStyle}>
          PROFILE
        </Link>

        <>
          <Link to="/login" className="text-[#21b3af] bg-white text-lg font-medium hover:text-[#ffe066] transition hover:scale-105 border-2 px-2 rounded-2xl">
            LOG IN
          </Link>
          <Link to="/register" className="text-[#21b3af] bg-white text-lg font-medium hover:text-[#ffe066] transition hover:scale-105 border-2 px-2 rounded-2xl">
            REGISTER
          </Link>
        </>
      </div>
    </div>
  );
}

export default MainNav;
