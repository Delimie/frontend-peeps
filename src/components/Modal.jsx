import { useRef } from "react";

function Modal({ open, onClose, children, className = "" }) {
  const modalRef = useRef(null);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#5C4B51]/40 flex items-center justify-center z-50"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white p-6 rounded-xl shadow-xl relative flex flex-col ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
