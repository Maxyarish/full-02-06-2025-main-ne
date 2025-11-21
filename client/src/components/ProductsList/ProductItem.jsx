import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiSale, mdiCartArrowDown } from "@mdi/js";
import styles from "./ProductsList.module.scss";
import CONSTANTS from "../../constants";
import { addToCart } from "../../store/cartSlice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = props;
  const { title, price, stockQty, isSale, images, category } = product;
  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };
  const navigateProduct = () => {
    navigate(`/products/${product._id}`);
  };
    const showImages = (img, i) => (
    <img
      key={i}
      src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`}
      alt={title}
    />
  );
  return (
    <article className={styles.product} onClick={navigateProduct}>
        <h1>{title}</h1>
      <div className={styles.pic}>
        {images.map(showImages)}
      </div>
      <h2>price:{price}$</h2>
      <h2>category: {category?.name}</h2>
      <h2 style={{ color: stockQty > 0 ? "#4CAF50" : "#d32f2f" }}>
        {stockQty > 0 ? "Available" : "Not Available"}
      </h2>
      <Icon path={mdiCartArrowDown} size={1} onClick={handleAddToCart} />
      {isSale && <Icon path={mdiSale} width={25} color={"red"} />}
    </article>
  );
};

export default ProductItem;
