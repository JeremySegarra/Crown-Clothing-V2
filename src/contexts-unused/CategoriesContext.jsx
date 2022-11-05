import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/FirebaseUtils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(
      //   "categoryMap inside useEffect in productsContext: ",
      //   categoryMap
      // );
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

//****** We only used this use effect once in order to add our hardcoded object in one batch to our DB ******/
//import SHOP_DATA from "../shop-data.js";
//import { addCollectionAndDocuments } from "../utils/FirebaseUtils.js";

// useEffect(() => {
//categories is the key i want to add for the collection, and the data for what we want to add
//   addCollectionAndDocuments("categories", SHOP_DATA);
// }, []);
