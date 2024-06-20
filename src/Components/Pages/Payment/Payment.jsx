import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutForm'
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETAWAY_PK);
const Payment = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom></CheckOutFrom>
                </Elements>
            </div>
        </div>
    )
}

export default Payment