import GoalPic from "./GoalPic";
import GoalSaving from "./GoalSaving";
import Rank from "./Rank";

function RightSide() {
  return (
    <div className="h-6/7 w-2/5 flex flex-col min-w-[600px] justify-between">
      <div className="h-7/15 w-full flex justify-between">
        <GoalPic />
        <Rank />
      </div>
      <GoalSaving />
    </div>
  );
}
export default RightSide;
