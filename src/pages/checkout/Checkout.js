import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Checkout.scss";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/checkoutForm/ChechkoutForm";
import { extractIdAndCartQuantity } from "../../utils";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);

  const user = useSelector(selectUser);
  const customerEmail = user?.email; // Optional chaining to prevent errors if user isn't defined
  const shippingAddress = useSelector(selectShippingAddress);

  const description = `LightFitness payment: email: ${customerEmail}, Amount: ${cartTotalAmount}`;
  const productIDs = extractIdAndCartQuantity(cartItems);

  useEffect(() => {
    if (productIDs.length && customerEmail && shippingAddress) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          userEmail: customerEmail,
          shipping: shippingAddress,
          description,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then((json) => Promise.reject(json));
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
          setMessage("Failed to initialize checkout");
          toast.error("Something went wrong!!!");
          console.log(error);
        });
    } else {
      setMessage("Missing necessary information to initialize checkout.");
    }
  }, [productIDs, customerEmail, shippingAddress]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
