import { useQuery } from '@tanstack/react-query';
import { currentUser } from '../services/employee/employeeServices';


export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUser(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false, 
  });
};