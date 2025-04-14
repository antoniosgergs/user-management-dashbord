import { useSearchParams } from "react-router";
import './App.css';
import Nav from "./components/Nav.jsx";
import Card from "./components/Card.jsx";
import SearchUser from "./components/SearchUser.jsx";
import { useEffect, useState } from "react";
import useAuthStore from "./store/authStore.js";

const App = () => {
    const { accessToken } = useAuthStore.getState();
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("query");

    useEffect(() => {
        if(!accessToken) {
            return
        }

        const fetchUser = async () => {
            setLoading(true);
            setApiError(null);
            setUser([]);

            try {
                let userApi = '/api/users';

                if(searchValue?.trim()){
                    userApi = userApi + `?search=${searchValue}`
                }

                const response = await fetch(userApi, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                setUser(data.result.data.users);

            } catch (error) {
                console.error(error);
                setApiError('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [accessToken, searchValue]);

    return (
        <div>
            <Nav />
            <SearchUser />

            {loading ? (
                <p className="text-center text-blue-500 mt-4">Loading users...</p>
            ) : apiError ? (
                <p className="text-center text-red-500 mt-4">{apiError}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-6">
                    {users.map((user) => (
                        <Card
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
        </div>
    );
};
export default App;