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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EBBF] py-12">
      <h1 className="text-5xl font-extrabold mb-10 text-[#5C4B51] tracking-wide">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {/* Free */}
        <div className="rounded-2xl bg-white shadow-xl flex flex-col items-center p-8 border-2 border-[#bee8b0] h-[330px] transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#8ca317]">Free</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#258178]">
            Free
          </div>
          <ul className="mb-6 text-sm text-[#594940] text-center space-y-2">
            <li>Up to 20 members per group</li>
            <li>Basic chat features</li>
            <li>Community support</li>
          </ul>
          <button onClick={()=>hldClick("Free")} className="bg-[#bee8b0] text-[#5C4B51] font-semibold px-6 py-2 rounded-lg hover:bg-[#8ca317] transition-all cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Standard */}
        <div className="rounded-2xl bg-white shadow-2xl flex flex-col items-center p-8 border-4 border-[#8ca317] h-[330px] scale-105 transition-all duration-200 hover:scale-110 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#5C4B51]">Standard</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#258178] ">
            $4.99 <span className="text-lg font-normal">/mo</span>
          </div>
          <ul className="mb-6 text-sm text-[#594940] text-center space-y-2">
            <li>Up to 100 members per group</li>
            <li>Advanced chat management</li>
            <li>Priority support</li>
          </ul>
          <button onClick={()=>hldClick("Standard")} className="bg-[#8ca317] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#bee8b0] transition-all cursor-pointer">
            Choose Standard
          </button>
        </div>

        {/* Premium */}
        <div className="rounded-2xl bg-white shadow-xl flex flex-col items-center p-8 border-2 border-[#f6e273] h-[330px] transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2 text-[#c8a403]">Premium</h2>
          <div className="text-4xl font-extrabold mb-4 text-[#eab308]">
            $12.99 <span className="text-lg font-normal">/mo</span>
          </div>
          <ul className="mb-6 text-sm text-[#594940] text-center space-y-2">
            <li>Unlimited group members</li>
            <li>Full data management & analytics</li>
            <li>Best for businesses & organizations</li>
          </ul>
          <button onClick={()=>hldClick("Premium")} className="bg-[#eab308] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#c8a403] transition-all cursor-pointer">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
