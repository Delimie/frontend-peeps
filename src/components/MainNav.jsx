import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, UserIcon } from "../assets/icon";
import useAuthStore from "../stores/authStore";
import { LogIn } from "lucide-react";

function MainNav() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const NavBarStyle =
    "text-lg font-medium hover:text-[#de9227] transition hover:scale-105";

  const user = useAuthStore((state) => state.user); // <<< state จาก store
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full grid grid-cols-3 items-center bg-[#F2EBBF] px-8 py-2 h-20 z-50">
      <div className="flex gap-2 items-center">
        <Link to="/" className="font-extrabold tracking-wider text-2xl">
          <span className="text-[#ef6060]">
            P
            <span className="text-[#e09935]">
              E<span className="text-[#85b5b5]">E</span>
            </span>
            PS!
          </span>
        </Link>
      </div>

      <div className="hidden md:flex justify-between items-center gap-6">
        <Link to="/" className={NavBarStyle}>
          Home
        </Link>
        <Link to="/peeps" className={NavBarStyle}>
          Peeps!
        </Link>
          <img src="./Peeps_Logo.png" className="w-12" />
        <Link to="/pricing" className={NavBarStyle}>
          Pricing
        </Link>
        <Link to="/about" className={NavBarStyle}>
          About
        </Link>
        <div
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {/* <button
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
          )} */}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          className="px-2 py-1 rounded-md cursor-pointer flex items-end"
          onClick={() => setOpen(true)}
        >
          <span className="text-white font-bold">
            <HamburgerIcon />
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
          {!user ? (
            <>
              <Link
                to="/login"
                className=" bg-white text-md hover:text-[#ffe066] transition hover:scale-105"
              >
                LOG IN
              </Link>
              <Link
                to="/register"
                className=" bg-white text-md hover:text-[#ffe066] transition hover:scale-105"
              >
                REGISTER
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/Overview"
                className=" bg-white text-md hover:text-[#de9227] transition hover:scale-105"
                onClick={() => setOpen(false)}
              >
                Overview
              </Link>
              <a
                href="#"
                className=" bg-white text-md hover:text-[#de9227] transition hover:scale-105"
              >
                Transactions
              </a>
              <Link
                to="/profile"
                className=" bg-white text-md hover:text-[#de9227] transition hover:scale-105"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <a
                href="#"
                className=" bg-white text-md hover:text-[#de9227] transition hover:scale-105"
              >
                Help & FAQ
              </a>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/login");
                }}
                className="text-left bg-white text-md hover:text-[#de9227] transition hover:scale-105"
              >
                <span className="flex gap-3"><LogIn size={22}/>Logout </span>
              </button>
            </>
          )} 
        </nav>
      </div>
    </div>
  );
}

export default MainNav;
