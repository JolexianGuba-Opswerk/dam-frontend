import { useQuery } from "@tanstack/react-query";
import { getEmployeeDropdown } from "../../../services/admin/adminAssetsServices";

export const useGetEmployeeDrop = () => {
  return useQuery({
    queryKey: ["employeeDropdown"],
    queryFn: getEmployeeDropdown,
    staleTime: 60 * 1000,
  });
};
