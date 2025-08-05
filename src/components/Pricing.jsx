import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const hldClick = (plan) => {
    if (plan === "Free") {
      navigate("/peeps");
    } else {
      navigate("/payment", { state: { plan: plan } });
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl mb-15 text-[#5C4B51] tracking-wide">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {/* Free */}
        <div className="rounded-2xl bg-white shadow-xl flex flex-col items-center p-8 border-1 border-[#F3B562] h-[330px] transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#5C4B51]">Free</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#F3B562]">
            Free
          </div>
          <ul className="mb-6 text-sm text-[#5C4B51] text-center space-y-2">
            <li>Up to 20 members per group</li>
            <li>Basic chat features</li>
            <li>Community support</li>
          </ul>
          <button onClick={()=>hldClick("Free")} className="bg-[#F3B562] text-[#FFFFFF] font-semibold px-6 py-2 rounded-lg hover:bg-[#8ca317] transition-all cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Standard */}
        <div className="rounded-2xl bg-white shadow-2xl flex flex-col items-center p-8 border-4 border-[#8CBEB2] h-[330px] scale-105 transition-all duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#5C4B51]">Standard</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#8CBEB2] ">
            $4.99 <span className="text-lg font-normal">/mo</span>
          </div>
          <ul className="mb-6 text-sm text-[#5C4B51] text-center space-y-2">
            <li>Up to 100 members per group</li>
            <li>Advanced chat management</li>
            <li>Priority support</li>
          </ul>
          <button onClick={()=>hldClick("Standard")} className="bg-[#8CBEB2] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#bee8b0] transition-all cursor-pointer">
            Choose Standard
          </button>
        </div>

        {/* Premium */}
        <div className="rounded-2xl bg-white shadow-xl flex flex-col items-center p-8 border-2 border-[#F3B562] h-[330px] transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#5C4B51]">Premium</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#F3B562]">
            $12.99 <span className="text-lg font-normal">/mo</span>
          </div>
          <ul className="mb-6 text-sm text-[#5C4B51] text-center space-y-2">
            <li>Unlimited group members</li>
            <li>Full data management & analytics</li>
            <li>Best for businesses & organizations</li>
          </ul>
          <button onClick={()=>hldClick("Premium")} className="bg-[#F3B562] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#c8a403] transition-all cursor-pointer">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
