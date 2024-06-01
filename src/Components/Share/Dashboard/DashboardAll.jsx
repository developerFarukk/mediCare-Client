import { NavLink, Outlet } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { MdBugReport } from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";
import { TiHomeOutline } from "react-icons/ti";



const DashboardAll = () => {
    return (
        <div>

            {/* Dashboadr Sidbar section */}
            <div className="flex">
                <div className="w-64 min-h-screen bg-blue-200 text-green-900 font-medium">
                    <ul className="menu p-4 gap-2">

                        {/* Admin section */}
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
                        {/* Admin Section End */}

                        {/* Divider section */}
                        <div className="divider"></div>

                        <li>
                            <NavLink to="/">
                            <TiHomeOutline />
                                Home</NavLink>
                        </li>

                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>


        </div>
    );
};

export default DashboardAll;