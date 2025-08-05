import useAuthStore from "../stores/authStore"

function Avatar({ size = 100, previewUrl }) {
  const user = useAuthStore((state) => state.user);

  const displayImage = previewUrl || user?.profileImage || null

  return (
     <div
      className="rounded-full border-2 border-white bg-[#ffed90] overflow-hidden cursor-pointer flex items-center justify-center"
      style={{ width: size, height: size }}
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
    </div>
  );
}

export default Avatar;
