function GoalSaving() {
  return (
    <div className="relative bg-white h-7/15 w-full min-w-[600px] rounded-4xl shadow-[5px_5px_5px_1px_rgba(0,_0,_0,_0.1)] overflow-y-auto">
      {/* Overlay: Coming Soon */}
      <div className="absolute inset-0 bg-[#5C4B51]/70 flex items-center justify-center z-10 rounded-4xl">
        <p className="text-3xl font-bold text-white itim">💰 Coming Soon 💰</p>
      </div>

      <div className="flex flex-col gap-5 opacity-30 pointer-events-none">
        <div>
          <h1 className="text-3xl pt-4 pl-10 pb-3">Goal Savings</h1>
        </div>

        <div className="flex gap-10 px-10 pb-8 justify-around">
          {/* Add New Goal */}
          <div className="flex flex-col items-center">
            <div className="h-25 w-25 bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer">
              <p className="text-4xl font-bold">+</p>
            </div>
          </div>

          {/* Example: HBD Dew */}
          <div className="flex flex-col items-center">
            <div className="h-25 w-25 bg-[#D9D9D9] rounded-full flex items-center justify-center relative">
              <span className="text-s absolute bottom-2 text-[#5C4B51] itim">
                1,200/2,000
              </span>
            </div>
            <p className="mt-2 text-xl font-medium itim">HBD Dew</p>
          </div>

          {/* Example: Osaka 2025 */}
          <div className="flex flex-col items-center">
            <div className="h-25 w-25 bg-[#D9D9D9] rounded-full flex items-center justify-center relative">
              <span className="text-s absolute bottom-2 text-[#5C4B51] itim">
                3,400/5,000
              </span>
            </div>
            <p className="mt-2 text-xl font-medium itim">Osaka 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GoalSaving;
