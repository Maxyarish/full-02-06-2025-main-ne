import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsFilter from "../components/ProductsFilter/ProductsFilter";
import Pagination from "../components/Pagination/Pagination";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";
import CONSTANTS from "../constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading, totalProducts } = useSelector(
    (state) => state.products
  );
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(CONSTANTS.PRODUCT_AMOUNT[1]);

  useEffect(() => {
    dispatch(getAllProductsThunk({ page, amount }));
  }, [dispatch, page, amount]);

  return (
    <section className={styles.wrapper}>
      <ProductsFilter />
      <div className={styles.content}>
        <h2>Home</h2>|
         <Link to="/sale" >
          <h2>Sale</h2>
        </Link>
        </div>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        <ProductsList products={products} />
     
      <Pagination
        page={page}
        setPage={setPage}
        total={totalProducts}
        amount={amount}
        setAmount={setAmount}
      />
      <h4 style={{ color: "#55358d" }}>V 1.1.2</h4>
    </section>
  );
};

export default HomePage;
