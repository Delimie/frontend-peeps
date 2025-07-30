import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import useAuthStore from "../../stores/authStore";

const groupList = [
  { id: "g1", name: "Peeps" },
  { id: "g2", name: "ฮือออ" },
  { id: "g3", name: "แงงง" },
];

function SideBarGroup() {
  const params = useParams();
  const navigate = useNavigate();
  const currentGroup = params.groupId || groupList[0].id;
  const user = useAuthStore((state)=>state.user)

  const handleChangeGroup = (groupId) => {
    navigate(`/peeps/${groupId}`);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <Avatar className="mb-6"/>
      <p>Hello {user.name}!</p>
    <div className="bg-[#fffcee] mt-4 flex flex-col gap-2 py-6 px-3 w-[160px] h-fit rounded-l-2xl">
      <button className="mb-4 text-sm bg-[#F3B562] text-[#5C4B51] px-3 py-2 rounded-xl font-semibold hover:bg-[#FFE066] transition">
        + Create Group
      </button>
      <div className="flex flex-col">
        {groupList.map((g) => (
          <button
            key={g.id}
            onClick={() => handleChangeGroup(g.id)}
            className={`px-3 py-2 rounded-lg text-left font-medium
              ${
                currentGroup === g.id
                  ? "bg-[#8CBEB2] text-white shadow"
                  : "text-[#5C4B51] hover:bg-[#FFE066]"
              }
            `}
          >
            {g.name}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}

export default SideBarGroup;
