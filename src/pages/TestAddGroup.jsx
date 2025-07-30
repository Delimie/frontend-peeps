import React from "react";
import MainSideBar from "../components/Peeps/MainSideBar";
import ChatSocket from "../components/Peeps/ChatSocket";
import SideBarGroup from "../components/Peeps/GroupSideBar";

function TestAddGroup() {
  return (
    <div className="flex mx-auto mt-25 w-4/5 bg-amber-100 min-h-screen">
      <SideBarGroup/>
      <MainSideBar/>
      <ChatSocket/>
    </div>
  );
}

export default TestAddGroup;
