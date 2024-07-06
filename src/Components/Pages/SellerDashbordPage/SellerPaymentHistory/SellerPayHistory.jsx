import { Helmet } from "react-helmet-async";
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";


const SellerPayHistory = () => {

    const axiosSecure = useAxiosSecure();

    const { data: payment = [], } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment',
            );
            return res.data;
        }
    })

    console.log(payment);


    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Payment History | MediCare</title>
                </Helmet>
            </div>

            <div>
                <div>

                    <div className="text-center">
                        <h2 className="lg:text-4xl text-2xl font-bold p-4">Payment History</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg">
                            <thead className="bg-green-300">
                                <tr>
                                    <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL</th>
                                    <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Buyer Email</th>
                                    <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Seller Email</th>
                                    <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Price</th>
                                    <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Payment Status</th>
                                    <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 p-1 dark:divide-gray-700">
                                {payment.map((payment, index) => (
                                    <tr className="hover:bg-blue-200" key={payment._id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{payment.email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                            {payment.sellerEmail.join(', ')}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">${payment.price}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{payment.status}</td>
                                        <td className="items-center gap-2 justify-center p-1 text-end">
                                            <p>{new Date(payment.date).toLocaleDateString()}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SellerPayHistory;