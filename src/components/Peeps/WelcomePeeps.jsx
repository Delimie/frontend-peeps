import { Sparkles, CalendarCheck, Users, PiggyBank } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="text-[#F3B761] w-8 h-8 mb-2" />,
    title: "Group Chat",
    desc: "Chat with your friends in real-time. Share thoughts, plans, and memes!",
  },
  {
    icon: <CalendarCheck className="text-[#8CBEB2] w-8 h-8 mb-2" />,
    title: "Schedule Appointments",
    desc: "Create events, manage group activities, and never miss an important moment.",
  },
  {
    icon: <PiggyBank className="text-[#F06060] w-8 h-8 mb-2" />,
    title: "Split Expenses",
    desc: "Track bills and split group expenses effortlessly. No more confusion!",
  },
];

function WelcomePeeps() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-bold text-[#8CBEB2] mb-3 font-mitr">
          Welcome to PEEPS!
        </h1>
        <p className="text-lg text-[#5C4B51] mb-2">
          The all-in-one place for friends, groups, and fun!
        </p>
        <p className="text-md text-[#8CBEB2] mb-2">
          💬 Chat. 🗓️ Plan. 💸 Share. — Everything is easier, together.
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl w-64 p-6 flex flex-col items-center border border-[#F2EBBF] hover:scale-105 transition"
          >
            {f.icon}
            <h3 className="font-bold text-xl text-[#8CBEB2] mb-2 text-center">{f.title}</h3>
            <p className="text-[#5C4B51] text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-sm text-[#8CBEB2] mt-10 opacity-70">
        Built for friends who love to chat, plan, and share.
      </div>
    </div>
  );
}

export default WelcomePeeps;
