import { Trash2, UserPlus, UserMinus, Crown } from "lucide-react";
import { swalAlertConfirm } from "../../utils/swalAlert";
import { toast } from "react-toastify";

const users = [
  { id: 1, username: "1", role: "owner" },
  { id: 2, username: "Allie", role: "member" },
  { id: 3, username: "Ploy", role: "member" },
  { id: 4, username: "Gao", role: "member" },
  { id: 5, username: "Dew", role: "member" },
  { id: 6, username: "Auu", role: "member" },
];

function Management({ isOwner = true }) {
  const handleDeleteMember = () => {
    swalAlertConfirm(
      "Delete Member",
      "Are you sure you want to delete this user?"
    ).then((result) => {
      if (result.isConfirmed) {
        toast.success("ลบสมาชิกในกลุ่มแล้ว");
      }
    });
  };

  return (
    <div className>
      <h1 className="text-2xl font-bold text-[#8CBEB2] mb-6">
        Manage your group
      </h1>

      {/* เชิญสมาชิก */}
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="text-[#8CBEB2]" />
        <input
          type="text"
          placeholder="Invite by user ID"
          className="border border-[#8CBEB2] rounded-lg px-3 py-1 focus:outline-none w-52"
        />
        <button className="bg-[#F3B761] text-[#5C4B51] px-4 py-1 rounded-xl font-semibold hover:bg-[#ffe066] transition">
          Invite
        </button>
      </div>

      {/* รายชื่อสมาชิก */}
      <div className="mb-6">
        <div className="font-semibold text-[#5C4B51] mb-2">Group Members</div>
        <ul className="flex flex-col gap-3">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between border-1 border-[#c6e7df] rounded-lg px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {/* Avatar mockup */}
                <div className="w-8 h-8 bg-[#8CBEB2] rounded-full flex items-center justify-center text-white font-bold">
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-[#5C4B51]">{u.username}</span>
                {u.role === "owner" && (
                  <span className="ml-2 text-xs flex items-center text-[#F3B562] font-bold">
                    <Crown className="w-4 h-4 mr-1" /> Owner
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {/* เจ้าของลบได้ */}
                {isOwner && u.role !== "owner" && (
                  <button
                    className="text-[#F06060] hover:bg-rose-100 p-1 rounded transition"
                    onClick={handleDeleteMember}
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
            // onClick={}
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
