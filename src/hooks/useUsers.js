import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAuthStore from "../store/authStore.js";
import {queryClient} from "../api/client.js";

const useUsers = () => {
    let userApi = '/api/users';

    const navigate = useNavigate();
    const { accessToken } = useAuthStore.getState();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("query");

    const getUsers = async () => {
        if (searchValue?.trim()) {
            userApi += `?search=${searchValue}`;
        }

        const response = await axios.get(userApi, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response?.data?.result?.data?.users;
    };

    const createUser = async (user) => {
        return await axios.post(userApi,{
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         status: user.status,
         dateOfBirth: user.dateOfBirth,
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }

    const getUserQuery = useQuery({
        queryKey: ['users', searchValue || ''],
        queryFn: getUsers,
    });

    const onSuccessCreateUser = (data) => {
        queryClient.invalidateQueries(['users']);
        navigate('/dashboard');
        toast.success(data?.data?.result?.message || 'User created successfully!');
    }

    const onErrorCreateUser = (data) => {
        toast.error(data?.response?.data?.result?.message || 'Something went wrong. Please try again.');
    }

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: onSuccessCreateUser,
        onError: onErrorCreateUser,
    });

    return {
        getUserQuery,
        createUserMutation,
    };
};

export default useUsers;
