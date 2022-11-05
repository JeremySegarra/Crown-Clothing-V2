//Memoization is the process of caching the previous value of something so if the input has not changed, then return back the same output.
//PURE FUNCTION: const add = (a, b) => a + b;
import { createSelector } from "reselect";

//So this will get our categories slice
const selectCategoryReducer = (state) => state.categories;

//the first argument will be an array of parameters for the second argument of createSelector which expects a function, Can have multiple params
//NOTE: The reason this is a memoized selector is because, if the categoriesSlice that we get from selectCategoryReducer is the same value
//(categoriesSlice) => categoriesSlice.categories will not rerun because it has been cached
export const selectCategoriesArray = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//The idea here is we do not want to run reduce unless our selectCategoriesArray has changed
//MEMOIZED SELECTOR FUNCTION
export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

//UN MEMOIZED SELECTOR FUNCTION

// export const selectCategoriesMap = (state) => {
//   console.log("selector fired");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };
