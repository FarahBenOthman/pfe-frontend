import React from 'react';
import "./Brand.scss";
import CreateBrand from './CreateBrand';
import BrandList from './BrandList';
//import { getBrands } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
//import { useDispatch } from 'react-redux';

const Brand = () => {
 // const dispatch = useDispatch();
 // const reloadBrands = () => {
   // dispatch(getBrands());
 // };
  return (
    <section>
    <div className="container coupon">
      <CreateBrand   />   {/* reloadBrands={reloadBrands} */}
      <BrandList  />   {/* brands={brands} */}
    </div>
  </section>
  )
}

export default Brand