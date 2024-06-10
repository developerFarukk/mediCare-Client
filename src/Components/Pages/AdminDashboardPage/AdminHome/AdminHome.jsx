import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import StatusCheckPayment from "./StatusCheckPayment";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all payments
    const { data: allPayments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment');
            return res.data;
        }
    });


    const status = allPayments.reduce((acc, medi) => {
        if (!acc[medi.status]) {
            acc[medi.status] = {
                status: medi.status,
                medicines: [],
            };
        }
        acc[medi.status].medicines.push(medi);
        return acc;
    }, {});

    const allstatus = Object.values(status)
    console.log(allstatus);






    return (
        <div>
            <div className="mt-7">
                <h1 className="text-3xl text-green-500 font-bold uppercase text-center">Total Sales Revenue</h1>

                <div className="">

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {/* Total sell */}
                        <div className="w-full mt-4 px-4 py-3 hover:bg-blue-50 bg-white rounded-md shadow-md dark:bg-gray-800">
                            <div>
                                <h1 className="uppercase text-center font-bold">Total Medicin Sales</h1>
                                <h2 className="text-center text-4xl mb-5 font-bold mt-4">{allPayments.length}</h2>
                            </div>
                        </div>

                        

                        {
                            allstatus.map(status => <StatusCheckPayment key={status.status} status={status}></StatusCheckPayment>)
                        }


                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;
