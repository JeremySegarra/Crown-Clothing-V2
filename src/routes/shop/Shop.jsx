import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/FirebaseUtils";
import { useDispatch } from "react-redux";

import { setCategories } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");

      console.error("ABOUT TO START REDUCING OVER CATEGORIES ARRAY");
      console.log("categoriesArray: ", categoriesArray);
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=":category" element={<Category></Category>}></Route>
    </Routes>
  );
};

export default Shop;
