import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SideBarGroup() {
  const params = useParams();
  const navigate = useNavigate();
  const handleChangeGroup = (groupId) => {
    navigate(`/peeps/${groupId}`);
  };

  return (
    <div className="p-4 not-even:w-[200px] bg-amber-50">
      <div>Create group</div>
      <div>group name</div>
    </div>
  );
}

export default SideBarGroup;
