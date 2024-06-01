import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Share/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



const HomeRoot = () => {

    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <ToastContainer />
            <Outlet></Outlet>
        </div>
    );
};

export default HomeRoot;