import React, { useEffect } from "react";
import CONSTANTS from "../../constants";
import { useDispatch } from "react-redux";
import { deleteProductThunk, getAllProductsThunk } from "../../store/productsSlice";
import Icon from "@mdi/react";
import { mdiDelete,mdiUpdate } from "@mdi/js";
import styles from "./Admin.module.scss";

const AdminProductRow = (props) => {
  const { product, handleUpdate } = props;
  const { _id, title, description, price, stockQty, category, isSale, images } =
    product;
  const dispatch = useDispatch();
 
  useEffect(()=>{
 dispatch(getAllProductsThunk())
  },[dispatch])
   const handleDelete = (id) => {
    dispatch(deleteProductThunk(id));
  };
  const showImages = (img, i) => (
    <img
      key={i}
      src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`}
      alt={title}
      style={{width:'100%',height:'100%',maxHeight:'150px'}}
    />
  );
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{stockQty}</td>
      <td>{category?.name}</td>
      <td>{isSale ? "yes" : "no"}</td>
      <td>{images.map(showImages)} </td>
      <td>
        <button
          onClick={() => {
            handleUpdate(product);
          }}
          className={styles["admin-actions"]}
        >
          <Icon path={mdiUpdate} size={1} />
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            handleDelete(_id);
          }}
          className={styles["admin-actions"]}
        >
          <Icon path={mdiDelete} size={1} />
        </button>
      </td>
    </tr>
  );
};

export default AdminProductRow;
