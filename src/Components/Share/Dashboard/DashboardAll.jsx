import { Link, NavLink, Outlet } from "react-router-dom";

import { TiHomeOutline } from "react-icons/ti";
import useRole from "../../../Hooks/Role/useRole";
import UserBoard from "../../Pages/UserDashboard/UserBoard/UserBoard";
import SellerBoard from "../../Pages/SellerDashbordPage/SellerBoard/SellerBoard";
import AdminBoard from "../../Pages/AdminDashboardPage/AdminBoard/AdminBoard";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import iconImg from "../../../assets/Rgister/RegisterImg.png"



const DashboardAll = () => {

    const [role, isLoading] = useRole()
    console.log(role, isLoading);


    return (
        <div>

            {/* Dashboadr Sidbar section */}
            <div className="flex">
                <div className="w-64 min-h-screen bg-blue-200 text-green-900 font-medium">

                    <Link className="btn btn-ghost text-xl justify-center text-center p-4 mt-4 flex"> <img className="h-8 w-12" src={iconImg} alt="" /> Madicare</Link>
                    <h2 className="uppercase text-xl font-bold text-center p-2 mt-4 text-blue-500 bg-green-100">{role} DASHBOARD</h2>

                    <ul className="menu p-4 gap-2">

                        {/* Admin section */}

                        {role === 'admin' && <AdminBoard></AdminBoard>}


                        {/* ******************************************************* */}

                        {/* Seller dashboard section */}

                        {role === 'Seller' && <SellerBoard></SellerBoard>}

                        {/*  User dashboard  ***************************************************** */}

                        {role === 'User' && <UserBoard></UserBoard>}


                        {/* Divider section */}
                        <div className="divider"></div>

                        <li>
                            <NavLink to="/">
                                <TiHomeOutline />
                                Back to Home Page</NavLink>
                        </li>

                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <ToastContainer />
                    <Outlet></Outlet>
                </div>
            </div>


        </div>
    );
};

export default DashboardAll;