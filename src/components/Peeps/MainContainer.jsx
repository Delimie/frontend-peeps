import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WelcomePeeps from "./WelcomePeeps";
import ChatSocket from "./ChatSocket";
import Appointment from "./Appointment";
import DebtSum from "../DebtSummaryPage/DebtSummary";

function MainContainer() {
  const { groupId, menu } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId && !menu) {
      navigate(`/peeps/${groupId}/chat`, { replace: true });
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
  if (menu === "chat") Content = <ChatSocket />;
  else if (menu === "groupbill") Content = <DebtSum />;
  else if (menu === "appointment") Content = <Appointment />;
  else Content = <div>Not found</div>;

  return (
    <div className="flex-1 p-6 bg-[#fff] rounded-2xl shadow-lg m-4 flex flex-col border border-[#F2EBBF]">
      {Content}
    </div>
  );
}

export default MainContainer;
