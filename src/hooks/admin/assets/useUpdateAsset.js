import { useMutation } from "@tanstack/react-query";
import { updateAssetDetails } from "../../../services/admin/adminAssetsServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssetDetails,
    onSuccess: () => {
      toast.success("Asset updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["assetDetails"] });

      queryClient.invalidateQueries({
        queryKey: ["adminEmployeeAssets"],
        exact: false,
      });

      queryClient.invalidateQueries();
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to update asset.");
    },
  });
};
