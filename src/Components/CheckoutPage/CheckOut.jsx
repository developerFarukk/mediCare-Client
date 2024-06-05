
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import useMedicinCard from "../../Hooks/UseMedicincard/useMedicinCard";
import { Link } from "react-router-dom";



const CheckOut = () => {
    const [shop] = useMedicinCard();

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATWAY);

    const totalPrice = shop.reduce((total, item) => total + item.per_unit_price, 0)


    return (
        <div>
            
            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                    <div className="grid items-center lg:p-8  bg-slate-50   ">

                        {/* Card section */}
                        <div>
                            <div>
                                <div className="flex gap-4 justify-center mb-6">
                                    <h2 className="text-3xl text-blue-400 text-center  font-bold"> Your Payment </h2>
                                    <h2 className="text-black text-3xl  text-center  font-bold">$ {totalPrice}</h2>
                                </div>

                                <div className="border-4 border-yellow-300 p-6 rounded-lg">
                                    <Elements stripe={stripePromise} >
                                        <Payment></Payment>
                                    </Elements>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
                        <div>
                            <img className="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

                            <Link to="/" className="grid justify-en"><button className="btn btn-warning ">Back to Home</button></Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CheckOut;