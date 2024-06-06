import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { MdBugReport } from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";



const AdminBoard = () => {
    return (
        <>
            <li>
                <NavLink to="/deshoard/adminhome">
                    <HiHome />
                    Admin Home</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/manageuser">
                    <FaUsers />
                    Manage users</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/catagory">
                    <AiFillMedicineBox />
                    Manage Catagory</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/payment">
                    <MdOutlinePayments />
                    Payment management</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/report">
                    <MdBugReport />
                    Sales Report</NavLink>
            </li>
            <li>
                <NavLink to="/deshoard/advertise">
                    <FcAdvertising />
                    Manage banner Advertise</NavLink>
            </li>
        </>
    );
};

export default AdminBoard;