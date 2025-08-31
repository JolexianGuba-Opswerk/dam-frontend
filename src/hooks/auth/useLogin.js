import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/employee/authServices";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.is_superuser) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (e) => {
      console.log(e);
      console.log("Redirect User");
    },
  });
};
