import { createAction } from "../../utils/reducer/reducerUtils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
  const exisitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //we found the item so return a new array, do the id's match? if so then return a new object with the same properties
  //and increase its quantity by 1, otherwise return the original cartItem where the id's do not match
  if (exisitingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //we want to spread all the existing objects in a new array and add the new product object with a quantity field
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //check if the cart item exists
  const exisitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //if the quantity of the item is 1 we can remove it from the array and return a new array
  if (exisitingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //We create a new array because react will rerender the component since it is a new object in memory, the PROP will be different
  //if the item quantity is greater than 1
  //return back cart items with matching cart item and reduce the quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (currentCartItemsState, productToAdd) => {
  const newCartItems = addCartItem(currentCartItemsState, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (currentCartItemsState, cartItemToRemove) => {
  const newCartItems = removeCartItem(currentCartItemsState, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (currentCartItemsState, cartItemToClear) => {
  const newCartItems = clearCartItem(currentCartItemsState, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
