import { Fragment } from "react";
import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/categories/category.selector";
import CategoryPreview from "../../components/category-preview/CategoryPreview";
import Spinner from "../../components/spinner/Spinner";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);

  //Object.keys() we give this an object and it will return an array of keys (hats, jackets, mens, ect.)
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]; //this gets us our array from 'hats' key [{}, {}]
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            ></CategoryPreview>
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
