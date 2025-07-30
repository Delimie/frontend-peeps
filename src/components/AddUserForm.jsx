import { useState } from "react";
import useGroupStore from "../stores/groupStore";

export default function AddUserForm({ groupId }) {
  const addUserToGroup = useGroupStore(state => state.addUserToGroup);
  const [userId, setUserId] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    await addUserToGroup(groupId, userId);
    setUserId("");
    alert("เพิ่มสมาชิกเรียบร้อย");
  };

  return (
    <form onSubmit={handleAddUser}>
      <input
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="User ID"
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}
