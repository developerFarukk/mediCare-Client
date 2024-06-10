import { Link } from "react-router-dom";
import AddCategory from "./AddCategory";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import useMedicinCard from "../../../../Hooks/UseMedicincard/useMedicinCard";
import Swal from "sweetalert2";
import useMediAll from "../../../../Hooks/UseMedicinAll/useMediAll";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";



const ManageCatagory = () => {

    const axiosSecure = useAxiosSecure();
    const [medicinAl, refetch] = useMediAll();
    const modalRef = useRef(null);

    const { data: medicin = [] } = useQuery({
        queryKey: ['medicin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicin',);
            return res.data;
        }
    })

    console.log(medicin);




    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };


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

                axiosSecure.delete(`/medicin/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your shop card has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Manage Category | MediCare</title>
                </Helmet>
            </div>

            {/* Titel section */}
            <div className="text-center">
                <h2 className="lg:text-4xl text-2xl font-bold p-4"> Manage All Category Madicin</h2>
                <h2 className="lg:text-2xl text-xl font-bold p-4"> Total Medicin : {medicinAl.length}</h2>
            </div>

            {/* Add Catagory Modal*/}
            <div className="text-end p-2">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn btn-primary" onClick={() => modalRef.current.showModal()}  >Add Category</button>
                <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div>
                            <AddCategory onSuccess={handleCloseModal} ></AddCategory>
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

                        {
                            medicin.map((medi, index) => <tr className="hover:bg-gray-200" key={medi._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    <img className="h-10 w-10 rounded-md" src={medi.image_url} alt="" />
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.item_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.item_generic_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">$ {medi.per_unit_price}</td>
                                <td className="items-center  text-center gap-2 justify-center p-1 ">
                                    <Link to={`/deshoard/updatecatagory/${medi._id}`}
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                        <button > Update</button>
                                    </Link>
                                    <Link
                                        className="inline-block rounded bg-indigo-600 ml-2 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700" onClick={() => handleDelete(medi._id)}>Delete
                                    </Link>
                                </td>
                            </tr>)
                        }

                        {/* <tr>

                        </tr> */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCatagory;