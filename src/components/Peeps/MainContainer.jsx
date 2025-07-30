import { useParams } from "react-router-dom";
import ChatSocket from "./ChatSocket";
import Appointment from "./Appointment";
import DebtSum from "../DebtSummaryPage/DebtSummary";

function MainContainer() {
  const { menu } = useParams(); 

  let Content;
  if (!menu || menu === "chat") Content = <ChatSocket />;
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
