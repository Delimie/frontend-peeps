import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";

const channelList = [
  { id: "chat", name: "General" },
  { id: "channel2", name: "คุยเล่น" },
  { id: "channel3", name: "นัดเที่ยว" },
];

function MainSideBar() {
  const params = useParams();
  const navigate = useNavigate();
  const currentGroup = params.groupId;
  const currentChannel = params.menu || channelList[0].id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userIdInput, setUserIdInput] = useState("");

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
        <div className="text-xs text-[#8CBEB2] mb-4">Test</div>
        <button
          className="bg-[#8CBEB2] text-white px-2 py-1 rounded hover:bg-[#FFE066] text-xs"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Member
        </button>
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
        <button className="hover:text-[#8CBEB2] text-left text-[#5C4B51]">
          Group's Bill
        </button>
        <button className="hover:text-[#8CBEB2] text-left text-[#5C4B51]">
          Appointment
        </button>
        <button className="hover:text-[#8CBEB2] text-left text-[#5C4B51]">
          Manage Members
        </button>
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
