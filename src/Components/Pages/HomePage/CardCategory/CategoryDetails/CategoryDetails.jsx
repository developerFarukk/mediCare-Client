import { useLocation, useNavigate } from "react-router-dom";
import ShopBanner from "../../../Shop/ShopBanner/ShopBanner";
import { useState } from "react";
import useAuth from "../../../../../Hooks/UseAuth/useAuth";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useMedicinCard from "../../../../../Hooks/UseMedicincard/useMedicinCard";
import { FaEye } from "react-icons/fa";
import ShopView from "../../../Shop/ShopTable/ShopView";
import { Helmet } from "react-helmet-async";



const CategoryDetails = () => {

    const { state } = useLocation();
    const axiosSecure = useAxiosSecure();
    const [selectedId, setSelectedId] = useState();
    const { user } = useAuth();
    const { medicines } = state;
    const medicin = medicines;


    const [, refetch] = useMedicinCard();

    const navigate = useNavigate();
    const location = useLocation();

    const handleId = (id) => {
        console.log(id);
        setSelectedId(id);
    };

    const handleCloseModal = () => {
        setSelectedId(null);
    };


    const hendleAddCard = (item) => {
        if (user && user.email) {
            const { category_name, image_url, per_unit_price, item_name, sellerEmail, company_name, discount_percentage, item_generic_name, item_mass_unit, short_description, _id } = item

            // send shop item to the database
            const shopItem = {
                medicinId: _id,
                email: user.email,
                userName: user.displayName,
                category_name,
                image_url,
                per_unit_price,
                item_name,
                company_name,
                discount_percentage,
                item_generic_name,
                item_mass_unit,
                short_description,
                sellerEmail


            }
            axiosSecure.post('/shop', shopItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${item_name} added to your shop cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the shop items count
                        refetch()
                    }

                })
        }
        else {
            console.log("error");
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }


    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Category Details | MediCare</title>
                </Helmet>
            </div>

            {/* Banner section */}
            <div>
                <ShopBanner></ShopBanner>
            </div>

            {/* Category table section */}
            <div className="mt-10 p-4">

                {/* Table section */}
                <div>
                    <section className="container px-4 mx-auto ">
                        <div className="flex items-center justify-center gap-x-3">
                            <h2 className="text-xl font-medium ">Total Medicin Category Item </h2>

                            <span className="px-3 py-1 text-xs text-black bg-blue-100 rounded-full dark:bg-gray-800 ">{medicin.length}</span>
                        </div>

                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                                            {/* Table Hader section */}
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-x-3">
                                                            <span>SL No</span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-x-3">
                                                            <span>Image</span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <button className="flex items-center gap-x-2">
                                                            <span>Item Name</span>
                                                        </button>
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <button className="flex items-center gap-x-2">
                                                            <span>Generic Name</span>
                                                        </button>
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Category</th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Company Name</th>

                                                    <th scope="col" className=" py-3.5  text-sm font-normal   text-gray-500 dark:text-gray-400">Action</th>
                                                </tr>
                                            </thead>

                                            {/* Table body section */}
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                                {
                                                    medicin.map((item, index) => <tr key={item._id}>

                                                        <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <p>{index + 1}</p>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <div className="flex items-center gap-x-2">
                                                                    <img className="object-cover w-10 h-10 rounded-md" src={item.image_url} alt="" />
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 ">
                                                                <h2 className="text-sm font-normal text-emerald-500">{item.item_name}</h2>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.item_generic_name}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.category_name}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.company_name}</td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-6">
                                                                <button onClick={() => hendleAddCard(item)} className="btn btn-sm bg-white border-none btn-secondary transition-colors duration-200   focus:outline-none">
                                                                    <p className="">Select</p>
                                                                </button>

                                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                    <button className="btn btn-sm btn-secondary bg-white border-none" onClick={() => document.getElementById('my_modal_5').showModal(item._id)}><FaEye onClick={() => handleId(item._id)}></FaEye></button>

                                                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                        <div className="modal-box">
                                                                            <ShopView id={selectedId}></ShopView>
                                                                            <div className="modal-action">
                                                                                <form method="dialog">
                                                                                    {/* if there is a button in form, it will close the modal */}
                                                                                    <button onClick={handleCloseModal} className="btn">Close</button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </dialog>

                                                                </button>
                                                            </div>
                                                        </td>

                                                    </tr>)
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

            </div>
        </div>
    );
};

export default CategoryDetails;