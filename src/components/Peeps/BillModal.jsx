import React, { useEffect, useState } from "react";
import Avatar from "../avatar";
import { X } from "lucide-react";
import { swalAlert } from "../../utils/swalAlert";
import useExpenseStore from "../../stores/expensesStore";
import useAuthStore from "../../stores/authStore";
import { useForm } from "react-hook-form";
import useSplitStore from "../../stores/splitsStore";
import useGroupStore from "../../stores/groupStore";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const members = [
  { name: "Allie", avatar: "./mockProfilePic2.jpg" },
  { name: "อัลลี่เหมือนกัน", avatar: "./mockProfilePic3.jpg" },
  { name: "Allie ร่างแยก", avatar: "./mockProfilePic1.jpg" },
];

function BillModal({ open, onClose }) {
  const { groupId } = useParams();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const createExpense = useExpenseStore((state) => state.createExpense);
  const createSplit = useSplitStore((state) => state.createSplit);
  const groupUsers = useGroupStore((state) => state.groupUsers);
  const { register, handleSubmit, formState, reset, setValue, watch } =
    useForm();
  const { isSubmitting, errors } = formState;
  // console.log(user)
  const billName = watch("title");
  const total = watch("amount");

  const currentGroupUsers = groupUsers.filter((u) => u.id !== user.id);

  const [step, setStep] = useState(1);

  const [createdExpenseId, setCreatedExpenseId] = useState(null);
  const [createData, setCreateData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expenseData = {
        title: data.title,
        amount: Number(data.amount),
        receiptImage: "fake.jpg",
        groupId: Number(groupId),
        userId: user.id,
        date: today.toISOString().split("T")[0],
      };
      console.log("[CREATE DATA]", expenseData);
      // const result = await createExpense(createData, token)
      // console.log(result)
      setCreateData(expenseData);
      toast.success("Assigned success");
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitSplit = async () => {
    try {
      const result = await createExpense(createData, token);
      console.log(result.data.expense.id);
      const expenseId = result.data.expense.id;
      setCreatedExpenseId(expenseId);
      const splitData = currentGroupUsers.map((user, i) => ({
        userId: user.id,
        amount: Number(splits[i]),
        status: "UNPAID",
      }));
      // for (let s of splitData) {
      //   await createSplit(expenseId, s, token);
      // }
      toast.success("Assigned success");
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  // สำหรับข้อมูลบิล
  // const [billName, setBillName] = useState("");
  // const [total, setTotal] = useState("");

  // จำนวนเงินแต่ละคน
  const [splits, setSplits] = useState(groupUsers.map(() => ""));

  //ให้หารให้ลงตัวก่อน
  useEffect(() => {
    // console.log(groupUsers.map(g => g.name))
    // console.log(groupUsers.map(g => g.id))
    if (!total || Number(total) <= 0) {
      setSplits(currentGroupUsers.map(() => ""));
      return;
    }
    const share = Math.floor(Number(total) / groupUsers.length);
    const remain = Number(total) - share * groupUsers.length;
    let arr = Array(groupUsers.length).fill(share);
    for (let i = 0; i < remain; i++) {
      arr[i] += 1;
    }
    setSplits(arr.map(String));
  }, [total, groupUsers.length]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#5C4B51]/50">
      <div className="relative bg-white rounded-2xl shadow-2xl p-7 w-[380px]">
        {/* ปุ่มปิด */}
        <button
          className="absolute top-4 right-4 text-[#5C4B51] text-2xl"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* STEP 1: ฟอร์มสร้างบิล */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-[1.6rem] font-bold mb-3 text-[#222]">
              Bill Management
            </div>
            <div className="mb-1 font-semibold text-[#222]">Description:</div>
            <input
              type="text"
              placeholder="กรุณากรอกชื่อบิล"
              // value={billName}
              // onChange={(e) => setBillName(e.target.value)}
              {...register("title")}
              className="w-full rounded-lg px-3 py-2 bg-[#F7F3D7] text-[#555] mb-4 outline-none border-none placeholder:text-[#B7A969] font-medium"
            />

            <div className="mb-1 font-semibold text-[#222]">
              <span>Total Price (฿)</span>
            </div>
            <input
              type="number"
              placeholder="ยอดทั้งหมด"
              // value={total}
              // onChange={(e) => setTotal(e.target.value)}
              {...register("amount")}
              className="w-full rounded-lg px-4 py-2 bg-[#F7F3D7] text-[#555] mb-5 outline-none border-none placeholder:text-[#B7A969] font-medium"
            />

            {/* <div className="flex justify-center mb-5">
              <button className="rounded-full px-6 py-2 bg-[#F6B86A] text-white font-semibold text-base shadow hover:brightness-105 transition">
                Attach Receipt
              </button>
            </div> */}

            <div className="flex items-center gap-2 mb-8 font-semibold">
              <span className="text-[#222]">share with</span>
              <Avatar size={32} />
              <button className="rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-xl text-[#AAA] font-bold border border-gray-200 hover:bg-[#F2EBBF] transition">
                +
              </button>
            </div>

            <button
              className="w-full rounded-full px-5 py-2 bg-[#98C5B8] text-white font-semibold text-lg shadow hover:brightness-105 transition disabled:bg-gray-300"
              // onClick={() => setStep(2)}
              type="submit"
              disabled={!billName || Number(total) <= 0 || isSubmitting}
              // disabled={isSubmitting}
            >
              Next
            </button>
          </form>
        )}

        {/* STEP 2: ฟอร์มแบ่งเงินแต่ละคน */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmitSplit)}>
            <div className="text-[1.6rem] font-bold mb-3 text-[#222]">
              Bill Management
            </div>
            <div className="flex items-center justify-between mb-5 mt-3">
              <span className="text-lg text-[#218d8d]">
                {billName || "Bill name"}
              </span>
              <span className="font-extrabold text-3xl tracking-wider text-[#111]">
                {total || 0} <span className="text-base font-medium">฿</span>
              </span>
            </div>

            {/*div แยกพวก user */}
            <div className="max-h-50 overflow-y-auto mb-7">
              {currentGroupUsers.map((el, i) => (
                <div
                  key={el.id}
                  className="flex items-center justify-between gap-3 mb-3 mr-2"
                >
                  {/* กลุ่ม avatar + name */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#8CBEB2]">
                      <img
                        src={el.profileImage}
                        alt={el.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="text-[#222] font-semibold truncate"
                      style={{ width: 150 }}
                    >
                      {el.name}
                    </span>
                  </div>

                  {/* กลุ่ม input + ฿ */}
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      className="w-20 rounded-full px-3 py-1 bg-[#F7F3D7] text-[#555] text-right outline-none border-none placeholder:text-[#B7A969] font-medium"
                      placeholder="0"
                      min={0}
                      value={splits[i]}
                      onChange={(e) => {
                        const newSplits = [...splits];
                        newSplits[i] = e.target.value;
                        setSplits(newSplits);
                      }}
                      // {...register("amount")}
                    />
                    <span className="text-[#222] text-base">฿</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ปุ่ม Back / Save */}
            <div className="flex gap-4 mt-3">
              <button
                className="w-1/2 rounded-full px-5 py-2 bg-[#F6B86A] text-white font-semibold text-lg shadow hover:brightness-105 transition"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="w-1/2 rounded-full px-5 py-2 bg-[#98C5B8] text-white font-semibold text-lg shadow hover:brightness-105 transition"
                // onClick={() => setStep(3)}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <>
            {/* ปุ่มปิด */}
            <button
              className="absolute top-4 right-4 text-[#5C4B51] text-2xl"
              onClick={onClose}
            >
              <X size={22} />
            </button>

            <div className="text-[1.6rem] font-bold mb-2 text-[#222]">
              Bill Details
            </div>
            <div className="flex items-center justify-between mb-2 mt-2">
              <span className="font-semibold text-[#222]">{billName}</span>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="font-extrabold text-4xl tracking-wider text-[#111]">
                {total}
              </span>
              <span className="text-base font-medium mb-1">฿</span>
            </div>
            <div className="w-full border-t border-[#F6B86A] mb-2" />

            {/* Unpaid */}
            <div className="font-bold text-[#111] mt-1 mb-4 flex items-center">
              <span>Unpaid:</span>
              <button
                className="ml-auto text-xs underline text-[#8CBEB2] hover:text-[#F3B562]"
                onClick={() => setStep(2)}
              >
                Edit
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto mb-2">
              {currentGroupUsers.map(
                (el, i) =>
                  !el.paid && (
                    <div
                      key={el.id}
                      className="flex items-center justify-between gap-3 mb-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar size={40} />
                        <span
                          className="text-[#F06060] font-semibold truncate"
                          style={{ width: 120 }}
                        >
                          {el.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#F06060] font-semibold">
                          {splits[i]}
                        </span>
                        <span className="text-[#F06060] text-base">฿</span>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Paid */}
            <div className="font-bold text-[#111] mb-1 mt-3">Paid:</div>
            <div>
              {groupUsers.map(
                (el, i) =>
                  el.paid && (
                    <div
                      key={el.id}
                      className="flex items-center justify-between gap-3 mb-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                          <img
                            src={el.avatar}
                            alt={el.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <span
                          className="text-[#98C5B8] font-semibold truncate"
                          style={{ width: 120 }}
                        >
                          {el.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#98C5B8] font-semibold">
                          {splits[i]}
                        </span>
                        <span className="text-[#98C5B8] text-base">฿</span>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* ปุ่ม Cancel / Confirm */}
            <div className="flex gap-4 mt-6">
              <button
                className="w-1/2 rounded-full px-5 py-2 bg-[#F06060] text-white font-semibold text-lg shadow hover:brightness-105 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="w-1/2 rounded-full px-5 py-2 bg-[#98C5B8] text-white font-semibold text-lg shadow hover:brightness-105 transition"
                onClick={async () => {
                  try {
                    if (!createdExpenseId) {
                      console.error("Missing expenseId");
                      return;
                    }

                    const splitData = currentGroupUsers.map((user, i) => ({
                      userId: user.id,
                      amount: Number(splits[i]),
                      status: "UNPAID",
                    }));

                    for (const s of splitData) {
                      await createSplit(createdExpenseId, s, token);
                    }

                    swalAlert("success", "Group bill has been created");
                    onClose();
                  } catch (err) {
                    console.error("Failed to create expense splits:", err);
                    swalAlert("error", "Something went wrong");
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BillModal;
