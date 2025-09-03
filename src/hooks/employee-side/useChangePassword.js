import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../../services/employee/authServices";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to change password.");
    },
  });
};
