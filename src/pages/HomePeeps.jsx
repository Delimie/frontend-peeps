import { useEffect } from "react";
import SideBarGroup from "../components/Peeps/GroupSideBar";
import MainContainer from "../components/Peeps/MainContainer";
import useGroupStore from "../stores/groupStore";
import { socket } from "../socket/socket";

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
    <div className="flex mx-auto w-4/5 mt-20 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainContainer />
    </div>
  );
}

export default HomePeeps;
