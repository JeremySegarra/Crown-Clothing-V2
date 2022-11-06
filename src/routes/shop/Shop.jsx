import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/FirebaseUtils";
import { useDispatch } from "react-redux";

import { fetchCategoriesAsync } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      console.error("ABOUT TO DISPATCH FETCH CATEGORIES TO REDUX THUNK");

      dispatch(fetchCategoriesAsync());
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=":category" element={<Category></Category>}></Route>
    </Routes>
  );
};

export default Shop;
