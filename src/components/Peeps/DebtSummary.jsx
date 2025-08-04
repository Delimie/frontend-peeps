import { X } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import BillModal from "./BillModal";
import useGroupStore from "../../stores/groupStore";
import Avatar from "../avatar";
import useDebtTransactionStore from "../../stores/deptTransactionStore";
import { useParams } from "react-router-dom";
import BillSummaryCard from "./BillSummaryCard";

const debts = [
  { name: "1", toPay: 50, toReceive: 0, avatar: "./mockProfilePic1.jpg" },
  { name: "Allie", toPay: 0, toReceive: 150, avatar: "./mockProfilePic2.jpg" },
  { name: "Auu", toPay: 127, toReceive: 0, avatar: "./mockProfilePic3.jpg" },
  { name: "Dew", toPay: 0, toReceive: 0, avatar: "./mockProfilePic1.jpg" },
  { name: "Gao", toPay: 0, toReceive: 150, avatar: "./mockProfilePic2.jpg" },
];

const mockBills = [
  {
    title: "Eat Am Are",
    total: 666,
    unpaid: [
      { name: "Allie", amount: 333 },
      { name: "Auu", amount: 333 }
    ],
    paid: [
      { name: "1", amount: 333 }
    ]
  },
  {
    title: "Bonchon",
    total: 900,
    unpaid: [
      { name: "Allie", amount: 300 },
      { name: "Gao", amount: 300 }
    ],
    paid: [
      { name: "1", amount: 300 }
    ]
  }
];

