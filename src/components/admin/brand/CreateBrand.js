import React, { useEffect, useState } from "react";
import Card from "../../card/Card";

import { createBrand, getBrands, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateBrand = () => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const { categories } = useSelector((state) => state.category);

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
   // dispatch(getBrands());
  }, [dispatch]);


  const saveBrand = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
        return toast.error("Brand name must be up to 2 characters");
      }
      if (!category) {
        return toast.error("Please add a parent category");
      }
      const formData = {
        name,
        category,
      };
     // console.log(formData);
      await dispatch(createBrand(formData));
      await dispatch(getBrands());
      setName("");
     // reloadBrands();
  
  }

  return (
    <>
     <div className="--underline"></div>
      <br />
      <div className="--mb2">
        <h3>Create Brand</h3>
        <p>
          Use the form to <b>Create a Brand.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveBrand}>
            <label>Brand Name:</label>
            <input
              type="text"
              placeholder="Brand name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
             <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
            </select>

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateBrand;