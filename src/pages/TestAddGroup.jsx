import React, { useEffect } from "react";
import MainSideBar from "../components/Peeps/MainSideBar";
import ChatSocket from "../components/Peeps/ChatSocket";
import SideBarGroup from "../components/Peeps/GroupSideBar";
import MainContainer from "../components/Peeps/MainContainer";
import { socket } from "../socket/socket";
import { GROUP_ACTION } from "../shared/constants/socket.constant";
import FloatingShapes from "../components/LandingPage/FloatingShapes";

function TestAddGroup() {

    useEffect(() => {
      if (!socket.connected) socket.connect();
  
      socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message, 'Error code :');
        console.log(err);
      });
  
      return () => {
        socket.off('connect_error');  
        socket.disconnect();
      };
    }, []);

  return (
    <div>
      <FloatingShapes/>
    <div className="flex mx-auto w-4/5 mt-20 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainSideBar />
      <MainContainer/>
    </div>
    </div>
  );
}

export default TestAddGroup;
