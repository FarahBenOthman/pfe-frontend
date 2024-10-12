import React, { useEffect, useState } from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
import { AdminOnlyLink } from '../hiddenLink/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalQuantity } from '../../redux/features/product/cartSlice';

export const logo = ( 
    <div className={styles.logo}>
    <Link to="/">
        <h2>
            E<span>Shop</span>
        </h2>
    </Link>
</div>
);

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")

const Header = () => {

const [ShowMenu, setShowMenu] = useState(false)
const [scrollPage, setScrollPage] = useState(false);
const cartTotalQuantity = useSelector(selectCartTotalQuantity);
const cartItems = useSelector(selectCartItems);
const dispatch = useDispatch()
const navigate = useNavigate()

const fixNavbar = () => {
    if (window.scrollY > 50) {
       setScrollPage(true)
    } else {
        setScrollPage(true)
    }
         
    
};
window.addEventListener("scroll", fixNavbar);

const toggleMenu = () => {
    setShowMenu(!ShowMenu)
};

const hideMenu = () => {
    setShowMenu(false)
};

    const logoutUser = async () => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        navigate("/login")
    };

    useEffect(() => {
          dispatch(CALCULATE_TOTAL_QUANTITY());
        }, [dispatch, cartItems]);



    const cart = (
        <span className={styles.cart}>
           <Link to="/cart">
               Cart
               <FaShoppingCart size={20} />
               <p>{cartTotalQuantity}</p>
           </Link>
        </span>
    )
    return (
  <header className={scrollPage ? `${styles.fixed}` : null}>
    <div className={styles.header}>
        {logo}

    <nav className={ShowMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>


        <div className={ShowMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}>

        </div>



        <ul>
            <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#ccc" onClick={hideMenu}  /> 
            </li>
           <li>
              <NavLink to="/shop" className={activeLink} >
              Shop
              </NavLink>
           </li>
           <li>
           <AdminOnlyLink>
                <NavLink to="/admin/home" className={activeLink}>
                  | &nbsp; Admin
                </NavLink>
              </AdminOnlyLink>
             
           </li>
        </ul>

        <div className={styles["header-right"]}>

            <span className={styles.links}>
                <ShowOnLogin>
               <NavLink to={"profile"}  >
                <FaUserCircle size={16} color="#ff7722" />
                <UserName />
               </NavLink>
               </ShowOnLogin>
               <ShowOnLogout>
               <NavLink to={"login"} className={activeLink}>
                Login
               </NavLink>
               </ShowOnLogout>
               <ShowOnLogout>
               <NavLink to={"register"} className={activeLink}>
                Register
               </NavLink>
               </ShowOnLogout>
               <ShowOnLogin>
               <NavLink to={"order-history"} className={activeLink}>
                My order
               </NavLink>
               </ShowOnLogin>
               <ShowOnLogin>
               <Link to={"/"} onClick={logoutUser}>
                Logout
               </Link>
               </ShowOnLogin>
            </span>
            {cart}
        </div>
    </nav>
    <div className={styles["menu-icon"]}>
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
    </div>
    </div>
  </header>
    );
}

export default Header;