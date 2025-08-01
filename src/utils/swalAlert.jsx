import Swal from "sweetalert2";

export const swalAlert = (icon, text) => {
  return Swal.fire({
    title: text || "Hello",
    icon: icon || "success",
    timer: 3000,
  });
};

export const swalAlertConfirm = (icon,title, text) => {
  return Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};
