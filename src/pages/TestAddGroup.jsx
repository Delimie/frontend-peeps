import React from "react";
import MainSideBar from "../components/Peeps/MainSideBar";
import ChatSocket from "../components/Peeps/ChatSocket";
import SideBarGroup from "../components/Peeps/GroupSideBar";

function TestAddGroup() {
  return (
    <div className="flex mx-auto w-4/5 mt-20 bg-amber-100 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainSideBar />
      <ChatSocket />
    </div>
  );
}

export default TestAddGroup;
