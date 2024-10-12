import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;


// Create category
const createCategory = async (formData) => {
    const response = await axios.post(
      API_URL + "category/createCategory",
      formData, {
        withCredentials: true,
      }
    );
    return response.data;
  };

// Get categories
const getCategories = async () => {
    const response = await axios.get(API_URL + "category/getCategories");
    return response.data;
  };

// Delete category
const deleteCategory = async (slug) => {
    const response = await axios.delete(API_URL + "category/" + slug);
    return response.data.message;
  };


// Create Brand
const createBrand = async (formData) => {
  const response = await axios.post(API_URL + "brand/createBrand", formData);
  return response.data;
};
  

// Get brand
const getBrands = async () => {
  const response = await axios.get(API_URL + "brand/getBrands");
  return response.data;
};

// Delete brand
const deleteBrand = async (slug) => {
  const response = await axios.delete(API_URL + "brand/" + slug);
  return response.data.message;
};



  const categoryAndBrandService = { createCategory, getCategories, deleteCategory, createBrand, getBrands, deleteBrand };
  
  export default categoryAndBrandService;
  