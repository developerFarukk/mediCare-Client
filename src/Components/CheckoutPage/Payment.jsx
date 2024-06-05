import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/useAuth";
import useMedicinCard from "../../Hooks/UseMedicincard/useMedicinCard";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";




const Payment = () => {

    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [shop, refetch] = useMedicinCard();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = shop.reduce((total, item) => total + item.per_unit_price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment errror', error);
            setError(error.message);
        }

        else {
            console.log('payment mathod', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: shop.map(item => item._id),
                    menuItemIds: shop.map(item => item.medicinId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for Confarmation Order",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/invoice')
                }

            }
        }
    }



    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    > </CardElement>
                    <button className="btn btn-sm ml-4 btn-primary mt-6 " type="submit" disabled={!stripe || !clientSecret}>
                        Checkout
                    </button>
                    
                    <p className="text-red-600">{error}</p>
                </form>
            </div>
        </div>
    );
};

export default Payment;