import Nav from "./Nav.jsx";
import SearchUser from "./SearchUser.jsx";

const Wrapper = ({children}) => (
    <>
        <Nav />
        <SearchUser />
        {children}
    </>
)

export default Wrapper;
