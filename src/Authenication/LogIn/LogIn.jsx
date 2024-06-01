import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


import baground from "../../assets/Rgister/RegisterBG.png"
import regiImg from "../../assets/Rgister/RegisterImg.png"
import { useState } from "react";
import useAuth from "../../Hooks/UseAuth/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/Axiospablic/useAxiosPublic";



const LogIn = () => {

    const axiosPublic = useAxiosPublic();
    const { signInUser, googleLogIn, } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Navigation System
    const location = useLocation();
    const navigat = useNavigate();

    const handlePasswordLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);


        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                navigat(location?.state ? location.state : '/');
                toast.success("LogIn successfully")
            })
            .catch(error => {
                console.error(error)
                setPasswordError("Inpute currect password")
            })
    }

    // Google LogIn
    const handelGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                console.log(result.user);

                // insart user email imformation send to database
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: "user"  // default value
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);

                        navigat('/');
                    })
                navigat('/');
                toast.success("LogIn successfully");
            })
            .catch(() => {
                // console.log(error)
                toast.error(" login faild")
            })
    }

    return (
        <div>
            <div>
                <Link to="/"><button className="btn btn-primary">Home</button></Link>
            </div>
            {/* Dynamic Title Section */}
            <div>
                <Helmet>
                    <title> Log In | Madicare </title>
                </Helmet>
            </div>

            {/* REgister form section */}
            <div>

                <div>

                    <section className="relative py-10  sm:py-16 lg:py-24 min-h-screen">
                        <div className="absolute lg:inset-0">
                            <img className="object-cover w-full h-full" src={baground} alt="" />
                        </div>

                        <section className="relative">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mt-4 text-yellow-200">Register Now</h2>
                            </div>
                            <div className="lg:m-20 lg:flex  lg:justify-center  lg:items-center  p-4  ">

                                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                                    <img className="p-6" src={regiImg} alt="" />
                                </div>
                                <div className="flex flex-col justify-center text-center  ">
                                    <div className=" ">
                                        <div className="overflow-hidden">
                                            <div className="px-4 py-6 ">

                                                <form onSubmit={handlePasswordLogin} className="lg:mt-4 mt-16">
                                                    <div className="space-y-4 form-control">

                                                        {/* Select role section */}
                                                        {/* <select type="option" name="role" className=" select select-ghost w-full form-control text-base font-medium justify-start grid  text-[#151515] bg-white">
                                                            <option disabled selected>Select Role</option>
                                                            <option>User</option>
                                                            <option>Seller</option>
                                                        </select> */}

                                                        {/* Email section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]"> Email</label>
                                                            <div className="">
                                                                <input type="email" name="email" placeholder="Enter your email" className="block w-full p-4 input text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" required />
                                                            </div>
                                                        </div>



                                                        {/* Passwoed section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]"> Password</label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showPassword ? "text" : "password"}

                                                                    name="password" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" required />
                                                                <span className="absolute -mt-9 lg:ml-20 ml-44" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                                                                <div className="label ">
                                                                    <span className="label-text-alt text-red-600">{passwordError}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Submit button section */}
                                                        <div className='form-control'>
                                                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Login</button>
                                                        </div>

                                                    </div>

                                                </form>

                                                <div className="flex flex-col w-full">
                                                    <div className="divider divider-error"> OR </div>
                                                </div>

                                                {/* Google LogIn Section */}
                                                <div className='p-2'>
                                                    <button onClick={handelGoogleLogIn} className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Google LogIn</button>
                                                </div>

                                                <p className='mt-4'><small>Do not Have An Account ? Go to <Link to="/register" className='text-blue-500'>Register</Link> </small></p>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                    </section>

                </div>
            </div>
        </div>
    );
};

export default LogIn;