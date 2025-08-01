import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WelcomePeeps from "./WelcomePeeps";
import ChatSocket from "./ChatSocket";
import Appointment from "./Appointment";
import { CHANNEL_ACTION, GROUP_ACTION } from "../../shared/constants/socket.constant";
import { socket } from "../../socket/socket";
import Management from "./Management";
import DebtSummary from "./DebtSummary";

function MainContainer() {
  const { groupId, menu } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId && !menu) {
      navigate(`/peeps/${groupId}/chat`, { replace: true });
    }

    if (groupId) {
      socket.emit(GROUP_ACTION.GROUP_JOIN, { groupId });
    }

    if(menu){
      socket.emit(CHANNEL_ACTION.CHANNEL_JOIN, {channelId : menu});
    }

  }, [groupId, menu, navigate]);

  if (!groupId) {
    return (
      <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
        <WelcomePeeps />
      </div>
    );
  }

  // มี groupId + menu
  let Content;
  if (menu === `chat`) Content = <ChatSocket />;
  else if (menu === "bill") Content = <DebtSummary />;
  else if (menu === "appointment") Content = <Appointment />;
  else if (menu === "management") Content = <Management />;
  else Content = <div>Not found</div>;

  return (
    <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
      {Content}
    </div>
  );
}

export default MainContainer;
