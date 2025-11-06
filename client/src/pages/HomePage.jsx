import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsFilter from "../components/ProductsFilter/ProductsFilter";
import Pagination from "../components/Pagination/Pagination";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";
import CONSTANTS from "../constants";
import ProductsList from "../components/ProductsList/ProductsList";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading, totalProducts } = useSelector(
    (state) => state.products
  );
  const filters = useSelector((state) => state.products.filters);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(CONSTANTS.PRODUCT_AMOUNT[1]);

  useEffect(() => {
    dispatch(getAllProductsThunk({ page, amount, ...filters }));
  }, [dispatch, page, amount, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <section className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <div className={styles.content}>
        <h2>Home</h2>|
        <Link to="/sale">
          <h2>Sale</h2>
        </Link>
      </div>
      <ProductsFilter />
      <Link to="/changelog">
        <h2 className={styles.changelog}>Changelog</h2>
      </Link>

      <ProductsList products={products} />

      <Pagination
        page={page}
        setPage={setPage}
        total={totalProducts}
        amount={amount}
        setAmount={setAmount}
      />
      <h4 style={{ color: "#55358d" }}>V 1.0.1 Alpha</h4>
    </section>
  );
};

export default HomePage;
