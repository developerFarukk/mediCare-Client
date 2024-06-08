import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";




const SalesReport = () => {

    const axiosSecure = useAxiosSecure();

    const { data: payment = [], refetch } = useQuery({
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

            {/* Titel section */}
            <div className="text-center">
                <h2 className="lg:text-4xl text-2xl font-bold p-4"> Manage Seles Report </h2>
                {/* <h2 className="lg:text-2xl text-xl font-bold p-4"> Total Medicin : {medicinAl.length}</h2> */}
            </div>

            {/* Table section */}
            <div className="overflow-x-auto">
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg"
                >
                    <thead className="">
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL No</th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Buyer Email</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Seller Email
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Medicin Name</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Medicin Price
                            </th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">
                                Total Price
                            </th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">
                                Action
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                        {
                            payment.map((medi, index) => <tr className="hover:bg-gray-200" key={medi._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.item_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.item_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.item_generic_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">$ {medi.per_unit_price}</td>
                                <td className="items-center  text-center gap-2 justify-center p-1 ">
                                    <p>PDF</p>
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

export default SalesReport;