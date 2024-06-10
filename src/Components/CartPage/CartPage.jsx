
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useMedicinCard from "../../Hooks/UseMedicincard/useMedicinCard";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CartBanner from "./CartBanner/CartBanner";
// import { useState } from "react";

const CartPage = () => {
    const [shop, refetch] = useMedicinCard();
    const axiosSecure = useAxiosSecure();
    // const {medicin, setMedicin} = useState([]);
    const totalPrice = shop.reduce((total, item) => total + item?.per_unit_price, 0);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/shop/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your shop card has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleClearCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const deletePromises = shop.map(item => axiosSecure.delete(`/shop/${item._id}`));
                Promise.all(deletePromises).then(() => {
                    refetch();
                    Swal.fire({
                        title: "Cleared!",
                        text: "Your Medicin cart has been cleared.",
                        icon: "success"
                    });
                });
            }
        });
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;

        axiosSecure.patch(`/shop/${id}`, { quantity: newQuantity })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    // setMedicin();
                }
            });
    };

    return (
        <div>

            {/* cart Banner section */}
            <div>
                <CartBanner></CartBanner>
            </div>

            <section className="container px-4 mx-auto mt-10">
                <div className="lg:flex justify-evenly  mt-4 mb-8">
                    <h2 className="text-4xl">Total added Medicines: {shop?.length}</h2>
                    <h2 className="text-4xl">Total Price: ${totalPrice?.toFixed(2)}</h2>
                    {totalPrice >= 0.5 ? (
                        <Link to="/checkout">
                            <button className="btn btn-primary">Checkout</button>
                        </Link>
                    ) : (
                        <button disabled className="btn btn-primary">Checkout</button>
                    )}
                    {
                        shop?.length > 1 ?
                            <button onClick={handleClearCart} className="btn btn-warning">Clear Medicin</button> :
                            <button disabled onClick={handleClearCart} className="btn btn-warning">Clear Medicin</button>
                    }



                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price per unit</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Generic Name</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Category</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Company Name</th>
                                            <th scope="col" className="py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {shop.map((item) => (
                                            <tr key={item._id}>
                                                <td className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">{item.item_name}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="btn btn-sm btn-primary">-</button>
                                                        <span>{item.quantity}</span>
                                                        <p> 00 </p>
                                                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="btn btn-sm btn-primary">+</button>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
                                                        <h2 className="text-sm font-normal text-emerald-500">$ {item.per_unit_price.toFixed(2)} </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.item_generic_name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.category_name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.company_name}</td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button className="btn btn-sm bg-white border-none btn-secondary transition-colors duration-200
                                                    focus:outline-none">
                                                            <p className="">Select</p>
                                                        </button>
                                                        <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-secondary bg-white border-none text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                            <MdDelete className="h-6 w-6" />
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
            </section>

            {/* Back to Home page */}
            <div className="justify-end grid p-4 mr-4">
                <Link to="/">
                    <button className="btn btn-active btn-primary text-yellow-100">Back to Home</button>
                </Link>
            </div>
        </div>
    )
};

export default CartPage;
