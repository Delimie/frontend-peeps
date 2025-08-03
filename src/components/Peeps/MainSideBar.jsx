import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { UserPlus } from "lucide-react";
import useGroupStore from "../../stores/groupStore";
import useChannelStore from "../../stores/channelStore";

function MainSideBar() {
  const { groupId, channelId } = useParams();
  const navigate = useNavigate();
  const currentGroup = groupId
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userIdInput, setUserIdInput] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");

  //store
  const groupUsers = useGroupStore((state) => state.groupUsers);
  const getUsersInGroup = useGroupStore((state) => state.getUsersInGroup);


  // Not attaching channels yet
  const channels = useChannelStore((state) => state.channels);
  const createChannel = useChannelStore((state) => state.createChannel);
  const getChannelByGroupId = useChannelStore((state) => state.getChannelByGroupId);
  const updateChannel = useChannelStore((state) => state.updateChannel);
  const deleteChannel = useChannelStore((state) => state.deleteChannel);

  const channelList = useMemo(() => {
    const listOutChannel = channels.find(el => el.groupId === Number(groupId));
    return listOutChannel?.channelList ?? [];
  }, [channels,groupId]);
  const currentChannel = channelId || channelList[0].channelId;

  const memberList = useMemo(()=>{
   return [{ name: "Allie", avatar: "./mockProfilePic2.jpg" },
    { name: "Auu", avatar: "./mockProfilePic3.jpg" },
    { name: "Dew", avatar: "./mockProfilePic1.jpg" },
    { name: "Gao", avatar: "./mockProfilePic2.jpg" },
    { name: "1", avatar: "./mockProfilePic2.jpg" },
    { name: "Ploy", avatar: "./mockProfilePic2.jpg" },]
  },[])

  const handleOpenMembers = async () => {
    setIsMemberOpen((v) => !v);
    if (!isMemberOpen && currentGroup) {
      await getUsersInGroup(currentGroup);
    }
  };

  const handleChangeChannel = (chId) => {
    if (!currentGroup) return;
    console.log('navigate');
    navigate(`/peeps/${currentGroup}/${chId}`);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    alert("Added user: " + userIdInput);
    setIsAddModalOpen(false);
    setUserIdInput("");
  };

  useEffect(() => {
    console.log('run find channels');
    // getChannelByGroupId(groupId);
  }, [groupId]);

  return (
    <div className="bg-white flex flex-col gap-6 py-6 mt-4 mb-4 px-4 w-[220px] min-h-full shadow-lg rounded-l-3xl">
      <div>
        <h2 className="text-lg font-bold text-[#5C4B51] mb-1">Group Name</h2>

        {/* Member Card Dropdown */}
        <div className="mb-3">
          <button
            className="w-full flex items-center justify-between bg-[#F2EBBF] px-3 py-2 rounded-xl shadow font-semibold text-[#5C4B51] hover:bg-[#FFE066] transition"
            onClick={handleOpenMembers}
          >
            <span>Members</span>
            <span
              className={`transition-transform ${isMemberOpen ? "rotate-90" : ""
                }`}
            >
              🧀
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
          <button
            className="text-[#8CBEB2] text-xs hover:underline"
            onClick={() => setIsAddChannelModalOpen(true)}
          >
            + Add
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {channelList.map((ch) => (
            <button
              key={ch.channelId}
              onClick={() => handleChangeChannel(ch.channelId)}
              className={`px-3 py-2 rounded-xl text-left font-medium  flex justify-between items-center
      ${currentChannel === ch.channelId
                  ? "bg-[#8CBEB2] text-white shadow"
                  : "text-[#5C4B51] hover:bg-[#F2EBBF]"
                }
    `}
            >
              # {ch.name}
              {(ch.unreadNoti>0) && <div className="badge badge-sm bg-red-400 border-none text-white">{ch.unreadNoti>= 100? '+99' : ch.unreadNoti}</div>}
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
                onClick={() => {
                  setIsAddModalOpen(false);
                  addUserToGroup(groupId, userIdInput);
                  setUserIdInput("");
                }}
                disabled={!userIdInput.trim()}
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Modal
        open={isAddChannelModalOpen}
        onClose={() => setIsAddChannelModalOpen(false)}
      >
        <h2 className="text-xl font-bold text-[#5C4B51] mb-5">Add Channel</h2>
        <input
          type="text"
          placeholder="Enter channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-[#F7F3D7] border-none outline-none placeholder:text-[#B7A969] text-[#5C4B51] font-medium"
        />
        <button
          className="w-full rounded-full px-5 py-2 bg-[#8CBEB2] text-white font-semibold text-lg shadow hover:brightness-105 transition disabled:bg-gray-300"
          disabled={!channelName.trim()}
          onClick={() => {
            setIsAddChannelModalOpen(false);
            createChannel({ name: channelName, type: "TEXT", groupId: groupId })
            setChannelName("");
          }}
        >
          Add
        </button>
      </Modal>
    </div>
  );
}

export default MainSideBar;
