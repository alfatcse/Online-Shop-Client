import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const { productPrice,buyerEmail,buyerName,sellername ,selleremail} = order;
    const [succeeded,setSucceeded]=useState('');
    const [transactionID,settransactionID]=useState('');
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5009/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ productPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);
    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        setSucceeded('');
        const { paymentIntent, error:confirmReeor } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                       name:buyerName,
                       email:buyerEmail
                    },
                },
            }, 
        );
        if(confirmReeor){
            setCardError(confirmReeor.message);
            return;
        }
        if(paymentIntent.status==="succeeded"){
            setSucceeded('Your payment Completed');
            settransactionID(paymentIntent.id);
            fetch(`http://localhost:5009/paymentstatusupdate/${order._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User update Successfully');
                }
            })
        } 

        console.log(paymentIntent);
    }
    return (
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
            />
            <button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-500'>{cardError}</p>
            {
                succeeded&&<p className='text-green-500'>{succeeded} with Transaction ID:{transactionID}</p>

            }
        </form>
    );
};

export default CheckoutForm;