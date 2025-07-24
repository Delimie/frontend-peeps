import * as motion from "motion/react-client";

export default function LogoAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        scale: { type: "spring", bounce: 0.5, duration: 1.5 },
      }}

    >
      <div className="flex flex-col items-center">
      <img src="./Peeps_Logo.png" className="w-50 h-50 mb-1" alt="Peeps Logo" />
      <h1 className="text-5xl font-extrabold text-[#5c552e] tracking-wide drop-shadow-sm">
            LET'S <span className="text-[#ef6060]">P<span className="text-[#e09935]">E<span className="text-[#85b5b5]">E</span></span>PS!</span>
          </h1></div>
    </motion.div>
  );
}