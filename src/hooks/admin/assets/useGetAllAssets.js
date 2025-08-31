import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../../services/admin/adminAssetsServices";

export const useGetAllAssets = ({ page, category, status, search }) => {
  return useQuery({
    queryKey: ["adminEmployeeAssets", page, category, status, search],
    queryFn: () => getAssets({ page, category, status, search }),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
