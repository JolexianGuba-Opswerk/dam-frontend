import { useMutation } from '@tanstack/react-query';
import { updateCredentials } from '../services/employee/employeeServices';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCredentials,
    onSuccess: () => {
      console.log("Update successful!");
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); 

    },
    onError: (e) => {
      console.log("Update failed!", e.response.data);
    },
  });
};
