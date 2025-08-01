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
  const { groupId, channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId && !channelId) {
      navigate(`/peeps/${groupId}/${channelId}`, { replace: true });
    }
  }, [groupId, channelId, navigate]);


  useEffect(() => {
    if (groupId) {
      socket.emit(GROUP_ACTION.GROUP_JOIN, { groupId });
    }
  }, [groupId])

  if (!groupId) {
    return (
      <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
        <WelcomePeeps />
      </div>
    );
  }

  let Content;
  if (channelId === `chat`) Content = <ChatSocket />;
  else if (channelId === "bill") Content = <DebtSummary />;
  else if (channelId === "appointment") Content = <Appointment />;
  else if (channelId === "management") Content = <Management />;
  else Content = <ChatSocket />;
  
  return (
    <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
      {Content}
    </div>
  );
}

export default MainContainer;
