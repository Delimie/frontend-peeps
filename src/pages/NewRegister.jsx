import React from "react";
import { DropdownIcon } from "../assets/icon";

function NewRegister() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col mt-10 justify-center items-center bg-[#FFFCFC] w-145 py-10 rounded-xl shadow-[5px_5px_2px_#00000022] gap-5">
        <h1 className="text-3xl text-[#5C4B51] font-medium">Create Account</h1>
        <form className="flex flex-col gap-5">
          <div className="name flex flex-col">
            <label>
              FULLNAME
              <br />
              <input
                className="input w-110 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                type="text"
                placeholder="Enter your name"
              />
            </label>
          </div>

          <div className="email flex flex-col">
            <label>
              EMAIL
              <br />
              <input
                className="input w-110 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                type="text"
                placeholder="Enter your email"
              />
            </label>
          </div>

          <div className="password flex flex-col">
            <label>
              PASSWORD
              <br />
              <input
                className="input w-110 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                type="text"
                placeholder="Enter your password"
              />
            </label>
          </div>

          <div className="confirm flex flex-col">
            <label>
              CONFIRM PASSWORD
              <br />
              <input
                className="input w-110 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                type="text"
                placeholder="Re-enter your password"
              />
            </label>
          </div>

          <div className="phone&birth flex flex-row justify-between">
            <div className="phone flex flex-col">
              <label>
                PHONE NUMBER
                <br />
                <input
                  className="input w-52 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                  type="text"
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            <div className="phone flex flex-col">
              <label>
                BIRTHDAY
                <br />
                <input
                  className="input w-52 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none text-[#795B30]/60"
                  type="date"
                />
              </label>
            </div>
          </div>

          <div className="gender&occupation flex flex-row justify-between">
            <div className="gender flex flex-col">
              <label>
                GENDER
                <br />
                <div className="dropdown flex justify-end h-10 w-52 bg-[#F3B761] rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn border-none bg-transparent shadow-none"
                  >
                    <DropdownIcon />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-[#F2EBBF] w-20 mt-7 py-2 px-2 z-1 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                  >
                    <li>
                      <a>Male</a>
                    </li>
                    <li>
                      <a>Female</a>
                    </li>
                    <li>
                      <a>Others</a>
                    </li>
                  </ul>
                </div>
              </label>
            </div>

            <div>
              <label>
                Occupation
                <select
                  defaultValue="Occupation"
                  className="select bg-[#F3B761] flex justify-end h-10 w-52 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                >
                  <option disabled={true}>-</option>
                  <option>Accountant</option>
                  <option>Actor/Actress</option>
                  <option>Architect</option>
                  <option>Businessman/Businesswoman</option>
                  <option>Designer</option>
                  <option>Driver</option>
                  <option>Doctor</option>
                  <option>Employee</option>
                  <option>Engineer</option>
                  <option>Entrepreneur</option>
                  <option>Freelancer</option>
                  <option>Journalist</option>
                  <option>Lawyer</option>
                  <option>Musician</option>
                  <option>Pilot</option>
                  <option>Police</option>
                  <option>Programmer</option>
                  <option>Salesperson</option>
                  <option>Scientist</option>
                  <option>Security Guard</option>
                  <option>Singer</option>
                  <option>Teacher/Professor</option>
                </select>
              </label>
            </div>

            {/* <div className="occupation flex flex-col">
              <label>
                OCCUPATION
                <br />
                <div className="dropdown dropdown-end flex justify-end h-10 w-52 bg-[#F3B761] rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn border-none bg-transparent shadow-none"
                  >
                    <DropdownIcon />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu  max-h-60 bg-[#F2EBBF] mt-7 p-2 z-1 rounded-lg shadow-[5px_5px_2px_#00000022] focus:outline-none"
                  >
                    <li>
                      <a>Accountant</a>
                    </li>
                    <li>
                      <a>Actor/Actress</a>
                    </li>
                    <li>
                      <a>Architect</a>
                    </li>

                    <li>
                      <a>Businessman/Businesswoman</a>
                    </li>

                    <li>
                      <a>Designer</a>
                    </li>
                    <li>
                      <a>Driver</a>
                    </li>
                    <li>
                      <a>Doctor/Nurse</a>
                    </li>

                    <li>
                      <a>Employee</a>
                    </li>
                    <li>
                      <a>Engineer</a>
                    </li>
                    <li>
                      <a>Entrepreneur</a>
                    </li>

                    <li>
                      <a>Freelancer</a>
                    </li>
                    <li>
                      <a>Journalist</a>
                    </li>
                    <li>
                      <a>Lawyer</a>
                    </li>
                    <li>
                      <a>Musician</a>
                    </li>

                    <li>
                      <a>Pilot</a>
                    </li>
                    <li>
                      <a>Police</a>
                    </li>
                    <li>
                      <a>Programmer</a>
                    </li>

                    <li>
                      <a>Salesperson</a>
                    </li>
                    <li>
                      <a>Scientist</a>
                    </li>
                    <li>
                      <a>Security Guard</a>
                    </li>
                    <li>
                      <a>Singer</a>
                    </li>

                    <li>
                      <a>Teacher/Professor</a>
                    </li>
                  </ul>
                </div>
              </label>
            </div> */}

            {/* <div className="occupation flex flex-col">
              <label>
                OCCUPATION
                <br />
                <div
                  className="dropdown w-52 bg-[#F3B761] py-2 px-2 rounded-lg shadow-[5px_5px_2px_#00000022] text-[#795B30]/60"
                />
              </label>
            </div> */}
          </div>
          <div className="flex justify-center mt-2">
            <button className="flex justify-center items-center bg-[#8CBEB2] w-37 h-10 rounded-2xl shadow-[5px_5px_2px_#00000022] font-medium hover:bg-[#6FA89A] transition hover:scale-105 hover:cursor-pointer">
              Create Account
            </button>
          </div>
          <button className="underline hover:cursor-pointer transition hover:">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRegister;
