import './App.css';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/client.js";
import Users from "./screens/users/Users.jsx";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Users/>
        </QueryClientProvider>
    );
};
export default App;