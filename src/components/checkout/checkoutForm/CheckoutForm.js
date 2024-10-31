import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.scss";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../../redux/features/product/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../../redux/features/product/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../loader/Loader";
import Card from "../../card/Card";
import { createOrder } from "../../../redux/features/order/orderSlice";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = async () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      paymentMethod,
    };
    
    try {
      await dispatch(createOrder(formData)).unwrap(); // Enregistrement de la commande
      navigate("/checkout-success");
    } catch (error) {
      console.error("Failed to save order:", error);
      toast.error("Failed to save order. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message);
        setMessage(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful");
        saveOrder(); // Enregistrement de la commande après le paiement réussi
      }
    } catch (error) {
      console.error("Error during checkout initialization:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]} />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? <Spinner /> : "Pay now"}
                </span>
              </button>
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;

