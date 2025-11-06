import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters, clearFilters } from "../../store/productsSlice";
import styles from "./ProductsFilter.module.scss";

const ProductsFilter = () => {
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState(false);
  const [sale, setSale] = useState(false);

  const handleApplyFilters = () => {
    const params = {};
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (availability) params.availability = true;
    dispatch(setFilters(params));
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setAvailability(false);
    setSale(false);
    dispatch(clearFilters());
  };

  return (
    <div className={styles.filter}>
      <h3>Фільтри</h3>
      <div className={styles.price}>
        <label>Ціна</label>
        <input
          type="number"
          placeholder="Від"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="До"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
          Тільки в наявності
        </label>
      </div>

      <div className={styles.btn}>
        <button onClick={handleApplyFilters}>Застосувати</button>
        <button onClick={handleClearFilters}>Очистити</button>
      </div>
    </div>
  );
};

export default ProductsFilter;
