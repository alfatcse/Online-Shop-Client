import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const Payment = () => {
    const order = useLoaderData();
    console.log(order);
    const stripePromise = loadStripe(process.env.REACT_APP_stripePublicKey);
    return (
        <div>
            <h1>Payment {order.productPrice} €</h1>
            <div className='w-96 my 12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm  order={order}/>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;