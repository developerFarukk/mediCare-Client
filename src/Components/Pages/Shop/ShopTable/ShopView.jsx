import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";




const ShopView = ({ id }) => {

    const axiosSecure = useAxiosSecure();

    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemId = (id) => axiosSecure.get(`/medicin/${id}`).then(response => response.data).catch(error => {
        console.error(`Error fetching item with id ${id}:`, error);
        throw error;
    });

    useEffect(() => {
        const item = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await itemId(id);
                setItem(data);
            } catch (error) {
                setError(error);
            } 
            finally {
                setIsLoading(false);
            }
        };

        if (id) {
            item();
        }
    }, [id]);

    if (isLoading) return <div><span className="loading loading-spinner text-warning"></span></div>;
    if (error) return <div>Error loading data: {error.message}</div>;


    console.log(item);

    return (
        <div>
            {/* Card section */}
            <div>
                <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                    <img
                        alt=""
                        src={item.image_url}
                        className="h-56 w-full rounded-md object-cover"
                    />

                    <div className="mt-2 text-start ">
                        <h2 className="text-center"> {item.category_name} </h2>
                        <h2>Medicin name : {item.item_name}</h2>
                        <h2>Company name : {item.company_name}</h2>
                        <h2>Discount : {item.discount_percentage}</h2>
                        <h2>Generic Name : {item.item_generic_name}</h2>
                        <h2>Mass Unit : {item.item_mass_unit}</h2>
                        <h2>Price : {item.per_unit_price}</h2>
                        <h2>Description : {item.short_description}</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ShopView;