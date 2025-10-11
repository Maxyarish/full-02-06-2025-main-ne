import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../store/categoriesSlice";
import { logoutUserThunk } from "../../store/authSlice";
import styles from "./Header.module.scss";
import { resetOrders } from "../../store/ordersSlice";
import { mdiSearchWeb } from "@mdi/js";
import Icon from "@mdi/react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);

  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );

  const logout = () => {
    dispatch(resetOrders());
    dispatch(logoutUserThunk());
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles["top-header"]}>
        {user ? (
          <>
            <Link to="/account">Hi, {user?.name}!</Link>
            {user?.role === "admin" && (
              <Link to="/admin-panel">Admin Panel</Link>
            )}
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/register">Sign up</Link>
            <Link to="/login">Sign in</Link>
          </>
       
        )}
      </div>

      <nav>
        <ul className={styles["main-menu"]}>
          <li>
            <NavLink to="/" className={styles.home}>
              Home
            </NavLink>
          </li>
          {categories?.map(showCategory)}
          <ul className={styles.cart}>
            <li>
              <NavLink to="/cart">
                Cart:
                {items.length > 0 && (
                  <span>
                    {items.length} items: {totalPrice.toFixed(2)}$
                  </span>
                )}
               
              </NavLink>
            </li>
          </ul>

          <form className={styles.search} >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(q) => setSearchQuery(q.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <Icon path={mdiSearchWeb} size={1} />
            </button>
          </form>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
