import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteEmployee } from "../../../services/admin/adminEmployeeServices";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminEmployees"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to delete employee.");
    },
  });
};
