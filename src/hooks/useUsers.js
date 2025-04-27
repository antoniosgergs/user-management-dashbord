import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import useAuthStore from "../store/authStore.js";
import {queryClient} from "../api/client.js";

const useUsers = (userId) => {
    let userApi = '/api/users';

    const navigate = useNavigate();
    const { accessToken } = useAuthStore.getState();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("query");

    // Get all users
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

    // Get user by id
    const getUser = async () => {
        const response = await axios.get(`${userApi}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response?.data?.result?.data?.user;
    }

    // Create user
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

    // Edit user
    const editUser = async (user) => {
        return await axios.put(`${userApi}/${userId}`,{
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

    // Delete user
    const deleteUser = async (id) => {
        return await axios.delete(`${userApi}/${id}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    }

    // useQuery: Get all users
    const getUsersQuery = useQuery({
        queryKey: ['users', searchValue || ''],
        queryFn: getUsers,
    });

    // useQuery: Get user by id
    const getUserQuery = useQuery({
        queryKey: ['user', userId],
        queryFn: getUser,
        enabled: !!userId,
    });

    const onSuccessCreateUser = (data) => {
        queryClient.invalidateQueries(['users']);
        navigate('/dashboard');
        toast.success(data?.data?.result?.message || 'User created successfully!');
    }

    const onErrorCreateUser = (data) => {
        toast.error(data?.response?.data?.result?.message || 'Something went wrong. Please try again.');
    }

    // useMutation: Create user
    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: onSuccessCreateUser,
        onError: onErrorCreateUser,
    });

    const onSuccessEditUser = (data) => {
        queryClient.invalidateQueries(['users']);
        navigate('/dashboard');
        toast.success(data?.data?.result?.message || 'User created successfully!');
    }

    const onErrorEditUser = (data) => {
        toast.error(data?.response?.data?.result?.message || 'Something went wrong. Please try again.');
    }

    // useMutation: Edit user
    const editUserMutation = useMutation({
        mutationFn: editUser,
        onSuccess: onSuccessEditUser,
        onError: onErrorEditUser,
    });

    const onSuccessDeleteUser = (data) => {
        queryClient.invalidateQueries(['users']);
        toast.success(data?.data?.result?.message || 'User deleted successfully!');
    }

    const onErrorDeleteUser = (data) => {
        toast.error(data?.response?.data?.result?.message || 'Something went wrong. Please try again.');
    }

    // useMutation: Delete user
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: onSuccessDeleteUser,
        onError: onErrorDeleteUser,
    });

    return {
        editUserMutation,
        getUsersQuery,
        getUserQuery,
        deleteUserMutation,
        createUserMutation,
    };
};

export default useUsers;
