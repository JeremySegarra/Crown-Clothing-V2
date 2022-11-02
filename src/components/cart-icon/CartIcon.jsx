import { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./CartIcon.Styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggle = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
