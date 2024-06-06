import { NavLink } from "react-router-dom";
import { MdOutlinePayments } from "react-icons/md";


const UserBoard = () => {
    return (
        <>
            <li>
                <NavLink to="/deshoard/userpay">
                    <MdOutlinePayments />
                    User Payment History</NavLink>
            </li>
        </>
    );
};

export default UserBoard;