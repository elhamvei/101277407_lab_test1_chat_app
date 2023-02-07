import Swal from "sweetalert2";

const Alert = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const makeAlert = (type, msg) => {
  Alert.fire({
    icon: type,
    title: msg,
  });
};

export default makeAlert;
