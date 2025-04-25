import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import useAuthStore from "../store/authStore.js";
import {useSearchParams} from "react-router";

const useUsers = () => {
    let userApi = '/api/users';

    const { accessToken } = useAuthStore.getState();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("query");

    const getUsers = async () =>{
        if(searchValue?.trim()){
            userApi = userApi + `?search=${searchValue}`
        }

        return await axios.get(userApi,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    };

    const { isPending, error, data } = useQuery({
        queryKey: ['users', searchValue || ''],
        queryFn: getUsers,
    })

    return {
        isPending,
        error,
        data
    }
}

export default useUsers;
