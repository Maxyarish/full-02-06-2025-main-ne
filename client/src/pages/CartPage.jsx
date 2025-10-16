import React from "react";
import Cart from "../components/Cart/Cart";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["wrapper-nav"]}>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        |<h2>Cart</h2>
      </div>
      <Cart />
    </div>
  );
};

export default CartPage;
