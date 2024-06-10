// client/src/pages/Donate.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Donate.css';

// Make sure to replace this with your own Stripe public key
const stripePromise = loadStripe('your-stripe-public-key-here');

const DonateForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Handle the payment method as per your server logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donate-form">
      <h2>Donate</h2>
      <p>Support us by making a donation.</p>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" />
      </div>
      <button type="submit" disabled={!stripe}>
        Donate
      </button>
    </form>
  );
};

const Donate = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
};

export default Donate;
