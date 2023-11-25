import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Checkout = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [error, setError] = useState('')

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
            <button className="btn btn-ghost bg-btn-clr hover:bg-navy text-white mt-5" type="submit" >
                Pay
            </button>

        </form>
    );
};

export default Checkout;