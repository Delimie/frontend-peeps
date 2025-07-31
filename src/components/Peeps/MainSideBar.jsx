import React, { useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { UserPlus } from "lucide-react";

const channelList = [
  { id: "chat", name: "General" },
  { id: "channel2", name: "คุยเล่น" },
  { id: "channel3", name: "นัดเที่ยว" },
];

const memberList = [
  { name: "Allie", avatar: "./mockProfilePic2.jpg" },
  { name: "Auu", avatar: "./mockProfilePic3.jpg" },
  { name: "Dew", avatar: "./mockProfilePic1.jpg" },
  { name: "Gao", avatar: "./mockProfilePic2.jpg" },
  { name: "1", avatar: "./mockProfilePic2.jpg" },
  { name: "Ploy", avatar: "./mockProfilePic2.jpg" },
];

function MainSideBar() {
  const params = useParams();
  const navigate = useNavigate();
  const currentGroup = params.groupId;
  const currentChannel = params.menu || channelList[0].id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userIdInput, setUserIdInput] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false);


  const handleChangeChannel = (chId) => {
    if (!currentGroup) return;
    navigate(`/peeps/${currentGroup}/${chId}`);
  };

  //ไว้ค่อยเชื่อมหลังบ้านนะ
  const handleAddMember = (e) => {
    e.preventDefault();
    alert("Added user: " + userIdInput);
    setIsAddModalOpen(false);
    setUserIdInput("");
  };

  return (
    <div className="bg-white flex flex-col gap-6 py-6 mt-4 mb-4 px-4 w-[220px] min-h-full shadow-lg rounded-l-3xl">
      <div>
        <h2 className="text-lg font-bold text-[#5C4B51] mb-1">Group Name</h2>

           {/* Member Card Dropdown */}
      <div className="mb-3">
        <button
          className="w-full flex items-center justify-between bg-[#F2EBBF] px-3 py-2 rounded-xl shadow font-semibold text-[#5C4B51] hover:bg-[#FFE066] transition"
          onClick={() => setIsMemberOpen((v) => !v)}
        >
          <span>Members</span>
          <span
            className={`transition-transform ${
              isMemberOpen ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>
        {isMemberOpen && (
          <div className="bg-white rounded-xl mt-2 px-2 py-2 shadow-inner border border-[#8CBEB2] flex flex-col gap-2">
            {memberList.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-2 py-1 hover:bg-[#F2EBBF] rounded-lg transition"
              >
                <span className="text-sm text-[#5C4B51] itim">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
        <div className="flex gap-2">
          <UserPlus className="text-[#8CBEB2]" />
          <button
            className="bg-[#8CBEB2] text-white px-2 py-1 rounded hover:bg-[#FFE066] text-sm"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Member
          </button>
        </div>
      </div>

   

      {/* Channel list */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#5C4B51] font-semibold">Channels</span>
          <button className="text-[#8CBEB2] text-xs hover:underline">
            + Add
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {channelList.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleChangeChannel(ch.id)}
              className={`px-3 py-2 rounded-xl text-left font-medium
      ${
        currentChannel === ch.id
          ? "bg-[#8CBEB2] text-white shadow"
          : "text-[#5C4B51] hover:bg-[#F2EBBF]"
      }
    `}
            >
              # {ch.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1"></div>
      {/* Group functions */}
      <div className="mt-8 flex flex-col justify-end gap-2 text-md">
        <NavLink
          to={`/peeps/${currentGroup}/bill`}
          className={({ isActive }) =>
            isActive
              ? "text-[#8CBEB2] font-bold"
              : "text-[#5C4B51] hover:text-[#8CBEB2]"
          }
        >
          Group's Bill
        </NavLink>
        <button className="hover:text-[#8CBEB2] text-left text-[#5C4B51]">
          Appointment
        </button>
        <NavLink
          to={`/peeps/${currentGroup}/management`}
          className={({ isActive }) =>
            isActive
              ? "text-[#8CBEB2] font-bold"
              : "text-[#5C4B51] hover:text-[#8CBEB2]"
          }
        >
          Management
        </NavLink>
        <button className="hover:text-[#ffffff] text-center text-[#5C4B51] bg-[#F3B562] px-2 py-2 text-sm font-semibold rounded-md">
          Leave Group
        </button>
      </div>

      {isAddModalOpen && (
        <Modal
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setUserIdInput("");
          }}
        >
          <h2 className="text-xl font-semibold text-[#5C4B51] mb-2 text-center">
            Add Member
          </h2>
          <form onSubmit={handleAddMember} className="flex flex-col gap-3">
            <input
              type="text"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
              placeholder="Enter user ID"
              className="w-full border border-[#8CBEB2] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#8CBEB2]"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setUserIdInput("");
                }}
                className="text-[#8CBEB2] hover:text-[#F3B562] px-3 py-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                disabled={!userIdInput.trim()}
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MainSideBar;
