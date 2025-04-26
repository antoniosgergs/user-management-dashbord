import Nav from "./Nav.jsx";
import SearchUser from "./SearchUser.jsx";

const Wrapper = ({children, hideSearchUser=false}) => (
    <>
        <Nav />
        {!hideSearchUser && <SearchUser />}
        {children}
    </>
)

export default Wrapper;
