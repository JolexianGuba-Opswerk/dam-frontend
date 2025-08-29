import { useMutation } from "@tanstack/react-query";
import { updateCredentials } from "../../services/employee/employeeServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export const useUpdateCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCredentials,
    onSuccess: () => {
      toast.success("Credentials updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => {
      toast.error("Error in updating credentials !");
    },
  });
};
