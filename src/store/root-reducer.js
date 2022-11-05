import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";

//this is our actual final state shape as key value pairs
//Whenever a reducer is updated this whole root reducer object will be overwritten with a new object thus causing a Rerender of components
//NOTE: Every Single component that uses useSelector hook will re run since it is hooked into our redux store
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
