import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducerUtils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartContextProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// import { useEffect, useState, createContext } from "react";

// const addCartItem = (cartItems, productToAdd) => {
//   const exisitingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   //we found the item so return a new array, do the id's match? if so then return a new object with the same properties
//   //and increase its quantity by 1, otherwise return the original cartItem where the id's do not match
//   if (exisitingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }
//   //we want to spread all the existing objects in a new array and add the new product object with a quantity field
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   //check if the cart item exists
//   const exisitingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   //if the quantity of the item is 1 we can remove it from the array and return a new array
//   if (exisitingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }

//   //We create a new array because react will rerender the component since it is a new object in memory, the PROP will be different
//   //if the item quantity is greater than 1
//   //return back cart items with matching cart item and reduce the quantity
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// const clearCartItem = (cartItems, cartItemToClear) =>
//   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   removeItemFromCart: () => {},
//   clearItemFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0,
// });

// export const CartContextProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//   };
//   const removeItemFromCart = (cartItemToRemove) => {
//     setCartItems(removeCartItem(cartItems, cartItemToRemove));
//   };
//   const clearItemFromCart = (cartItemToClear) => {
//     setCartItems(clearCartItem(cartItems, cartItemToClear));
//   };
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     removeItemFromCart,
//     clearItemFromCart,
//     cartItems,
//     cartCount,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
