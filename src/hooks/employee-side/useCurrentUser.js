import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../../services/employee/employeeServices";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => currentUser(),
    retry: false,
  });
};
