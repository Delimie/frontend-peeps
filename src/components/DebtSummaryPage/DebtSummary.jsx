import { X } from "lucide-react";
import { useState } from "react";

function DebtSum() {
  const [isSelectRecipientModalOpen, setIsSelectRecipientModalOpen] = useState(false);
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

  return (
    <div>
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

            <div>
              <p className="text-2xl pb-5 itim">Account Details</p>
            </div>

            <div className="flex gap-5 justify-center">
              <button className="itim text-white hover:text-gray-800 px-5 py-1 rounded-4xl bg-[#8CBEB2] hover:bg-[#F2EBBF]">
                Attach Receipt
              </button>

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
export default DebtSum;
