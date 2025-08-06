import React from "react";
import Avatar from "../avatar";

function BillSummaryCard({ data }) {
  console.log(data)
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 border border-[#8CBEB2] hover:shadow-lg transition w-[300px] cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg">{data.title}</div>
        <div className="font-bold text-2xl text-[#F06060]">฿{data.total}</div>
      </div>
      <hr className="my-2 border-[#F3B562]" />

      <div className="text-base font-bold text-[#5C4B51] mb-1">Unpaid:</div>
      <div className="flex flex-col gap-2 max-h-[90px] overflow-y-auto mb-1">
        {data?.unpaid?.map((p, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Avatar src={p.avatar} size={36} />
            <span className="text-[#5C4B51] font-semibold itim">{p.name}</span>
            <span className="ml-auto text-[#F06060] font-bold itim">{p.amount} ฿</span>
          </div>
        ))}
        {data?.unpaid?.length === 0 && (
          <span className="text-xs text-gray-400 italic pl-3">No unpaid</span>
        )}
      </div>

      <div className="text-base font-bold text-[#5C4B51] mt-2 mb-1">Paid:</div>
      <div className="flex flex-col gap-2 max-h-[60px] overflow-y-auto">
        {data.paid.map((p, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Avatar src={p.avatar} size={36} />
            <span className="text-[#5C4B51] font-semibold itim">{p.name}</span>
            <span className="ml-auto text-[#8CBEB2] font-bold itim">{p.amount} ฿</span>
          </div>
        ))}
        {data.paid.length === 0 && (
          <span className="text-xs text-gray-400 italic pl-3">No paid</span>
        )}
      </div>
    </div>
  );
}

export default BillSummaryCard;
