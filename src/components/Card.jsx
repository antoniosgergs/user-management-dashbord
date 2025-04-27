import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import useUsers from "../hooks/useUsers.js";

const Card = ({ id, firstName, lastName = '', status, dateOfBirth, email}) => {
    const navigate = useNavigate();

    const fullName = `${firstName} ${lastName}`;
    const [openConfirmationModal,setOpenConfirmationModal] = useState(false);

    const {deleteUserMutation} = useUsers();
    const { mutate,isPending } = deleteUserMutation;

    const onEditUser = () => {
        navigate(`/dashboard/edit/${id}`);
    }

    const onDeleteUser = () => {
        setOpenConfirmationModal(true);
    }

    const onConfirmDelete = ()=> {
        setOpenConfirmationModal(false);
        mutate(id)
    }

    const getInitials = (value) =>{
        return value
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 w-64 justify-items-stretch">
            <div className="flex justify-center mb-4">
                <div className="primary-color text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                    <h2>{getInitials(fullName)}</h2>
                </div>
            </div>
            <div className="grid">
                <h3 className="text-center">{fullName}</h3>
                <p className="text-sm text-gray-500">Email: {email}</p>
                <p className="text-sm">Status: {status}</p>
                <p className="text-sm">Date of Birth: {dateOfBirth}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button title={"Edit"} textColor={'text-white'} onClick={onEditUser} />
                <Button
                    title={isPending ? "Deleting..." : "Delete"}
                    disabled={isPending}
                    textColor={'text-white'}
                    bg={'bg-red-600'}
                    onClick={onDeleteUser}
                />
            </div>

            <ConfirmationModal
                title={'Delete user'}
                description={`Are you sure you want to delete ${firstName}`}
                setOpenConfirmationModal={setOpenConfirmationModal}
                openConfirmationModal={openConfirmationModal}
                onConfirmDelete={onConfirmDelete}
            />
        </div>
    )
}
export default Card;