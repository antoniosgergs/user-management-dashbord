import Card from "../../components/Card.jsx";
import Wrapper from "../../components/Wrapper.jsx";
import useUsers from "../../hooks/useUsers.js";

const Users = () => {
    const {getUserQuery} = useUsers();
    const { isPending, error, data } = getUserQuery;

    return (
        <Wrapper>
            {isPending ? (
                <p className="text-center text-blue-500 mt-4">Loading users...</p>
            ) : error ? (
                <p className="text-center text-red-500 mt-4">{error.message || "Something went wrong."}</p>
            ) : (
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
            )}
        </Wrapper>
    );
};

export default Users;
