import { useQuery } from "@tanstack/react-query";
import { getDepartmentDropdown } from "../../../services/admin/adminAssetsServices";

export const useDepartmentDrop = () => {
  return useQuery({
    queryKey: ["departmentDrop"],
    queryFn: getDepartmentDropdown,
    staleTime: Infinity,
    refetchOnMount: false,
  });
};
