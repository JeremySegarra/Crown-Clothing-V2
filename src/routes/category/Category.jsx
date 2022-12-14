import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/categories/category.selector";

import ProductCard from "../../components/product-card/ProductCard";
import Spinner from "../../components/spinner/Spinner";

import { CategoryContainer, Title } from "./Category.Styles.jsx";

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  //if category or categories map changes we can set our products state to the value of our array of object we want to show
  //such as hats, jackets, ect.
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
