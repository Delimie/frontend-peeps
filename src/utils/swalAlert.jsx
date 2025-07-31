import Swal from "sweetalert2";

export const swalAlert = (icon, text) => {
  return Swal.fire({
    title: text || "Hello",
    icon: icon || "success",
    timer: 3000,
  });
};