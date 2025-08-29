import { useQuery } from "@tanstack/react-query";
import { getCredentials } from "../../services/employee/employeeServices";

export const useGetCredentials = (employeeId) => {
  return useQuery({
    queryKey: ["employeeCredentials"],
    queryFn: () => getCredentials(employeeId),
    enabled: !!employeeId,
  });
};