function DebtSummary() {
  const { groupId } = useParams()
  const getTransactionById = useDebtTransactionStore(state => state.getTransactionById)
  const [isSelectRecipientModalOpen, setIsSelectRecipientModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const currentGroup = useGroupStore(state => state.currentGroup)
  const [transactions, setTransactions] = useState([]);
  const [showAllBills, setShowAllBills] = useState(false);

  const fetchTransactions = async () => {
    const result = await getTransactionById(groupId);
    const res = result.data.result
    console.log(res)
    setTransactions(res)
  };

  useEffect(() => {
    fetchTransactions();
  }, [groupId]);

  const buildDebts = () => {
    const userId = user?.id;
    const userMap = new Map(
      currentGroup?.users?.map((u) => [u.id, { name: u.name, avatar: u.avatar || "/default-avatar.png" }])
    );

    const summaryMap = new Map();

    transactions.forEach((tx) => {
      if (tx.payerId === userId) {
        const existing = summaryMap.get(tx.receiverId) || { toPay: 0, toReceive: 0 };
        summaryMap.set(tx.receiverId, { ...existing, toPay: existing.toPay + tx.amount });
      } else if (tx.receiverId === userId) {
        const existing = summaryMap.get(tx.payerId) || { toPay: 0, toReceive: 0 };
        summaryMap.set(tx.payerId, { ...existing, toReceive: existing.toReceive + tx.amount });
      }
    });

    const result = Array.from(summaryMap.entries()).map(([id, value]) => {
      const userInfo = userMap.get(id) || { name: `User ${id}`, avatar: "/default-avatar.png" };
      return {
        name: userInfo.name,
        avatar: userInfo.avatar,
        toPay: value.toPay,
        toReceive: value.toReceive,
      };
    });

    return result;
  };


  return (
    <div className="flex flex-col">
      <div className="w-full max-w bg-white rounded-2xl px-8 py-6 mb-8 border-2 border-[#8CBEB2]">
        <div className="flex justify-between gap-2 items-center mb-2">
          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-[#8CBEB2] text-white font-bold rounded-lg shadow hover:bg-[#F3B562] hover:text-[#5C4B51] transition"
              onClick={() => setIsBillModalOpen(true)}
            >
              Create Group's Bill
            </button>
            <button
              className="px-4 py-2 bg-[#FFE066] text-[#5C4B51] font-bold rounded-lg shadow hover:bg-[#8CBEB2] hover:text-white transition"
              onClick={() => setShowAllBills(true)}
              disabled={showAllBills}
            >
              Show All Group Bills
            </button>
          </div>
          <button
            className="px-4 py-2 bg-[#F3B562] text-[#5C4B51] font-bold rounded-lg shadow hover:bg-[#8CBEB2] hover:text-white transition"
            onClick={() => setShowAllBills(false)}
            disabled={!showAllBills}
          >
            Check your bills
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-4xl pt-2 pl-2 font-mitr text-[#5C4B51] tracking-wide">
            {user.name}'s Debt Summary
          </h1>
          <button
            onClick={() => setIsSelectRecipientModalOpen(true)}
            className="itim text-2xl font-bold text-white bg-[#8CBEB2] px-8 py-2 rounded-xl shadow hover:bg-[#F3B562] hover:text-[#5C4B51] transition"
          >
            Pay Now!
          </button>
        </div>
      </div>

   {!showAllBills && (
        <div className="w-full bg-white rounded-2xl shadow-lg px-8 py-6 border border-[#F3B562]">
          <div className="grid grid-cols-[1fr_2fr_2fr_2fr] text-lg text-[#5C4B51] font-semibold mb-5 px-2">
            <div className="text-center text-2xl font-mitr text-[#5C4B51]">
              To Pay
            </div>
            <div className="text-center text-2xl font-mitr text-[#5C4B51]">
              To Receive
            </div>
          </div>
          {buildDebts().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_2fr_2fr] items-center gap-2 mb-4 px-3 py-1 rounded-xl shadow-sm border border-[#FFE066] bg-white"
            >
              <Avatar size={65} />
              <span className="text-[#5C4B51] font-semibold text-xl itim">
                {item.name}
              </span>
              <span
                className={`text-center font-bold text-xl itim ${item.toPay > 0 ? "text-[#F06060]" : "text-gray-300"
                  }`}
              >
                {item.toPay}
              </span>
              <span
                className={`text-center font-bold text-xl itim ${
                  item.toReceive > 0 ? "text-[#8CBEB2]" : "text-gray-300"
                }`}
              >
                {item.toReceive}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* เงื่อนไขโชว์การ์ดบิล */}
      {showAllBills && (
        <div className="flex flex-wrap gap-6 mt-8">
          {mockBills.map((bill, idx) => (
            <BillSummaryCard key={idx} data={bill} />
          ))}
        </div>
      )}

      

      {/* Select Recipient Modal */}
      {isSelectRecipientModalOpen && (
        <div className="fixed inset-0 bg-[#5C4B51]/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-7 rounded-2xl shadow-2xl border-2 border-[#F3B562] relative">
            <button
              onClick={() => setIsSelectRecipientModalOpen(false)}
              className="absolute top-3 right-3 text-[#8CBEB2] hover:text-[#F3B562]"
            >
              <X size={24} />
            </button>
            <h1 className="text-3xl pb-5 font-mitr text-[#5C4B51] text-center">
              Select Recipient
            </h1>
            {buildDebts()
              .filter((item) => item.toPay > 0)
              .map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_2fr_2fr_1fr] items-center gap-2 mb-4 px-2 mx-2 rounded-xl bg-[#fffef7] border border-[#FFE066]"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#8CBEB2]"
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
                    className="itim px-4 py-1 bg-[#8CBEB2] text-white rounded-lg shadow hover:bg-[#F3B562] hover:text-[#5C4B51] transition"
                  >
                    Pay
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {isBillModalOpen && (
        <BillModal
          open={isBillModalOpen}
          onClose={() => setIsBillModalOpen(false)}
          // groupId={currentGroup?.id}
        />
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-[#5C4B51]/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-7 rounded-2xl shadow-2xl border-2 border-[#8CBEB2] relative">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-3 right-3 text-[#8CBEB2] hover:text-[#F3B562]"
            >
              <X size={24} />
            </button>
            <h1 className="text-3xl pb-5 font-mitr text-[#5C4B51] text-center">
              Payment
            </h1>
            <div>
              <p className="text-2xl pb-5 itim text-[#5C4B51] text-center">
                Account Details
              </p>
            </div>
            <div className="flex gap-5 justify-center">
              <button className="itim text-white px-5 py-1 rounded-lg bg-[#8CBEB2] shadow hover:bg-[#F3B562] hover:text-[#5C4B51] transition">
                Attach Receipt
              </button>
              <button
                onClick={() => {
                  setIsSelectRecipientModalOpen(true);
                  setIsPaymentModalOpen(false);
                }}
                className="itim text-[#5C4B51] px-5 py-1 rounded-lg bg-[#F2EBBF] hover:bg-[#8CBEB2] hover:text-white shadow transition"
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
