import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCategoryThunk } from "../store/categoriesSlice";
import ProductsList from "../components/ProductsList/ProductsList";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { idCategory } = useParams();
  const { selectedCategory, error, isLoading } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (idCategory) {
      dispatch(getOneCategoryThunk(idCategory));
    }
  }, [dispatch, idCategory]);

  return (
    <section className={styles.wrapper}>
      <div className={styles["category-nav"]}>
        <Link to="/">
          {" "}
          <h2>Home</h2>
        </Link>
        |<h2 className={styles["page-name"]}> {selectedCategory?.name}</h2>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {selectedCategory?.products?.length > 0 ? (
        <ProductsList products={selectedCategory?.products} />
      ) : (
        <p>empty</p>
      )}
    </section>
  );
};

export default CategoryPage;
