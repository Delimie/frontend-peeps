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
<<<<<<< HEAD
    if (groupId && !menu) {
      navigate(`/peeps/${groupId}/1`, { replace: true });
    }

  }, [groupId, menu, navigate]);
=======
    if (groupId && !channelId) {
      navigate(`/peeps/${groupId}/${channelId}`, { replace: true });
    }
  }, [groupId, channelId, navigate]);
>>>>>>> dev

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
<<<<<<< HEAD
  if (menu === `225`) Content = <ChatSocket />;
  else if (menu === "bill") Content = <DebtSummary />;
  else if (menu === "appointment") Content = <Appointment />;
  else if (menu === "management") Content = <Management />;
  else Content =  <ChatSocket />;
  
=======
  if (channelId === `chat`) Content = <ChatSocket />;
  else if (channelId === "bill") Content = <DebtSummary />;
  else if (channelId === "appointment") Content = <Appointment />;
  else if (channelId === "management") Content = <Management />;
  else Content = <ChatSocket />;

>>>>>>> dev
  return (
    <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
      {Content}
    </div>
  );
}

export default MainContainer;
