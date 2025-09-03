import { useQuery } from "@tanstack/react-query";
import { getAssetsList } from "../../../services/employee/assetServices";

export const useGetEmployeeAssets = (id, isModalOpen) => {
  return useQuery({
    queryKey: ["employeeAssetsList", id],
    queryFn: () => getAssetsList(id),
    enabled: !!id && isModalOpen,
  });
};
