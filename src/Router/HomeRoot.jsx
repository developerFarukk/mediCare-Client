import { Outlet } from "react-router-dom";
import Navbar from "../Components/Share/Navbar";



const HomeRoot = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeRoot;