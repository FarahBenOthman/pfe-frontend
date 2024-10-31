import React from 'react'
import styles from "./Admin.module.scss";
import Navbar from '../../components/admin/navbar/Navbar';
import AdminHome from '../../components/admin/AdminHome/AdminHome';
import { Routes, Route } from 'react-router-dom';
import Category from '../../components/admin/category/Category';
import Brand from '../../components/admin/brand/Brand';
import AddProduct from '../../components/admin/addProduct/AddProduct';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts';
import EditProduct from '../../components/admin/editProduct/EditProduct';
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orders/OrderDetails";

const Admin = () => {
  return (
    <div>

<div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
            <Routes>
             <Route path="home" element={<AdminHome />} />
             <Route path="category" element={<Category />} />
             <Route path="brand" element={<Brand />} />
             <Route path="add-product" element={<AddProduct />} />
             <Route path="all-products" element={<ViewProducts />} />

             <Route path="orders" element={<Orders />} />
             <Route path="order-details/:id" element={<OrderDetails />} />


             <Route path="edit-product/:id" element={<EditProduct />} />
             
            </Routes>
          </div>
        </div>
        
    </div>
  )
}

export default Admin