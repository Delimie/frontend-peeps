import { X } from "lucide-react";
import { useState } from "react";

function DebtSummary() {
  const [isSelectRecipientModalOpen, setIsSelectRecipientModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const debts = [
    { name: "1", toPay: 50, toReceive: 0, avatar: "./mockProfilePic1.jpg" },
    {
      name: "Allie",
      toPay: 0,
      toReceive: 150,
      avatar: "./mockProfilePic2.jpg",
    },
    { name: "Auu", toPay: 127, toReceive: 0, avatar: "./mockProfilePic3.jpg" },
    { name: "Dew", toPay: 0, toReceive: 0, avatar: "./mockProfilePic1.jpg" },
    { name: "Gao", toPay: 0, toReceive: 150, avatar: "./mockProfilePic2.jpg" },
  ];

  const ranks = [
    { name: "Gao", gold: 4, silver: 3, bronze: 0 },
    { name: "Ploy", gold: 3, silver: 3, bronze: 0 },
    { name: "Dew", gold: 1, silver: 2, bronze: 1 },
  ];

  return (
    <div className="h-screen w-full bg-[#F2EBBF] flex gap-10 justify-center pt-20 pb-20">
      {/* แถบซ้าย Debt Summary */}
      <div className="bg-white h-6/7 w-2/5 min-w-[570px] rounded-4xl shadow-[5px_5px_5px_1px_rgba(0,_0,_0,_0.1)] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl pt-8 pl-10">Debt Summary</h1>
          <div className="pt-8 pr-14">
            <button
              onClick={() => setIsSelectRecipientModalOpen(true)}
              className="itim text-3xl text-white bg-[#F06060] px-10 p-3 rounded-4xl cursor-pointer hover:bg-[#F3B562] transition-colors duration-300"
            >
              Pay Now!
            </button>
          </div>
        </div>

        {/* Header columns */}
        <div className="grid grid-cols-[1fr_2fr_2fr_2fr] text-sm text-[#5C4B51] font-semibold mb-3 px-2 pt-10 mx-10">
          <div></div>
          <div></div>
          <div className="text-center text-2xl itim text-[#5C4B51]">
            <h2>To Pay</h2>
          </div>
          <div className="text-center text-2xl itim text-[#5C4B51]">
            <h2>To Receive</h2>
          </div>
        </div>

        {/* รายการแต่ละคน */}
        {debts.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_2fr_2fr] items-center gap-2 mb-4 px-2 mx-10"
          >
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img src={item.avatar} alt={item.name} />
            </div>
            <span className="text-[#5C4B51] font-medium text-xl itim">
              {item.name}
            </span>
            <span
              className={`text-center font-bold text-xl itim ${
                item.toPay > 0 ? "text-[#F06060]" : "text-gray-400"
              }`}
            >
              {item.toPay}
            </span>
            <span
              className={`text-center font-bold text-xl itim ${
                item.toReceive > 0 ? "text-[#8CBEB2]" : "text-gray-400"
              }`}
            >
              {item.toReceive}
            </span>
          </div>
        ))}
      </div>

      {/* รวมด้านขวา */}
      <div className="h-6/7 w-2/5 flex flex-col justify-between">
        {/* แถบขวาบน */}
        <div className="h-7/15 w-full flex justify-between">
          {/* บอร์ดแปะรูป */}
          <div className="bg-white h-full w-7/15 min-w-[250px] rounded-4xl shadow-[5px_5px_5px_1px_rgba(0,_0,_0,_0.1)]">
            <img
              src="./osakaCastle.jpg"
              alt="Osaka Castle"
              className="h-full w-full object-cover rounded-4xl"
            />
          </div>

          {/* บอร์ดจัดอันดับ */}
          <div className="bg-white h-full w-7/15 min-w-[250px] rounded-4xl shadow-[5px_5px_5px_1px_rgba(0,_0,_0,_0.1)] overflow-y-auto">
            <h1 className="text-3xl pl-10 pt-8 text-[#5C4B51]">Rank</h1>

            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-sm  items-center gap-5 mb-4 px-2 mx-6">
              <div></div>
              <div></div>
              <img src="./Gold.svg" alt="Gold" />
              <img src="./Silver.svg" alt="Silver" />
              <img src="./Bronze.svg" alt="Bronze" />
            </div>

            {ranks.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-5 mb-4 px-2 mx-6"
              >
                <img src="./Trophy.svg" className="w-8" />
                <span className="itim text-[#5C4B51] font-medium text-2xl">
                  {item.name}
                </span>
                <span
                  className={`itim text-center font-bold text-2xl ${
                    item.gold > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
                  }`}
                >
                  {item.gold}
                </span>

                <span
                  className={`itim text-center font-bold text-2xl ${
                    item.silver > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
                  }`}
                >
                  {item.silver}
                </span>

                <span
                  className={`itim text-center font-bold text-2xl ${
                    item.bronze > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
                  }`}
                >
                  {item.bronze}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* บอร์ดกระปุกออมสิน */}
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

      </div>

      {/* Modal Payment */}

      {isSelectRecipientModalOpen && (
        <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 min-w-[400px] p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setIsSelectRecipientModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <div>
              <h1 className="text-3xl pb-5">Select Recipient</h1>
            </div>

            {/* คนที่ยังไม่จ่าย */}
            {debts
              .filter((item) => item.toPay > 0)
              .map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_2fr_2fr_1fr] items-center gap-2 mb-4 px-2 mx-10"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-[#5C4B51] font-medium text-2xl itim">
                    {item.name}
                  </span>
                  <span className="text-center font-bold text-2xl text-[#F06060] itim">
                    {item.toPay}฿
                  </span>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="px-4 py-1 bg-[#F06060] hover:bg-[#F3B562] text-white rounded-4xl transition"
                  >
                    Pay
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {isSelectRecipientModalOpen && (
        <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 min-w-[400px] p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setIsSelectRecipientModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <div>
              <h1 className="text-3xl pb-5">Select Recipient</h1>
            </div>

            {/* รายการแต่ละคน */}
            {debts
              .filter((item) => item.toPay > 0)
              .map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_2fr_2fr_1fr] items-center gap-2 mb-4 px-2 mx-10"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-[#5C4B51] font-medium text-2xl itim">
                    {item.name}
                  </span>
                  <span className="text-center font-bold text-2xl text-[#F06060] itim">
                    {item.toPay}฿
                  </span>
                  <button
                    onClick={() => {
                      setIsSelectRecipientModalOpen(false);
                      setIsPaymentModalOpen(true);
                    }}
                    className="itim px-4 py-1 bg-[#F06060] hover:bg-[#F3B562] text-white rounded-4xl transition"
                  >
                    Pay
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 min-w-[400px] p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <div>
              <h1 className="text-3xl pb-5">Payment</h1>
            </div>

            <div><p className="text-2xl pb-5 itim">
              Account Details</p></div>

            <div className="flex gap-5 justify-center">

            <button className="itim text-white hover:text-gray-800 px-5 py-1 rounded-4xl bg-[#8CBEB2] hover:bg-[#F2EBBF]">Attach Receipt</button>

            <button
              onClick={() => {
                setIsSelectRecipientModalOpen(true);
                setIsPaymentModalOpen(false);
              }}
              className="itim text-white hover:text-gray-800 px-5 py-1 rounded-4xl bg-[#D9D9D9] hover:bg-[#F2EBBF]"
            >
              Back
            </button>
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
export default DebtSummary;
