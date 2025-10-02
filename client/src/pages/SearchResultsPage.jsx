import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProductsThunk } from "../store/productsSlice";
import styles from "./Pages.module.scss";
import { useEffect } from "react";
import ProductsList from "../components/ProductsList/ProductsList";


const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchResults, error, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getSearchProductsThunk(query));
  }, [query, dispatch]);

  return (
    <section className={styles.wrapper}>
      <h2>Search Results for "{query}"</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {searchResults?.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductsList products={searchResults} />
      )}
    </section>
  );
};

export default SearchResults;
