import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Cart.module.scss";
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from "../../store/cartSlice";

const CartItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(item._id));
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity(item._id));
  };
  const handleIncrement = () => {
    dispatch(incrementQuantity(item._id));
  };
  return (
    <li className={styles["cart-item"]}>
      <div className={styles.info}>
        <h5>{item.title}</h5>
        <p className={styles.price}>{item.price} uah</p>
      </div>

      <div className={styles.quantity}>
        <button onClick={handleDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>

      <div className={styles.total}>
        <p>{(item.price * item.quantity).toFixed(2)} uah</p>
      </div>

      <div className={styles.actions}>
        <button onClick={handleDelete}>x</button>
      </div>
    </li>
  );
};

export default CartItem;
