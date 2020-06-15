import React from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import {url} from '../../config/theme';


toast.configure();

const stripePromise = loadStripe('pk_test_DwUkdRiV6FqXgAtkHAHBmXWX00QCxSPxTY');


export default function Wallet({ user }) {
    console.log(user)
    const email = user.data.email
    // const url = "https://connect.stripe.com/express/oauth/authorize?client_id=ca_HSnd31NNEYqSVS8VdO4V005KftboLkw0&state={STATE_VALUE}&suggested_capabilities[]=transfers&stripe_user[email]="

    const handleClick = async (event) => {
        // Call your backend to create the Checkout session.
        const  sessionId  = await fetchCheckoutSession();
        console.log(sessionId.data.id)

        if(sessionId.data && sessionId.data.id){
            // When the customer clicks on the button, redirect them to Checkout.
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId.data.id,
            });
            console.log("error, from stripe", error)
        }
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
      };

      const fetchCheckoutSession = () => {
        return new Promise((resolve, reject) => {

            axios.post(url + "rs", {
                    email
              })
              .then(function (response) {
                resolve(response);    
              })
              .catch(function (error) {
                console.log(error);
                resolve(error)
              });
        })
      }
    return (
        <div className="order-rest-main-home">
            <h2>Wallet</h2>
            <div className="">
                <p>Current Balance</p>
    <h1 className="blue-text">€ {user.data.amount}</h1>
            </div>
            <div className="regoster-btn-top">
                <button className="waves-effect waves-light btn" role="link" onClick={handleClick}>
                    Top up € 100
             </button>
            </div>
        </div>
    )
}