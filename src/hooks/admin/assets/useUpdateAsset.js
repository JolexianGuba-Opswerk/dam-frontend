import { useMutation } from "@tanstack/react-query";
import { updateAssetDetails } from "../../../services/admin/adminAssetsServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAssetDetails,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["assetDetails"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["adminEmployeeAssets"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["adminEmployeeAssetHistory"],
      });

      toast.success("Asset updated successfully!");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to update asset.");
    },
  });
};
