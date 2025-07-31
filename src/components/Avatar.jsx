import useAuthStore from "../stores/authStore"
import { useRef } from "react"

function Avatar({ size = 100, previewUrl, onFileChange }) {
  const user = useAuthStore((state) => state.user);
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (onFileChange) {
    onFileChange(file);
  }
};

  const displayImage = previewUrl || user?.profileImage || null

  return (
     <div
      className="rounded-full border-2 border-white bg-[#ffed90] overflow-hidden cursor-pointer flex items-center justify-center"
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      {displayImage ? (
        <img
          src={displayImage}
          alt="avatar"
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
      ) : (
        <span className="text-3xl">🎨</span>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
      />
    </div>
  );
}

export default Avatar;
