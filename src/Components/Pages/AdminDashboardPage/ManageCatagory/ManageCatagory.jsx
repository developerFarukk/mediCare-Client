import { Link } from "react-router-dom";
import AddCategory from "./AddCategory";



const ManageCatagory = () => {
    return (
        <div>

            {/* Titel section */}
            <div className="text-center">
                <h2 className="lg:text-4xl text-2xl font-bold p-4"> Manage All Category Madicin</h2>
            </div>

            {/* Add Catagory Modal*/}
            <div className="text-end p-2">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Category</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div>
                            <AddCategory></AddCategory>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            {/* Table section */}
            <div className="overflow-x-auto">
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg"
                >
                    <thead className="">
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL No</th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Image</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Item Name
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Generic Name</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Price
                            </th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">
                                Action
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                #1
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">Image</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">Napa</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">Peracitamol</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">$20</td>
                            <td className="flex gap-2 justify-center p-1">
                                <Link
                                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Update
                                </Link>
                                <Link
                                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">Delete
                                </Link>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCatagory;