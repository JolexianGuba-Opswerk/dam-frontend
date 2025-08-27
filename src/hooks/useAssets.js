import { useQuery } from '@tanstack/react-query';
import {getAssets} from '../services/employee/assetServices';


export const useAssets = (employeeId) => {
  return useQuery({
    queryKey: ['employeeAssets'],
    queryFn: () => getAssets(employeeId),
    enabled: !!employeeId,
  });
};
