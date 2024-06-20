import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
// import { AuthContext } from "../../../Auth/Provider/AuthProvider";
// import useAxiosPublic from "../../../hook/useAxiosPublic/useAxiosPublic";
// import useBioData from "../../../hook/useBioData/useBioData";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import Container from "../../../Shared/Container/Container";
import { useNavigate } from "react-router-dom";
// import useBioData from "../../../hook/useBioData/useBioData";

const CheckOutForm = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const { user } = useAuth()
    const totalPrice = cart.reduce((total, item) => total + parseInt(item.unit_price), 0)


    useEffect(() => {
        if (totalPrice > 0)
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
    }, [axiosSecure, totalPrice])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });



        if (error) {
            console.log('[error]', error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong!`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });

            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }




        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous email',
                    name: user?.displayName || 'anonymous name'
                }
            }
        })

        if (confirmError) {
            console.log('confirmError', confirmError);
            Swal.fire({
                icon: "error",
                title: "Uhh...",
                text: "Something went wrong!",
            });

        }
        else {
            console.log('paymentIntent', paymentIntent);

            // payment success
            if (paymentIntent.status === 'succeeded') {
                // console.log(paymentIntent.id, " paymentIntent id")
                setTransactionId(paymentIntent.id)


                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    name: user?.name,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map(item => item._id),
                    itemId: cart.map(item => item.cartId),
                    seller_email: cart.map(item => item.seller_email),
                    status: 'pending'
                }


                const res = await axiosSecure.post('/payments', payment)
                console.log('payment save', res.data)
                refetch()

                if (res.data?.paymentResult?.insertedId) {
                    navigate('/payment/invoice')
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Thanks. your payment was successful!",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }








    }

    return (
        <Container>

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
                    className="border-2 border-blue-400 p-10"
                />
                <p className="text-red-600 font-bold text-xl">{error}</p>
                {transactionId && <p className="text-green-500 text-xl font-bold mt-5">Your Transaction id : {transactionId}</p>}
                <button className="inline-flex items-center  lg:ml-60 justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black cursor-pointer mt-10" type="submit" disabled={!stripe || !clientSecret}>
                    Pay Now
                </button>
            </form>
        </Container>
    );
};

export default CheckOutForm;