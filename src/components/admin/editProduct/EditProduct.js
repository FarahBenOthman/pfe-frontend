import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, selectProduct, updateProduct } from '../../../redux/features/product/productSlice';
import { getBrands, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { toast } from "react-toastify";
import ProductForm from "../productForm/ProductForm";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = useSelector((state) => state.product); //isLoading
    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    //const [filteredBrands, setFilteredBrands] = useState([]);
   // const { categories, brands } = useSelector((state) => state.category);

      useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
      setProduct(productEdit)

      setDescription(productEdit && productEdit.description ? productEdit.description : "")
      if (productEdit && productEdit.image){
        setFiles(productEdit.image)
      }
     
  }, [productEdit]);

  

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name: product?.name,
      category: product?.category,
      brand: product?.brand,
      color: product?.color,
      quantity: Number(product?.quantity),
      regularPrice: product?.regularPrice,
      price: product?.price,
      description,
      image: files,
    };

    console.log(formData);

    await dispatch(updateProduct({ id, formData }));
    // await dispatch(getProducts());
    navigate("/admin/all-products");
  };



  return (
    <div>
       <h3 className="--mt">Edit Product</h3>
      <ProductForm
       saveProduct={saveProduct}
       isEditing={true}
       product={product}
       setProduct={setProduct}
       description={description}
       setDescription={setDescription}
       files={files}
       setFiles={setFiles} 
        
       
      //  productImage={productImage}
        //imagePreview={imagePreview}
      //  setImagePreview={setImagePreview}
        
        
       
        
      />
    </div>
  )
}

export default EditProduct