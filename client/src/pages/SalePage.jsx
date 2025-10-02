import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductSaleThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import styles from "./Pages.module.scss";

const SalePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductSaleThunk());
  }, [dispatch]);

  return (
    <section className={styles.sale}>
      <h1>Sale</h1>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {products.length === 0 ? (
        <p>No products on sale at the moment.</p>
      ) : (
        <ProductsList key={products._id} products={products} />
      )}
    </section>
  );
};

export default SalePage;
