import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "../redux/features/product/cartSlice"
import checkoutReducer from "../redux/features/checkout/checkoutSlice";
import orderReducer from "../redux/features/order/orderSlice";



export const store = configureStore({
    reducer : {
         auth: authReducer,
         category: categoryReducer,
         product: productReducer,
         filter: filterReducer,
         cart: cartReducer,
         checkout: checkoutReducer,
         order: orderReducer,
    }
})