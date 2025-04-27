import {useNavigate} from "react-router-dom";
import Card from "../../components/Card.jsx";
import Wrapper from "../../components/Wrapper.jsx";
import useUsers from "../../hooks/useUsers.js";

const Users = () => {
    const navigate = useNavigate();

    const {getUsersQuery} = useUsers();
    const { isPending, isError, data } = getUsersQuery;

    const getBody = () => {
        if(isPending) {
            return (
                <p className="text-center text-blue-500 mt-4">Loading users...</p>
            )
        }

        if(isError) {
            return (
                <p className="text-center text-red-500 mt-4">Something went wrong</p>
            )
        }

        if(data.length === 0) {
            return (
                <p className="text-center text-red-500 mt-4">No users found</p>
            )
        }

        return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-6">
                {data?.map((user) => (
                    <Card
                        id={user.id}
                        key={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        dateOfBirth={user.dateOfBirth}
                        status={user.status}
                        email={user.email}
                    />
                ))}
            </div>
        )
    }

    const onCreateUser = () => {
        navigate('/dashboard/new')
    }

    return (
        <Wrapper primaryLabel={'Create User'} onPrimaryClick={onCreateUser}>
            {getBody()}
        </Wrapper>
    );
};

export default Users;
