
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import { FaEye } from "react-icons/fa";



const ShopTable = () => {

    // const [medicin, setMedicin] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: medicin = [] } = useQuery({
        queryKey: ['medicin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicin',);
            return res.data;
        }
    })

    console.log(medicin);


    return (
        <div className="mt-10 p-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                <div>This is Table {medicin.length}</div>
            </div>

            {/* Table section */}
            <div>
                <section className="container px-4 mx-auto text-yellow-100">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium ">Team members</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">100 users</span>
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
                                                            <button className="btn btn-sm bg-white border-none btn-secondary transition-colors duration-200   focus:outline-none">
                                                                <p className="">Select</p>
                                                            </button>

                                                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                                    <button className="btn btn-sm btn-secondary bg-white border-none" onClick={() => document.getElementById('my_modal_5').showModal()}><FaEye></FaEye></button>
                                                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                        <div className="modal-box">
                                                                            <div>
                                                                                {/* <AddCategory></AddCategory> */} <p> ami</p>
                                                                            </div>
                                                                            <div className="modal-action">
                                                                                <form method="dialog">
                                                                                    {/* if there is a button in form, it will close the modal */}
                                                                                    <button className="btn">Close</button>
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

                    {/* Pagination section */}
                    <div className="flex items-center justify-between mt-6">
                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span>
                                previous
                            </span>
                        </a>

                        <div className="items-center hidden lg:flex gap-x-3">
                            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                        </div>

                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                Next
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>

                </section>
            </div>

        </div>
    );
};

export default ShopTable;