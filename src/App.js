import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/home/Home";
import Header from "./components/header/Header"
import Footer from './components/footer/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser } from './redux/features/auth/authSlice';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';
import AdminOnlyRoute from './components/hiddenLink/AdminOnlyRoute';
import NotFound from './pages/404/NotFound';
import Product from './pages/shop/Product';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from "./pages/checkout/Checkout.js";
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderDetails from './pages/order/OrderDetails';
import OrderHistory from "./pages/order/OrderHistory.js";
import CheckoutPaypal from './pages/checkout/CheckoutPaypal.js';
import Wishlist from './pages/wishlist/Wishlist.js';
import ReviewProducts from "./pages/reviewProduct/ReviewProducts";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutWallet from './pages/checkout/CheckoutWallet.js';

//import { Spinner } from './components/loader/Loader';
//import Loader from './components/loader/Loader';

// Chargez votre clé publique Stripe ici
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const App = () => {
  axios.defaults.withCredentials = true;
  //const { isLoggedIn, user } = useSelector((state) => state.auth.user)
  //const dispatch = useDispatch()

  //useEffect(() => {
    //dispatch(getLoginStatus())
  //}, [dispatch])

  //useEffect(() => {
    //if (isLoggedIn && user === null) {
      // dispatch(getUser())
    //}
  //}, [dispatch, isLoggedIn, user])




 const userState = useSelector((state) => state.auth.user);
 const dispatch = useDispatch();

 const isLoggedIn = userState?.isLoggedIn || false;
 const user = userState?.user || null;

 useEffect(() => {
  dispatch(getLoginStatus()); // Appel de l'action pour vérifier l'état de la connexion
 }, [dispatch]);

 useEffect(() => {
   if (isLoggedIn && user === null) {
    dispatch(getUser()); // Appel pour récupérer les informations de l'utilisateur si connecté
   }
 }, [dispatch, isLoggedIn, user]);


  return (
    <>
    
    <BrowserRouter>
    <ToastContainer />
    
    <Header />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/shop" element={<Product />} />
       <Route path="/product-details/:id" element={<ProductDetails />} />
       <Route path="/cart" element={<Cart />} />

       <Route path="/wishlist" element={<Wishlist />} />

       <Route path="/checkout-success" element={<CheckoutSuccess />} />
       
       <Route path="/order-history" element={<OrderHistory />} />
       <Route path="/order-details/:id" element={<OrderDetails />} />

       <Route path="/checkout-details/:id" element={<OrderDetails />} />

       <Route path="/checkout-details" element={<CheckoutDetails />} />

       <Route path="/checkout-stripe" element={<Checkout />} /> 

           {/*  <Route path="/checkout-stripe" element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          } />*/}

          <Route path="/checkout-paypal" element={<CheckoutPaypal />} />

          <Route path="/checkout-wallet" element={<CheckoutWallet />} />

          <Route path="/review-product/:id" element={<ReviewProducts />} />




       <Route path="/admin/*" element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
        <Route path="*" element={<NotFound/>} />
     </Routes>
     <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;
