import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";

import SelectRole from "./SelectRole";
import { Helmet } from "react-helmet-async";



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

    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Manage User | MediCare</title>
                </Helmet>
            </div>

            <div>
                <div>
                    <div className="flex justify-evenly my-4">
                        {/* <h2 className="text-3xl">All Users</h2> */}
                        <h2 className="text-3xl">Total Users: {users.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table   w-full">
                            {/* head */}
                            <thead className="bg-green-300  rounded-full">
                                <tr className="text-black ">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-none  ">
                                {
                                    users.map((user, index) => <tr className="bg-none hover:bg-blue-200" key={user._id}>
                                        <th className="">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>

                                        <td>{user.role}</td>
                                        <td>

                                            <SelectRole user={user} refetch={refetch} ></SelectRole>

                                        </td>
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