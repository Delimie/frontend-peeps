import { useEffect } from "react";
import FloatingShapes from "../components/LandingPage/FloatingShapes";
import SideBarGroup from "../components/Peeps/GroupSideBar";
import MainContainer from "../components/Peeps/MainContainer";
import useGroupStore from "../stores/groupStore";
import { socket } from "../socket/socket";
import Footer from "../components/Footer";

function HomePeeps() {

  const { getMyGroups } = useGroupStore();
  useEffect(() => {
    getMyGroups();
  }, []);

  // Connect Socket
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
    <div className="flex mx-auto w-4/5 mt-20 z-10 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainContainer />
    </div>
    </div>
  );
}

export default HomePeeps;
