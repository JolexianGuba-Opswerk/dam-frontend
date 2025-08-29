import { useMutation } from "@tanstack/react-query";
import { createAsset } from "../../../services/admin/adminAssetsServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      toast.success("Asset created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminEmployeeAssets"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to create asset.");
    },
  });
};
