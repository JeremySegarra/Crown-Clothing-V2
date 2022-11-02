import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/CategoriesContext";

import CategoryPreview from "../../components/category-preview/CategoryPreview";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  //Object.keys() we give this an object and it will return an array of keys (hats, jackets, mens, ect.)
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title]; //this gets us our array from 'hats' key [{}, {}]
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={products}
          ></CategoryPreview>
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
