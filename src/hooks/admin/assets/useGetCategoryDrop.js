import { useQuery } from "@tanstack/react-query";
import { getCategoryDropdown } from "../../../services/admin/adminAssetsServices";

export const useGetCategoryDrop = () => {
  return useQuery({
    queryKey: ["categoryDropdown"],
    queryFn: getCategoryDropdown,
    staleTime: 60 * 1000,
  });
};
