// src/components/Plans/UpcomingPlans.jsx
import { CalendarPlus2, MapPinIcon, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { swalAlert, swalAlertConfirm } from "../../utils/swalAlert";

const mockPlans = [
  // {
  //   id: 1,
  //   title: "The Hidden Lighthouse",
  //   place: "กรุงเทพมหานคร",
  //   startDate: "2025-08-13",
  //   endDate: "2025-08-13",
  //   members: [
  //     { id: 1, name: "Lyrielle", avatar: "/mockProfilePic1.jpg" },
  //     { id: 2, name: "Aster", avatar: "/mockProfilePic3.jpg" },
  //   ],
  // },
  {
    id: 2,
    title: "คาเฟ่แมว",
    place: "พระรามสอง",
    startDate: "2025-09-05",
    endDate: "2025-09-05",
    members: [{ id: 3, name: "Nova", avatar: "/mockProfilePic2.jpg" }],
  },
  {
    id: 3,
    title: "ไปเดินตะลุยคลื่นทะเล",
    place: "บางแสน",
    startDate: "2025-09-18",
    endDate: "2025-09-20",
    members: [],
  },
];

const CURRENT_USER = { id: 999, name: "You", avatar: "/mockProfilePic2.jpg" };

function MemberDots({ members, max = 4 }) {
  const shown = members.slice(0, max);
  const rest = Math.max(0, members.length - max);
  const Dot = ({ img, label }) => (
    <span className="w-7 h-7 rounded-full bg-[#e9eef1] border border-[#d8e3e0] overflow-hidden inline-flex items-center justify-center">
      {img ? (
        <img src={img} alt={label} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs text-[#9aa7a3]">•</span>
      )}
    </span>
  );
  return (
    <div className="flex items-center gap-2">
      {shown.map((m) => (
        <Dot key={m.id} img={m.avatar} label={m.name} />
      ))}
      {Array.from({ length: Math.max(0, max - shown.length) }).map((_, i) => (
        <Dot key={`empty-${i}`} />
      ))}
      <button className="w-7 h-7 rounded-full border border-dashed border-[#B7A969] hover:border-[#8CBEB2] inline-flex items-center justify-center">
        <Plus size={14} className="text-[#B7A969]" />
      </button>
    </div>
  );
}

function PlanCard({ plan, onView, onJoin, onDelete,joined  }) {
  const isRange = plan.startDate !== plan.endDate;
  const dateText = isRange
    ? `${dayjs(plan.startDate).format("DD/MM/YYYY")} - ${dayjs(
        plan.endDate
      ).format("DD/MM/YYYY")}`
    : dayjs(plan.startDate).format("DD/MM/YYYY");

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-sm border border-[#F2EBBF] px-5 py-4">
      {/* ปุ่มลบมุมขวาบน */}
      <button
        onClick={() => onDelete?.(plan)}
        className="absolute top-3 right-3 p-1 rounded-lg text-[#F06060] hover:bg-rose-50"
        title="Delete plan"
      >
        <Trash2 size={18} />
      </button>

      <div className="min-w-0 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-[#5C4B51] truncate">
              {plan.title}
            </h3>
            <div className="flex items-center gap-1 text-[#B7A969] text-sm">
              <MapPinIcon size={16} />{" "}
              <span className="font-semibold">{plan.place}</span>
            </div>
          </div>
          <div className="text-[#5C4B51]/80 text-sm mt-1">{dateText}</div>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => onView?.(plan)}
              className="px-4 py-1.5 rounded-xl bg-[#F3B562] text-[#5C4B51] font-semibold hover:brightness-105 cursor-pointer"
            >
              View
            </button>
            <button
              onClick={() => onJoin?.(plan)}
              className={`px-4 py-1.5 rounded-xl font-semibold hover:brightness-105 cursor-pointer ${
                joined ? "bg-[#F06060] text-white" : "bg-[#8CBEB2] text-white"
              }`}
            >
              {joined ? "Cancel" : "Join"}
            </button>
            <MemberDots members={plan.members} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingPlans() {
  const [plans, setPlans] = useState(mockPlans);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    title: "",
    place: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const handleView = (plan) => {
    setSelectedPlan(plan);
    setIsViewOpen(true);
  };

  const handleJoin = async (plan) => {
    const youAlreadyIn = plan.members.some((m) => m.id === CURRENT_USER.id);

    if (!youAlreadyIn) {
      // JOIN
      setPlans((prev) =>
        prev.map((p) =>
          p.id === plan.id ? { ...p, members: [...p.members, CURRENT_USER] } : p
        )
      );
      swalAlert("success", "You have joined this plan!");
      return;
    }

    const ok = await swalAlertConfirm(
      "Cancel join?",
      "Do you want to leave this plan?"
    );
    if (ok.isConfirmed) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === plan.id
            ? {
                ...p,
                members: p.members.filter((m) => m.id !== CURRENT_USER.id),
              }
            : p
        )
      );
      swalAlert("success", "You have left the plan.");
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.place.trim()) return;

    const newPlan = {
      id: Date.now(),
      title: form.title.trim(),
      place: form.place.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      members: [],
    };

    setPlans((prev) =>
      [...prev, newPlan].sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    );
    swalAlert("success", "Create appointment successfully");
    setIsCreateOpen(false);
    setForm({
      title: "",
      place: "",
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
  };

  const handleDelete = async (plan) => {
    if (!window.confirm(`Delete "${plan.title}" ?`)) return;
    setPlans((prev) => prev.filter((p) => p.id !== plan.id));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#5C4B51] mb-3">Upcoming Plans</h2>

      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onView={handleView}
            onJoin={handleJoin}
            onDelete={handleDelete}
            joined={plan.members.some((m) => m.id === CURRENT_USER.id)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 mt-5">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-3 flex justify-end">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl bg-[#8CBEB2] text-white font-semibold hover:brightness-105"
          >
            <CalendarPlus2 size={18} /> Create appointment
          </button>
        </div>
      </div>

      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <h3 className="text-xl font-bold text-[#5C4B51] mb-4">
          Create appointment
        </h3>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 rounded-lg bg-[#F7F3D7] outline-none"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-[#B7A969]" size={18} />
            <input
              type="text"
              placeholder="Place"
              className="flex-1 px-3 py-2 rounded-lg bg-[#F7F3D7] outline-none"
              value={form.place}
              onChange={(e) =>
                setForm((f) => ({ ...f, place: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="text-sm text-[#5C4B51] mb-1">Start date</label>
              <input
                type="date"
                className="px-3 py-2 rounded-lg bg-[#F7F3D7] outline-none"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#5C4B51] mb-1">End date</label>
              <input
                type="date"
                className="px-3 py-2 rounded-lg bg-[#F7F3D7] outline-none"
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 rounded-full px-5 py-2 bg-[#8CBEB2] text-white font-semibold hover:brightness-105"
              disabled={!form.title.trim() || !form.place.trim()}
            >
              Save
            </button>
            <button
              type="button"
              className="flex-1 rounded-full px-5 py-2 bg-[#F3B562] text-[#5C4B51] font-semibold hover:brightness-105"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={isViewOpen} onClose={() => setIsViewOpen(false)}>
        {selectedPlan && (
          <div>
            <h3 className="text-xl font-bold text-[#5C4B51] mb-2">
              {selectedPlan.title}
            </h3>
            <div className="text-[#B7A969] mb-4 flex items-center gap-2">
              <MapPinIcon size={16} /> {selectedPlan.place}
            </div>

            <div className="mb-2 font-semibold text-[#5C4B51]">
              Members ({selectedPlan.members.length})
            </div>
            {selectedPlan.members.length === 0 ? (
              <div className="text-sm text-[#8f9a97]">
                No one has joined yet.
              </div>
            ) : (
              <ul className="flex flex-col gap-2 max-h-64 overflow-auto">
                {selectedPlan.members.map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#8CBEB2]"
                    />
                    <span className="text-[#5C4B51]">{m.name}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded-xl bg-[#8CBEB2] text-white font-semibold hover:brightness-105 cursor-pointer"
                onClick={() => setIsViewOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
