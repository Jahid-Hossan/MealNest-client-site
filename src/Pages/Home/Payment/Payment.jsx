import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";
import useMemberships from "../../../Hooks/useMemberships";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishable_key)
const Payment = () => {
    const params = useParams();


    return (
        <div>
            <Helmet>
                <title>MealNest | Payment</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <Checkout params={params}></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;