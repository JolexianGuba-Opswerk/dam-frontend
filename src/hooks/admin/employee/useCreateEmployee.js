import { useMutation } from "@tanstack/react-query";
("../../../services/admin/adminAssetsServices");
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEmployee } from "../../../services/admin/adminEmployeeServices";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      toast.success("Employee created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminEmployees"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to create employee.");
    },
  });
};
