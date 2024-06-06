import { NavLink } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import { MdOutlinePayments } from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";




const SellerBoard = () => {
    return (
        <>
            <li>
                <NavLink to="/deshoard/sellerhome">
                    <HiHome />
                    Seller Home</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/sellermedicin">
                    <MdManageHistory />
                    Manage Medicines</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/sellerpay">
                    <MdOutlinePayments />
                    Payment History</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/selleradvertice">
                    <FcAdvertising />
                    Ask For Advertisement</NavLink>
            </li>
        </>
    );
};

export default SellerBoard;