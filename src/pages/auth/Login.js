import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.jpeg"
import Card from "../../components/card/Card"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice'
//import { getCartDB, saveCartDB } from '../../redux/features/product/cartSlice'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);

    const [urlParams] = useSearchParams();
    const redirect = urlParams.get("redirect");
   // console.log(urlParams.get("redirect"));
    

    const loginUser = async (e) => {
        e.preventDefault();
        //console.log(name, email, password, cPassword);
        if (!email || !password){
            return toast.error("All fields are required")
        }
       
        if (!validateEmail(email)){
            return toast.error("Please enter a valid email")
        }
        
        const userData = {
            email,
            password,
        };
       // console.log(userData);
        try {
            await dispatch(login(userData));
        } catch (error) {
            console.error('Login failed:', error);
        } 
    }

    useEffect(() => {
        if (isLoggedIn && isSuccess) {
           // if (redirect === "cart") {
             // dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem("cartItems")),}));
            //  return navigate("/cart");
           // }
            //dispatch(getCartDB());
             navigate("/");
            // window.location.reload();
          }

        dispatch(RESET_AUTH())
      }, [isSuccess, isLoggedIn, dispatch, navigate, redirect]) 

  return (
    <>

    {isLoading && <Loader />}
    
    <section className={`container ${styles.auth}`}>
        <div className={styles.img} >
            <img src={loginImg} alt="Login" width="250" />
        </div>
        <Card>
        <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
            <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
            </form>
            <span className={styles.register}>
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
            </span>
        </div>
        </Card>
        
    </section>
    </>
  )
}

export default Login; 