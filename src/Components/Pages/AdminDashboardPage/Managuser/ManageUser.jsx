import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";
import { useEffect } from "react";



const ManageUser = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',
            );
            return res.data;
        }
    })

    useEffect(() => {
        refetch(); // Trigger a refetch when the component mounts
    }, [refetch]);

    // const mutation = updateUserRole();

    // const handleUpdateUserRole = async (userId, role) => {
    //     try {
    //         await mutation.mutateAsync({ userId, role }); // Call the mutation function
    //     } catch (error) {
    //         console.error('Error updating user role:', error);
    //     }
    // };

    // Admin fantionality
    // const handleMakeAdmin = user => {
    //     axiosSecure.patch(`/users/admin/${user.email}`)
    //         .then(res => {
    //             console.log(res.data)
    //             if (res.data.modifiedCount > 0) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${user.name} is an Admin Now!`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }



    // User funtionality
    // const handleDeleteUser = user => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/users/${user._id}`)
    //                 .then(res => {
    //                     if (res.data.deletedCount > 0) {
    //                         refetch();
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "user or seller has been deleted.",
    //                             icon: "success"
    //                         });
    //                     }
    //                 })
    //         }
    //     });
    // }


    return (
        <div>
            <div>
                <div>
                    <div className="flex justify-evenly my-4">
                        {/* <h2 className="text-3xl">All Users</h2> */}
                        <h2 className="text-3xl">Total Users: {users.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>

                                        <td>{user.role}</td>
                                        <td>
                                            {/* {user.role !== 'admin' && (
                                                <button onClick={() => updateUserRole(user._id, 'admin')}>
                                                    Admin
                                                </button>
                                            )}
                                            {user.role !== 'seller' && (
                                                <button onClick={() => updateUserRole(user._id, 'seller')}>
                                                    Seller
                                                </button>
                                            )}
                                            {user.role !== 'user' && (
                                                <button onClick={() => updateUserRole(user._id, 'user')}>
                                                    User
                                                </button>
                                            )} */}
                                        </td>


                                        {/* <td>
                                            {user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-lg bg-orange-500">
                                                <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                            </button>}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-ghost btn-lg">
                                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        </td> */}
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;