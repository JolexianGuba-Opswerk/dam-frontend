import { useQuery } from "@tanstack/react-query";
import { getAssetHistory } from "../../../services/admin/adminAssetsServices";

export const useGetAllAssetHistory = ({ page, search }) => {
  return useQuery({
    queryKey: ["adminEmployeeAssetHistory", page, search],
    queryFn: () => getAssetHistory({ page, search }),
    staleTime: 2 * 60 * 1000,
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
