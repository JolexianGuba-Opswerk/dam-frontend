import { useMutation } from "@tanstack/react-query";
import { updateEmployeeDetails } from "../../../services/admin/adminEmployeeServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateEmployeeDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeDetails,
    onSuccess: () => {
      toast.success("Employee details updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["employeeDetails"] });
      queryClient.invalidateQueries({ queryKey: ["adminEmployees"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to update employee.");
    },
  });
};
