import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../assets/icon";

function MainNav() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const NavBarStyle =
    "text-lg font-medium hover:text-[#de9227] transition hover:scale-105";

  return (
    <div className="fixed top-0 left-0 w-full grid grid-cols-3 items-center bg-[#F2EBBF] px-8 py-2 h-20 z-50">
      <div className="flex gap-2 items-center">
        <span className="text-2xl drop-shadow-sm">LOGOS</span>
        <Link
          to="/"
          className="font-extrabold tracking-wider text-2xl"
        >
          PEEPS!
        </Link>
      </div>

      <div className="flex justify-center items-center gap-10">
        <Link to="/" className={NavBarStyle}>
          Home
        </Link>
        <Link to="/profile" className={NavBarStyle}>
          Peeps!
        </Link>
        <Link to="/profile" className={NavBarStyle}>
          Pricing
        </Link>
        <Link to="/profile" className={NavBarStyle}>
          <p>About Us</p>
        </Link>
        <div
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            className={NavBarStyle + " flex items-center gap-1 cursor-pointer"}
          >
            Feature
            <svg
              className="w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black/5 z-50">
              <Link
                to="/feature/ai"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                อะไรไม่รู้
              </Link>
              <Link
                to="/feature/sea"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                ฮือออออออ
              </Link>
              <Link
                to="/feature/notification"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                ทดสอบจ้า
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 items-center">
        {/* <Link
          to="/login"
          className="text-[#de9227] bg-white text-lg font-medium hover:text-[#ffe066] transition hover:scale-105 border-2 px-2 rounded-xl"
        >
          LOG IN
        </Link>
        <Link
          to="/register"
          className="text-[#de9227] bg-white text-lg font-medium hover:text-[#ffe066] transition hover:scale-105 border-2 px-2 rounded-xl"
        >
          REGISTER
        </Link> */}
        <button
          className="px-2 py-1 rounded-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-white font-bold">
            <UserIcon/>
          </span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <nav className="mt-12 flex flex-col gap-4 p-8">
          {/* <a href="#" className="hover:underline">
            หน้าแรก
          </a> */}
          <Link
            to="/profile"
            className="text-[#21b3af] bg-white text-md hover:text-[#ffe066] transition hover:scale-105"
          >
            ข้อมูลส่วนตัว
          </Link>
          <a href="#" className="hover:underline">
            ประวัติบิลของคุณ
          </a>
          <a href="#" className="hover:underline">
            ติดต่อ
          </a>
        </nav>
      </div>
    </div>
  );
}

export default MainNav;
