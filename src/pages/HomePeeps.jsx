import FloatingShapes from "../components/LandingPage/FloatingShapes";
import SideBarGroup from "../components/Peeps/GroupSideBar";
import MainContainer from "../components/Peeps/MainContainer";

function HomePeeps () {
  return (
    <div>
        <FloatingShapes/>
    <div className="flex mx-auto w-4/5 mt-20 z-10 min-h-[calc(100vh-80px)]">
      <SideBarGroup />
      <MainContainer/>
    </div>
    </div>
  );
}

export default HomePeeps;
