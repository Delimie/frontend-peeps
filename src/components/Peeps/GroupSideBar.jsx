import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import Avatar from "../avatar";
import Modal from "../Modal";
import useGroupStore from "../../stores/groupStore";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

// const groupList = [
//   { id: "g1", name: "Peeps" },
//   { id: "g2", name: "ฮือออ" },
//   { id: "g3", name: "แงงง" },
// ];

function SideBarGroup() {
  const params = useParams();
  const navigate = useNavigate();
  const { groups, getMyGroups, loading, error, createGroup } = useGroupStore();
  const currentGroup = params.groupId || (groups && groups.length > 0 ? groups[0].id : null);
  const token = useAuthStore(state => state.token)
  // const createGroup = useGroupStore(state => state.createGroup)
  const { register, handleSubmit, formState, reset } = useForm()
  const { isSubmitting, errors } = formState
  const user = useAuthStore((state) => state.user);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  // const [groupName, setGroupName] = useState("");
  // console.log(getMyGroups)

  useEffect(() => {
    getMyGroups();
  }, []);

  const handleChangeGroup = (groupId) => {
    navigate(`/peeps/${groupId}`);
  };

  const onSubmit = async (data) => {
    try {
      const resp = await createGroup({ name: data.name });
      const newGroup = resp.group;
      await Swal.fire({
        icon: 'success',
        title: 'Group Created!',
        text: `Group "${newGroup.name}" has been created successfully.`,
        confirmButtonColor: '#8CBEB2'
      });
      navigate(`/peeps/${newGroup.id}`);
      reset();
      setIsCreateGroupModalOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create group. Please try again.',
        confirmButtonColor: '#F3B562'
      });
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <Avatar />
      <span className="mt-5 font-semibold text-lg">HELLO {user.name}!</span>
      <div className="bg-[#fffcee] mt-4 flex flex-col gap-2 py-6 px-3 w-[160px] h-fit rounded-l-2xl">
        <button
          className="mb-2 text-sm bg-[#F3B562] text-[#5C4B51] px-3 py-2 rounded-xl font-semibold hover:bg-[#FFE066] transition"
          onClick={() => setIsCreateGroupModalOpen(true)}
        >
          + Create Group
        </button>
        <div className="flex flex-col">
          <h3 className="w-full text-center text-[#5C4B51] font-semibold text-sm bg-[#F7F3D7] py-2 rounded-lg">
            My Groups
          </h3>
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => handleChangeGroup(g.id)}
              className={`px-3 py-2 rounded-lg text-left font-medium
              ${currentGroup === g.id
                  ? "bg-[#8CBEB2] text-white shadow"
                  : "text-[#5C4B51] hover:bg-[#FFE066]"
                }
            `}
            >
              {g.name}
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
