import { useQuery } from "@tanstack/react-query";
import { getEmployeeDetails } from "../../../services/admin/adminEmployeeServices";

export const useGetEmployeeDetails = (id, isModalOpen) => {
  return useQuery({
    queryKey: ["employeeDetails", id],
    queryFn: () => getEmployeeDetails(id),
    staleTime: 60 * 1000,
    enabled: !!id && isModalOpen,
  });
};
