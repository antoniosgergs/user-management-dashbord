import Nav from "./Nav.jsx";
import SearchUser from "./SearchUser.jsx";

const Wrapper = ({children, primaryLabel, onPrimaryClick, hideSearchUser=false}) => (
    <>
        <Nav primaryLabel={primaryLabel} onPrimaryClick={onPrimaryClick} />
        {!hideSearchUser && <SearchUser />}
        {children}
    </>
)

export default Wrapper;
