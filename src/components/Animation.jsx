import * as motion from "motion/react-client";
import { useState } from "react";

export function LogoAnimation() {
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

const images = [
  "https://picsum.photos/id/1018/400/600",
  "https://picsum.photos/id/1025/400/600",
  "https://picsum.photos/id/1035/400/600",
  "https://picsum.photos/id/650/400/600"
];

export function LandingGallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="flex justify-center items-center gap-15 mt-12">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="relative cursor-pointer"
          onClick={() => setActive(active === i ? null : i)}
          initial={false}
          animate={{
            zIndex: active === i ? 30 : 1,
            scale: active === i ? 1.4 : 1,
            boxShadow: active === i
              ? "0 8px 40px 0px #0003"
              : "0 2px 8px #0001"
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 20,
          }}
          style={{
            borderRadius: 24,
            overflow: "hidden",
            width: 200,
            height: 260,
            position: active === i ? "relative" : "static",
          }}
        >
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}



export function PeepsAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        scale: { type: "spring", bounce: 0.5, duration: 1.5 },
      }}

    >
      <h1 className="text-8xl"> <span className="text-[#ef6060]">
            P
            <span className="text-[#e09935]">
              E<span className="text-[#85b5b5]">E</span>
            </span>
            PS
          </span></h1>
    </motion.div>
  );
}