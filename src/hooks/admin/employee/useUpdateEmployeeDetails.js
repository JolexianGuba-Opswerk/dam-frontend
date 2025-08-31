import { useMutation } from "@tanstack/react-query";
import { updateEmployeeDetails } from "../../../services/admin/adminEmployeeServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateEmployeeDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeDetails,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["employeeDetails"] });
      await queryClient.invalidateQueries({ queryKey: ["adminEmployees"] });
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Employee details updated successfully!");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to update employee.");
    },
  });
};
