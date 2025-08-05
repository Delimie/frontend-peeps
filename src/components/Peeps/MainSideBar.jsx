import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { Pencil, SquarePen, UserPlus } from "lucide-react";
import useGroupStore from "../../stores/groupStore";
import useChannelStore from "../../stores/channelStore";
import useAuthStore from "../../stores/authStore";
import Swal from "sweetalert2";
import { CHANNEL_ACTION, GROUP_ACTION } from "../../shared/constants/socket.constant";
import { socket } from "../../socket/socket";

function MainSideBar() {
  const { groupId, channelId } = useParams();
  const navigate = useNavigate();

  const currentGroup = groupId;
  // const currentChannel = channelId;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");

  //store
  const currentSelectedGroup = useGroupStore(state => state.currentGroup);
  const setCurrentGroupById = useGroupStore(state => state.setCurrentGroupById);
  const getUsersInGroup = useGroupStore((state) => state.getUsersInGroup);
  const groupUsers = useGroupStore((state) => state.groupUsers);
  const addUserToGroup = useGroupStore((state) => state.addUserToGroup);
  const getAllUsers = useAuthStore((state) => state.getAllUsers);
  const users = useAuthStore((state) => state.users);

  //เพิ่มพวก channel ค่ะ

  const [isEditChannelModalOpen, setIsEditChannelModalOpen] = useState(false);
  const [editingChannelId, setEditingChannelId] = useState(null);
  const [editingChannelName, setEditingChannelName] = useState("");

  useEffect(() => {
    if (!users.length) {
      getAllUsers();
    }
    getUsersInGroup(groupId)
  }, [getAllUsers, users.length, groupId]);

  const {channels, createChannel, getChannelByGroupId, updateChannel, updateChannelsName,deleteChannel, readNotiReset} = useChannelStore();
  // const channels = useChannelStore((state) => state.channels);
  // const createChannel = useChannelStore((state) => state.createChannel);
  // const getChannelByGroupId = useChannelStore((state) => state.getChannelByGroupId);
  // const updateChannel = useChannelStore((state) => state.updateChannel);
  // const deleteChannel = useChannelStore((state) => state.deleteChannel);

  const currentChannel = channelId || channelList[0].channelId;

  const handleOpenMembers = async () => {
    setIsMemberOpen((v) => !v);
    if (!isMemberOpen && currentGroup) {
      await getUsersInGroup(currentGroup);
    }
  };

  const handleChangeChannel = (chId) => {
    if (!currentGroup) return;
    readNotiReset(Number(groupId), Number(chId))
    navigate(`/peeps/${currentGroup}/${chId}`);
  };

  const handleEditChannelName = () => {
    console.log('Change name emit');
    updateChannel(Number(editingChannelId),{name : editingChannelName});
    setIsEditChannelModalOpen(false);
    setEditingChannelId(null);
    setEditingChannelName("");
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!userNameInput.trim() || !currentGroup) return;

    const user = users.find((u) => u.name === userNameInput);
    if (!user) {
      await Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Please enter a valid user name.",
      });
      return;
    }

    try {
      await addUserToGroup(currentGroup, user.id, "USER");
      await getAllUsers();
      await getUsersInGroup(currentGroup);
      await Swal.fire({
        icon: "success",
        title: "User Added!",
        text: `Added user: ${user.name}`,
        timer: 1500,
        showConfirmButton: false,
      });
      setIsAddModalOpen(false);
      setUserNameInput("");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Failed to add user",
        text: error.message || "Something went wrong",
      });
    }
  };

  const channelList = useMemo(() => {
    const listOutChannel = channels.find(el => el.groupId === Number(groupId));
    return listOutChannel?.channelList ?? [];
  }, [channels]);

  //Fetch Channel by Group Id
  useEffect(() => {
    getChannelByGroupId(Number(groupId));
    setCurrentGroupById(Number(groupId));
  }, [groupId]);

  // Listen for user who join the group
  useEffect(() => {

    socket.on(GROUP_ACTION.GROUP_JOIN, (data) => {
      console.log(data.message);
      if (data.user) {
        console.log(data.user);
        useGroupStore.getState().updateGroupUsers(data.user);
      }
    });

    socket.on(GROUP_ACTION.GROUP_LEAVE, (data) => {
      console.log(data.message);
      if (data.user) {
        console.log(data.user);
        useGroupStore.getState().updateGroupUsers(data.user);
      }
    });

    socket.on(CHANNEL_ACTION.CHANNEL_UPDATE, (data) =>{
      // const {message , updatedChannelName} = data;
      console.log(data.message);
      updateChannelsName(data.updatedChannelName);
    });

    return () => {
      socket.off(GROUP_ACTION.GROUP_JOIN);
      socket.off(GROUP_ACTION.GROUP_LEAVE);
      socket.off(CHANNEL_ACTION.CHANNEL_UPDATE);
    }
  }, []);

  return (
    <div className="bg-white flex flex-col gap-6 py-6 mt-4 mb-4 px-4 w-[220px] max-h-[90vh] shadow-lg rounded-l-3xl overflow-y-auto">
      <div>
        <h2 className="text-lg font-bold text-[#5C4B51] mb-1">{currentSelectedGroup?.name || "Group Name"}</h2>

        {/* Member Card Dropdown */}
        <div className="mb-3">
          <button
            className="w-full cursor-pointer flex items-center justify-between bg-[#F2EBBF] px-3 py-2 rounded-xl shadow font-semibold text-[#5C4B51] hover:bg-[#FFE066] transition-all"
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
              {Array.isArray(groupUsers) && groupUsers.length > 0 ? (
                groupUsers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-2 py-1 hover:bg-[#F2EBBF] rounded-lg transition cursor-pointer"
                  >
                    <span className="relative">
                      <img
                        src={member.profileImage}
                        alt="profile"
                        className="rounded-full w-8 h-8 object-cover border border-[#8CBEB2]"
                      />
                      <div aria-label="status" className={`status ${member.onlineStatus === "ONLINE" ? "status-accent" : "status-neutral"} absolute translate-x-1/2 translate-y-1/2 bottom-1/8 right-1/4`}></div>
                    </span>
                    <span className="text-sm text-[#5C4B51] itim">
                      {member.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-[#B7A969] text-sm py-2">
                  No members in this group.
                </div>
              )}
            </div>
          )}

        </div >
        <div className="flex gap-2">
          <UserPlus className="text-[#8CBEB2]" />
          <button
            className="bg-[#8CBEB2] text-white px-2 py-1 rounded hover:bg-[#FFE066] text-sm w-full"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Member
          </button>
        </div>
      </div >

      <hr className="border-gray-300" />

      {/* Channel list */}
      < div >
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
          {
            channelList.map((ch) => (

              <div key={ch.channelId} className="flex items-center gap-2 group">
                <button
                  onClick={() => handleChangeChannel(ch.channelId)}
                  className={`px-3 py-2 rounded-xl text-left font-medium flex-1 flex items-center gap-2 justify-between
          ${currentChannel === ch.channelId
                      ? "bg-[#8CBEB2] text-white shadow"
                      : "text-[#5C4B51] hover:bg-[#F2EBBF]"
                    }
        `}
                >
                  # {ch.name}
                  <span
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // ไม่ให้กดเปลี่ยนแชลแนล
                      setEditingChannelId(ch.channelId);
                      setEditingChannelName(ch.name);
                      setIsEditChannelModalOpen(true);
                    }}
                    title="Edit channel"
                  >
                    <SquarePen size={18} />
                  </span>
                  {(ch.unreadNoti > 0) && <div className="badge badge-sm bg-red-400 border-none text-white">{ch.unreadNoti >= 100 ? '+99' : ch.unreadNoti}</div>}

                </button>
              </div>
            ))
          }
        </div >
      </div >
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

      {
        isAddModalOpen && (
          <Modal
            open={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setUserNameInput("");
            }}
          >
            <h2 className="text-xl font-semibold text-[#5C4B51] mb-2 text-center">
              Add Member
            </h2>
            <form onSubmit={handleAddMember} className="flex flex-col gap-3">
              <input
                type="text"
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
                placeholder="Enter user Name"
                className="w-full border border-[#8CBEB2] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#8CBEB2]"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setUserNameInput("");
                  }}
                  className="text-[#8CBEB2] hover:text-[#F3B562] px-3 py-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                  disabled={!userNameInput.trim()}
                >
                  Add
                </button>
              </div>
            </form>
          </Modal>
        )
      }

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
          onClick={async () => {
            setIsAddChannelModalOpen(false);
            const response = await createChannel({ name: channelName, type: "TEXT", groupId: Number(groupId) });
            setChannelName("");
            // console.log('response is',response,' ',response.id);
            if (response) handleChangeChannel(response.id);
          }}
        >
          Add
        </button>
      </Modal>

      <Modal
        open={isEditChannelModalOpen}
        onClose={() => {
          setIsEditChannelModalOpen(false);
          setEditingChannelId(null);
          setEditingChannelName("");
        }}
      >
        <h2 className="text-xl font-bold text-[#5C4B51] mb-5">Edit Channel</h2>
        <input
          type="text"
          placeholder="Change channel name"
          value={editingChannelName}
          onChange={(e) => setEditingChannelName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-[#F7F3D7] border-none outline-none placeholder:text-[#B7A969] text-[#5C4B51] font-medium"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            className="flex-1 rounded-full px-5 py-2 bg-[#8CBEB2] text-white font-semibold text-lg shadow hover:brightness-105 transition disabled:bg-gray-300"
            disabled={!editingChannelName.trim()}
            onClick={handleEditChannelName}
          >
            Save
          </button>
          <button
            className="flex-1 rounded-full px-5 py-2 bg-[#F3B562] text-white font-semibold text-lg shadow hover:brightness-105 transition"
            onClick={() => {
              setIsEditChannelModalOpen(false);
              setEditingChannelId(null);
              setEditingChannelName("");
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div >
  );
}

export default MainSideBar;
