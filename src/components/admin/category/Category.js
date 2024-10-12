import React from "react";
import "./Category.scss"
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'
//import { getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice'
//import { useSelector } from 'react-redux'

const Category = () => {
   // const dispatch = useDispatch();
  //  const { categories } = useSelector((state) => state.category);
  
    //const reloadCategory = () => {
     // dispatch(getCategories());
    //};
  //  useEffect(() => {
    //  dispatch(getCategories());
    //}, [dispatch]);

  return (
    <section>
        <div className="container coupon">
        <CreateCategory  />  {/* reloadCategory={reloadCategory} */}
        <CategoryList />
      </div>
    </section>
  )
}

export default Category