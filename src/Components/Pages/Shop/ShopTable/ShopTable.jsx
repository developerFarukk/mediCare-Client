
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import ShopView from "./ShopView";
import useAuth from "../../../../Hooks/UseAuth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useMedicinCard from "../../../../Hooks/UseMedicincard/useMedicinCard";
import { useState, useMemo } from "react";

const ShopTable = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedId, setSelectedId] = useState();
    const { user } = useAuth();
    const [, refetch] = useMedicinCard();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: medicin = [] } = useQuery({
        queryKey: ['medicin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicin');
            return res.data;
        }
    });

    const handleId = (id) => {
        setSelectedId(id);
    };

    const handleCloseModal = () => {
        setSelectedId(null);
    };

    const hendleAddCard = (item) => {
        if (user && user.email) {
            const { category_name, image_url, per_unit_price, item_name, sellerEmail, company_name, discount_percentage, item_generic_name, item_mass_unit, short_description, _id } = item;
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
            };
            axiosSecure.post('/shop', shopItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${item_name} added to your shop cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                });
        } else {
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
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const filteredAndSortedData = useMemo(() => {
        return medicin
            .filter(item =>
                item.item_name.toLowerCase().includes(search.toLowerCase()) ||
                item.item_generic_name.toLowerCase().includes(search.toLowerCase()) ||
                item.company_name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.per_unit_price - b.per_unit_price;
                } else {
                    return b.per_unit_price - a.per_unit_price;
                }
            });
    }, [medicin, search, sortOrder]);

    const totalItems = filteredAndSortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mt-10 p-4">
            <div>
                <section className="container px-4 mx-auto">
                    <div className="flex items-center text-center text-2xl justify-center gap-x-3">
                        <h2 className="font-medium">Total Medicin Item</h2>
                        <span className="px-3 py-1 text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{totalItems}</span>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <input
                            type="text"
                            placeholder="Search by name, generic name, or company name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            className="p-2 border border-gray-300 rounded"
                        >
                            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
                        </button>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 justify-center dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>SL No</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Image</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    <button className="gap-x-2">
                                                        <span className="text-center">Item Name</span>
                                                    </button>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Generic Name</span>
                                                    </button>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">Category</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">Company Name</th>
                                                <th scope="col" className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {paginatedData.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <p>{(currentPage - 1) * itemsPerPage + index + 1}</p>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <img className="object-cover w-10 h-10 rounded-md" src={item.image_url} alt="" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
                                                            <h2 className="text-sm font-normal text-emerald-500">{item.item_name}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="text-center justify-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.item_generic_name}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.category_name}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.company_name}</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <button onClick={() => hendleAddCard(item)} className="btn btn-sm bg-white border-none btn-secondary transition-colors duration-200 focus:outline-none">
                                                                <p className="">Select</p>
                                                            </button>
                                                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                <button className="btn btn-sm btn-secondary bg-white border-none" onClick={() => document.getElementById('my_modal_5').showModal(item._id)}>
                                                                    <FaEye onClick={() => handleId(item._id)}></FaEye>
                                                                </button>
                                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                    <div className="modal-box">
                                                                        <ShopView id={selectedId}></ShopView>
                                                                        <div className="modal-action">
                                                                            <form method="dialog">
                                                                                <button onClick={handleCloseModal} className="btn">Close</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </dialog>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            disabled={currentPage === 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Previous</span>
                        </button>
                        <div className="items-center hidden lg:flex gap-x-3">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-2 py-1 text-sm rounded-md dark:bg-gray-800 ${currentPage === index + 1 ? "text-blue-500 bg-blue-100/60" : "text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            disabled={currentPage === totalPages}
                        >
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShopTable;
