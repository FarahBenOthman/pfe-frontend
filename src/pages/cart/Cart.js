import React, { useEffect } from 'react';
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity, saveCartDB } from '../../redux/features/product/cartSlice';
import { FaTrashAlt } from "react-icons/fa";
import Card from '../../components/card/Card';
import PaymentOptions from '../../components/paymentOptions/PaymentOptions';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }));
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }));
  };
  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
    
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <section>
        <div className={`container ${styles.table}`}>
          <h2>Shopping Cart</h2>
          {cartItems?.length === 0 ? (
             <>
             <p>Your cart is currently empty.</p>
             <br />
             <div>
               <Link to="/shop">&larr; Continue shopping</Link>
             </div>
           </>
          ) : (
            <>
             <table>
             <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>      
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {cartItems?.map((cart, index) => {
                   const { _id, name, price, image, cartQuantity } = cart;
                   return (
                    <tr key={_id}>


                       <td>{index + 1}</td>
                       <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cart.cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                         onClick={() => removeFromCart(cart)}
                        />
                      </td>



                    </tr>
                   )
              })}
              </tbody>
             </table>

             <div className={styles.summary}>
             <button className="--btn --btn-danger" onClick={clearCart}>Clear Cart</button>
             <div className={styles.checkout}>
                <div>
                  <Link to="/shop">&larr; Continue shopping</Link>
                </div>
             </div>
             <br />
               <Card cardClass={styles.card}>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                  </div>

                  <div className="--underline --my"></div>
                  <PaymentOptions />

               </Card>
             </div>

            </>
          ) }
        </div>
    </section>
  )
}

export default Cart