import { createAction } from "../../utils/reducer/reducerUtils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/FirebaseUtils";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

//The reducer knows the second it sees start, it will set loading to true
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//REDUX THUNK is a function that returns another function that is async
export const fetchCategoriesAsync = () => async (dispatch) => {
  //updates loading to true
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments("categories");
    //if this succeeds we set our categories and set isloading to false
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    //if we throw an error we catch it here and set error to payload and isloading to false
    dispatch(fetchCategoriesFailed(error));
  }
};
