import { useQuery } from "@tanstack/react-query";
import { getAllEmployee } from "../../../services/admin/adminEmployeeServices";

export const useGetAllEmployee = ({
  page,
  ordering,
  department,
  position,
  isVerifiedFilter,
  search,
}) => {
  return useQuery({
    queryKey: [
      "adminEmployees",
      page,
      ordering,
      department,
      position,
      isVerifiedFilter,
      search,
    ],
    queryFn: () =>
      getAllEmployee({
        page,
        ordering,
        department,
        position,
        isVerifiedFilter,
        search,
      }),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });
};
