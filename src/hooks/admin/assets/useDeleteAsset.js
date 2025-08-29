import { useMutation } from "@tanstack/react-query";
import { deleteAsset } from "../../../services/admin/adminAssetsServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      toast.success("Asset deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminEmployeeAssets"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to delete asset.");
    },
  });
};
