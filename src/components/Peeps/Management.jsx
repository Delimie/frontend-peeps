import { useEffect } from "react";
import { Trash2, UserPlus, UserMinus, Crown } from "lucide-react";
import { swalAlertConfirm } from "../../utils/swalAlert";
import { toast } from "react-toastify";
import useGroupStore from "../../stores/groupStore";

function Management({ isOwner = true }) {
  const groupUsers = useGroupStore((state) => state.groupUsers);
  const currentGroup = useGroupStore((state) => state.currentGroup);
  const getUsersInGroup = useGroupStore((state) => state.getUsersInGroup);
  const addUserToGroup = useGroupStore((state)=>state.addUserToGroup)
  const removeUserFromGroup = useGroupStore((state)=>state.removeUserFromGroup)

  console.log(currentGroup)

  // 1. Fetch users in group (ใช้ groupId จริง)
useEffect(() => {
  getUsersInGroup(7); // สมมติ group id จริง = 7
}, []);

  useEffect(() => {
    console.log("groupUsers: ", getUsersInGroup);
  }, [getUsersInGroup]);

const handleDeleteMember = async (userId) => {
  const result = await swalAlertConfirm(
    "Delete Member",
    "Are you sure you want to delete this user?"
  );
  if (result.isConfirmed) {
    try {
      await removeUserFromGroup(currentGroup, userId);
      toast.success("ลบสมาชิกในกลุ่มแล้ว");
    } catch (err) {
      toast.error("ลบสมาชิกไม่สำเร็จ: " + (err?.response?.data?.message || err.message));
    }
  }
};


  return (
    <div>
      <h1 className="text-2xl font-bold text-[#8CBEB2] mb-6">
        Manage your group
      </h1>

      {/* เชิญสมาชิก */}
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="text-[#8CBEB2]" />
        <input
          type="text"
          placeholder="Invite by username"
          className="border border-[#8CBEB2] rounded-lg px-3 py-1 focus:outline-none w-52"
        />
        <button className="bg-[#F3B761] text-[#5C4B51] px-4 py-1 rounded-xl font-semibold hover:bg-[#ffe066] transition">
          Invite
        </button>
      </div>

      {/* รายชื่อสมาชิก (users จริง) */}
      <div className="mb-6">
        <div className="font-semibold text-[#5C4B51] mb-2">Group Members</div>
        <ul className="flex flex-col gap-3">
          {groupUsers?.length === 0 && (
            <li className="text-gray-400">No members found.</li>
          )}
          {groupUsers?.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between border-1 border-[#c6e7df] rounded-lg px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#8CBEB2] rounded-full flex items-center justify-center text-white font-bold">
                  {(u.name || u.email || "U").charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-[#5C4B51]">{u.name || u.email || "Unknown"}</span>
                {(u.role === "ADMIN" || u.role === "ADMIN") && (
                  <span className="ml-2 text-xs flex items-center text-[#F3B562] font-bold">
                    <Crown className="w-4 h-4 mr-1" /> Owner
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {isOwner && (u.role !== "ADMIN" && u.role !== "ADMIN") && (
                  <button
                    className="text-[#F06060] hover:bg-rose-100 p-1 rounded transition"
                    onClick={() => handleDeleteMember(u.id)}
                  >
                    <UserMinus />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t pt-6">
        {isOwner ? (
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#F06060] text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-500 transition"
            // onClick={...}
          >
            <Trash2 className="mr-1" /> Delete Group
          </button>
        ) : (
          <button className="w-full bg-[#F3B761] text-[#5C4B51] px-5 py-2 rounded-xl font-semibold hover:bg-[#ffe066] transition">
            Leave Group
          </button>
        )}
      </div>
    </div>
  );
}

export default Management;
