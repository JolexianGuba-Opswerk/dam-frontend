import { useQuery } from "@tanstack/react-query";
import { getAssetDetails } from "../../../services/admin/adminAssetsServices";

export const useGetAssetDetails = (id, isModalOpen) => {
  return useQuery({
    queryKey: ["assetDetails", id],
    queryFn: () => getAssetDetails(id),
    staleTime: 2 * 60 * 1000,
    enabled: !!id && isModalOpen,
  });
};
