import React from 'react';
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const payment = () => {
	const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);

	const options = {
		showIcon: true,
	};
	return (
		<div>
			<Elements stripe={stripePromise}>
				<CardNumberElement
					className="form-control"
					options={options}
					onChange={(event) => {
						setCardDataChange(event);
					}}
				/>
			</Elements>
		</div>
	);
};

export default payment;
