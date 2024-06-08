import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";


const Payment = () => {

    const axiosSecure = useAxiosSecure();

    const { data: payment = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment',
            );
            return res.data;
        }
    })


    // Status fantionality
    const handleStatus = pay => {
        axiosSecure.patch(`/payment/status/${pay._id}`, { status: 'Paid' })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${pay.name} payment has been paid `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    console.log(payment);

    return (
        <div>
            <div>
                <div className="">
                    <div className="flex justify-evenly my-4">
                        {/* <h2 className="text-3xl">All Users</h2> */}
                        <h2 className="text-3xl">Total Payment: {payment.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th className="">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payment.map((pay, index) => <tr key={pay._id}>
                                        <th>{index + 1}</th>
                                        <td>{pay.name}</td>
                                        <td>{pay.email}</td>
                                        <td>{pay._id}</td>
                                        <td>{new Date(pay.date).toLocaleDateString()}</td>

                                        <td>
                                            {/* <button className="btn btn-sm  bg-red-800 rounded-full"><p>{pay.status}</p></button> */}
                                            {pay.status === 'Paid' ? 'Paid' : <button
                                                onClick={() => handleStatus(pay)}
                                                className="btn btn-sm  bg-red-800 rounded-full">
                                                {pay.status}
                                            </button>}
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

export default Payment;