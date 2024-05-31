import { Link, NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";



const Navbar = () => {

    const navMenu = <>

        <li><NavLink to="/" > Home </NavLink></li>
        <li><NavLink to="shop" > Shop </NavLink></li>

        <li><NavLink to="cart" >
            <div className="indicator">
                <span><TiShoppingCart className="h-7 w-7" /></span>
                <span ></span>
                <span className="badge badge-md  indicator-item">+0</span>
            </div>
        </NavLink></li>

        <li><Link to="/" className="p-1 m-0" >

            <select className="select select-bordered select-sm p-0 m-1">
                <option>English</option>
                <option>Bangla</option>
            </select>


        </Link></li>

    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                            {navMenu}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenu}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link className="btn">Join Us</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;