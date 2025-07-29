import { ChevronDown, Plus, SendHorizontal, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddUserForm from "../components/AddUserForm";
import useGroupStore from "../stores/groupStore";
import useAuthStore from "../stores/authStore";

function TestPeeps() {
  // Zustand Store
  const {
    groups,
    currentGroup,
    groupUsers,
    getUsersInGroup,
    getGroupById,
    createGroup,
    addUserToGroup,
    removeUserFromGroup,
    setCurrentGroup
  } = useGroupStore();

  // local state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const group = useGroupStore((state)=> state.groups)
  const user = useAuthStore((state)=> state.user)

  console.log(user)
  console.log(group)

  // เมื่อเลือกกลุ่มปัจจุบัน ให้โหลดสมาชิกในกลุ่ม
  useEffect(() => {
    if (currentGroup?.id) getUsersInGroup(currentGroup.id);
  }, [currentGroup]);

  // สร้างกลุ่มใหม่
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    await createGroup({ name: newGroupName }, user.id);
    setNewGroupName("");
    setIsCreateModalOpen(false);
  };

  // เลือกกลุ่ม
  const handleSelectGroup = async (group) => {
    setCurrentGroup(group);
    await getGroupById(group.id);
    // getUsersInGroup(group.id) จะ trigger ใน useEffect
  };

  // เพิ่ม user
  const handleAddUser = async () => {
    if (!currentGroup?.id || !newUserId.trim()) return;
    await addUserToGroup(currentGroup.id, newUserId);
    setNewUserId("");
  };

  // ลบ user
  const handleRemoveUser = async (userId) => {
    if (!currentGroup?.id) return;
    await removeUserFromGroup(currentGroup.id, userId);
  };

  return (
    <div className="min-h-screen bg-[#F2EBBF] flex justify-center pt-20 pb-20">
      <div className="flex items-center w-2/3 gap-5">
        {/* Sidebar กลุ่ม */}
        <div className="w-1/4 h-[80vh] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Groups</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1 text-green-700 hover:text-green-900 text-sm"
            >
              <Plus className="h-4" />
              New Group
            </button>
          </div>
          {/* รายชื่อ group */}
          <div className="space-y-2">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                  currentGroup?.id === group.id
                    ? "bg-[#8CBEB2] text-white"
                    : "hover:bg-[#F3B562] text-[#8CBEB2]"
                }`}
                onClick={() => handleSelectGroup(group)}
              >
                <span>{group.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Create Group */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-semibold mb-4 text-center">
                Create New Group
              </h2>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full border p-2 rounded mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-[#8CBEB2] hover:text-[#F3B562]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* กล่องแสดงสมาชิกในกลุ่ม */}
        <div className="bg-white w-3/4 h-[80vh] rounded-r-3xl p-6 flex flex-col">
          <h2 className="font-semibold text-[#8CBEB2] text-xl mb-4">
            {currentGroup?.name
              ? `Members in "${currentGroup.name}"`
              : "เลือกกลุ่มเพื่อดูสมาชิก"}
          </h2>
          {currentGroup && (
            <>
              {/* เพิ่ม User */}
              <form
                className="flex gap-2 mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddUser();
                }}
              >
                <input
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  placeholder="User ID"
                  className="border px-2 py-1 rounded"
                />
                <button
                  type="submit"
                  className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                >
                  Add User
                </button>
              </form>
              {/* List Users */}
              <div className="space-y-2">
                {groupUsers.length === 0 ? (
                  <p className="text-gray-400">No member</p>
                ) : (
                  groupUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between bg-[#F3B562] text-[#5C4B51] px-3 py-1 rounded"
                    >
                      <span>{user.username || user.id}</span>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-[#F06060] hover:text-red-700"
                      >
                        <Trash2 className="h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default TestPeeps;
