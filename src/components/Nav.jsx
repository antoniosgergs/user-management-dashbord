import Button from "./Button.jsx";
import { MoonIcon } from '@heroicons/react/24/outline';
import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/authStore.js";

const Nav = ({primaryLabel, onPrimaryClick}) => {
    const navigate = useNavigate();
    const { clearAuth } = useAuthStore();

    const onLogout = () => {
        clearAuth();
        navigate('/login');
    }

    return (
        <div className="flex p-2 primary-color text-white">
            <div className="content-center">
                <h2>User Management</h2>
            </div>

            <div className="flex  flex-1 justify-end">
                <div className="flex space-x-2 ">
                    <Button title={primaryLabel} onClick={onPrimaryClick} bg={"bg-white"} textColor={"text-[#6f84da]"}/>
                    <Button title={'Logout'} bg={'bg-[#fa2832]'} onClick={onLogout}/>
                    <button className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                        <MoonIcon className="h-5 w-5 text-white"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Nav;