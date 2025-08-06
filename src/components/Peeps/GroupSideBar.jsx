import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import Avatar from "../avatar";
import Modal from "../Modal";
import useGroupStore from "../../stores/groupStore";
import useChannelStore from "../../stores/channelStore";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { MessageCircleHeart } from "lucide-react";
import { socket } from "../../socket/socket";
import { GROUP_ACTION } from "../../shared/constants/socket.constant";

function SideBarGroup() {
  const params = useParams();
  const { groupId } = useParams();
  const navigate = useNavigate();

  const currentGroup = Number(params.groupId) // || groupList[0].id;
  const { groups, getMyGroups, loading, error, createGroup } = useGroupStore();
  const token = useAuthStore(state => state.token)
  const { register, handleSubmit, formState, reset } = useForm()
  const { isSubmitting, errors } = formState
  const user = useAuthStore((state) => state.user);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  // const [groupName, setGroupName] = useState("");
  // console.log(getMyGroups)

  const getChannelByGroupId = useChannelStore((state) => state.getChannelByGroupId);

  const channels = useChannelStore(state => state.channels);

  const handleChangeGroup = async (groupId) => {
    await getChannelByGroupId(Number(groupId));
    const firstChannel = (channels.find(el => el.groupId === Number(groupId)))?.channelList[0]?.channelId;
    navigate(`/peeps/${groupId}/${firstChannel}`);
  };

  useEffect(() => {
    getMyGroups();
  }, [groupId]);

  const setUnReadNoti = useGroupStore(state => state.setUnReadNoti);
  const unReadNoti = useGroupStore(state => state.unReadNoti);
  useEffect(() => {
    setUnReadNoti();
  }, [channels]);

  const onSubmit = async (data) => {
    try {
      const resp = await createGroup({ name: data.name });
      const newGroup = resp.group;
      await Swal.fire({
        icon: "success",
        title: "Group Created!",
        text: `Group "${newGroup.name}" has been created successfully.`,
        confirmButtonColor: "#8CBEB2",
      });

      // Emit to join new created group ID
      socket.emit(GROUP_ACTION.GROUP_JOIN, { groupId: newGroup.id });

      await handleChangeGroup(Number(newGroup.id));
      reset();
      setIsCreateGroupModalOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create group. Please try again.",
        confirmButtonColor: "#F3B562",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <Avatar size={120} />
      {/* <span className="mt-5 font-semibold text-lg">Welcome!</span> */}
      <span className="mt-5 font-semibold text-lg">Hello {user.name} !</span>
      <div className="bg-[#fffcee] mt-4 flex flex-col gap-2 py-6 px-3 w-[160px] h-fit rounded-l-2xl">
        <button
          className="mb-2 text-sm bg-[#F3B562] text-[#5C4B51] px-3 py-2 rounded-xl font-semibold hover:bg-[#FFE066] transition"
          onClick={() => setIsCreateGroupModalOpen(true)}
        >
          + Create Group
        </button>
        <div className="flex flex-col">
          <h3 className="w-full text-center mb-2 text-[#5C4B51] font-semibold text-sm bg-[#F7F3D7] py-2 rounded-lg">
            My Groups
          </h3>
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => handleChangeGroup(g.id)}
              className={`px-3 py-2 rounded-lg text-left font-medium overflow-hidden relative  cursor-pointer flex justify-between items-center
      ${currentGroup === g.id.toString()
                  ? "bg-[#8CBEB2] text-white shadow"
                  : "text-[#5C4B51] slide-hover-btn"
                }
    `}
            >
              <span className="flex gap-2">
                {" "}
                <MessageCircleHeart /> {g.name}
              </span>
              {unReadNoti.find(el => el.groupId ===g.id)?.unReadNoti > 0 && <div className="badge badge-sm bg-red-400 border-none text-white">{unReadNoti.find(el => el.groupId ===g.id).unReadNoti}</div>}
            </button>
          ))}
        </div>
        <Modal
          open={isCreateGroupModalOpen}
          onClose={() => setIsCreateGroupModalOpen(false)}
        >
          <button
            onClick={() => setIsCreateGroupModalOpen(false)}
            className="absolute top-3 right-3 text-[#F3B562] hover:text-[#8CBEB2] text-lg"
            style={{ right: 18, top: 12, position: "absolute" }} // ย้ายปุ่มมุมขวาบน
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-[#5C4B51] mb-5">
            Create New Group
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter group name"
              // value={groupName}
              // onChange={(e) => setGroupName(e.target.value)}
              {...register("name", { required: true })}
              className="w-full mb-4 px-3 py-2 rounded-lg bg-[#F7F3D7] border-none outline-none placeholder:text-[#B7A969] text-[#5C4B51] font-medium"
            />
            <button
              className="w-full rounded-full px-5 py-2 bg-[#8CBEB2] text-white font-semibold text-lg shadow hover:brightness-105 transition disabled:bg-gray-300"
              // disabled={!groupName.trim()}
              type="submit"
              disabled={isSubmitting}
            // onClick={() => {
            //   setIsCreateGroupModalOpen(false);
            //   // setGroupName("");
            // }}
            >
              Create
            </button>
          </form>
        </Modal>
        {/* <div>
          <h3 className="font-bold">My Groups</h3>
          {loading && <p>Loading groups...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul>
            {Array.isArray(groups) && groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default SideBarGroup;
