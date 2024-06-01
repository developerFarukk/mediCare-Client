
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import baground from "../../assets/Rgister/RegisterBG.png"
import regiImg from "../../assets/Rgister/RegisterImg.png"
import useAuth from "../../Hooks/UseAuth/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";



const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigat = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        // const userInfo = {
                        //     name: data.name,
                        //     email: data.email
                        // }
                        // axiosPublic.post('/users', userInfo)
                        //     .then(res => {
                        //         if (res.data.insertedId) {
                        //             console.log('user added to the database')
                        //             reset();
                        //             Swal.fire({
                        //                 position: 'top-end',
                        //                 icon: 'success',
                        //                 title: 'User created successfully.',
                        //                 showConfirmButton: false,
                        //                 timer: 1500
                        //             });
                        //             navigate('/');
                        //         }
                        //     })


                        console.log('user profile info updated')
                        toast.success('Registered successful')

                        reset();
                        // Swal.fire({
                        //     position: 'top-end',
                        //     icon: 'success',
                        //     title: 'User created successfully.',
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // });
                        navigat('/');

                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div>

            {/* Dynamic Title Section */}
            <div>
                <Helmet>
                    <title> Sign Up | Madicare </title>
                </Helmet>
            </div>

            {/* REgister form section */}
            <div>

                <div>

                    <section className="relative py-10  sm:py-16 lg:py-24 min-h-screen">
                        <div className="absolute lg:inset-0">
                            <img className="object-cover w-full h-full" src={baground} alt="" />
                        </div>
                        {/* <div className="absolute inset-0 bg-gray-900/20"></div> */}

                        <section className="relative">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mt-4 text-yellow-200">Register Now</h2>
                            </div>
                            <div className="lg:m-20 lg:flex  lg:justify-center  lg:items-center  p-4 lg:flex-row-reverse ">

                                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                                    <img className="p-6" src={regiImg} alt="" />
                                </div>
                                <div className="flex flex-col justify-center text-center  ">
                                    <div className=" ">
                                        <div className="overflow-hidden">
                                            <div className="px-4 py-6 ">

                                                <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-4 mt-16">
                                                    <div className="space-y-4 form-control">

                                                        {/* Name section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]"> Name</label>
                                                            <div className="">
                                                                <input type="name" {...register("name", { required: true })} name="name" placeholder="Enter your name" className="input block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" required />
                                                                {errors.name && <span className="text-red-600">Name is required</span>}
                                                            </div>
                                                        </div>

                                                        {/* Photo URL section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]">Photo URL</label>
                                                            <div className="">
                                                                <input type="text" name="photoURL" {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className=" input block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                                            </div>
                                                        </div>

                                                        {/* Select role section */}
                                                        <select type="option" {...register("role", { required: true })} name="role" className=" select select-ghost w-full form-control text-base font-medium justify-start grid  text-[#151515] bg-white">
                                                            <option disabled selected>Select Role</option>
                                                            <option>User</option>
                                                            <option>Seller</option>
                                                        </select>

                                                        {/* Email section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]"> Email</label>
                                                            <div className="">
                                                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter your email" className="block w-full p-4 input text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" required />
                                                                {errors.email && <span className="text-red-600">Email is required</span>}
                                                            </div>
                                                        </div>



                                                        {/* Passwoed section */}
                                                        <div className='form-control'>
                                                            <label className="text-base font-medium justify-start grid ml-2 text-[#151515]"> Password</label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showPassword ? "text" : "password"}
                                                                    {...register("password", {
                                                                        required: true,
                                                                        minLength: 6,
                                                                        maxLength: 20,
                                                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                                                    })}
                                                                    name="password" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" required />
                                                                <span className="absolute -mt-9 lg:ml-20 ml-44" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                                                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                                            </div>
                                                        </div>

                                                        {/* Submit button section */}
                                                        <div className='form-control'>
                                                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Sign Up</button>
                                                        </div>

                                                    </div>

                                                </form>
                                                <p className='mt-4'><small>Already registered? Go to <Link to="/login" className='text-blue-500'>Log In</Link> </small></p>
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

export default Register;