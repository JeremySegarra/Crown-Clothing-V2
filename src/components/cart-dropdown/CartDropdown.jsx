import Button from "../button/Button";
import "./CartDropdown.Styles.scss";

import CartItem from "../cart-item/CartItem";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item}></CartItem>
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
