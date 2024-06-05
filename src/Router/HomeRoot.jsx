import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Share/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Pages/HomePage/Footer/Footer";



const HomeRoot = () => {

    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') ||
        location.pathname.includes('register') ||
        location.pathname.includes('checkout');

    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <ToastContainer />
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default HomeRoot;