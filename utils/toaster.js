import { toast } from "react-toastify";

export const toaster = (type, message) => {
  if (type == "success") toast.success(message);
  else if (type == "error") toast.error(message);
};
