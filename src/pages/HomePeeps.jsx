import { useEffect } from "react";
import SideBarGroup from "../components/Peeps/GroupSideBar";
import MainContainer from "../components/Peeps/MainContainer";
import useGroupStore from "../stores/groupStore";

function HomePeeps() {
  
  const { getMyGroups } = useGroupStore();
  useEffect(() => {
    getMyGroups();
  }, []);

  return (
    <div className="flex mx-auto w-4/5 mt-20 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainContainer />
    </div>
  );
}

export default HomePeeps;
