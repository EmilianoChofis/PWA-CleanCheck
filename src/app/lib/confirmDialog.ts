import Swal from "sweetalert2";

export const confirmDialog = (
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,
  confirmCallback: () => void
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28235f",
    cancelButtonColor: "#f10037",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
