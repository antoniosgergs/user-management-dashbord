import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUsers = () => {
    return useQuery(['users'], async () => {
        const { data } = await axios.get('/api/users');
        return data;
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/users/${id}`),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });
};
