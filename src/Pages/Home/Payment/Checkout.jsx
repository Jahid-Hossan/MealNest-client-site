import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMemberships from "../../../Hooks/useMemberships";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Checkout = ({ params }) => {
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [memberships, isPending] = useMemberships()
    const [clientSecret, setClientSecret] = useState("")
    const [transactionId, setTransactionId] = useState('')

    const { user } = useAuth()


    const membership = memberships.filter(membership => membership._id === params.id)



    const totalPrice = membership[0]?.price;

    console.log(isPending);

    useEffect(() => {
        if (!isPending && totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)

                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice, isPending])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
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
            console.log('payment error', error)
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod)
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log(confirmError)
        } else {
            console.log("success")
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                Swal.fire({
                    icon: "success",
                    position: 'top',
                    title: "Payment Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    membershipId: membership[0]?._id,
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data)
            }
        }
    }



    return (
        <form onSubmit={handleSubmit} className="w-2/5 mx-auto">
            <h2 className="text-3xl font-semibold my-5">Checkout</h2>
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
            />
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your Transaction id is {transactionId}</p>}
            <button className="btn btn-ghost bg-btn-clr hover:bg-navy text-white mt-5" type="submit" disabled={!stripe || !clientSecret} >
                Pay
            </button>

        </form>
    );
};

export default Checkout;