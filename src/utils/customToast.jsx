import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// 1. Login Toast
export const showLoginToast = (user) => {
  toast(
    <div className="flex items-center gap-3 p-2">
      <img
        src={user.profileImage}
        alt="User"
        className="w-10 h-10 rounded object-cover border"
      />
      <span className="text-sm font-medium">{user.name} has logged in</span>
    </div>,
    {
      position: "bottom-right",
      hideProgressBar: true,
      className:
        "bg-pastel-green border border-green-300 rounded-lg shadow-md",
      closeButton: true,
      autoClose: 3000,
    }
  );
};

// 2. Comment Toast
export const showCommentToast = ({ name, content, channel }) => {
  toast(
    <div className="p-2">
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-sm italic text-gray-700">"{content}"</p>
      <p className="text-xs text-gray-500 mt-1">in #{channel}</p>
    </div>,
    {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-pastel-blue border border-blue-300 rounded-lg shadow-md",
      closeButton: true,
      autoClose: 3000,
    }
  );
};