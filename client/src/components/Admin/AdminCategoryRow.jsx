import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategoryThunk } from '../../store/categoriesSlice';
import styles from './Admin.module.scss';
import Icon from "@mdi/react";
import { mdiDelete, mdiUpdate } from "@mdi/js";

const AdminCategoryRow = (props) => {
  const dispatch = useDispatch();
  const { category, handleUpdate } = props;
  const handleDelete = (id) => {
    dispatch(deleteCategoryThunk(id));
  };
  return (
    <tr>
      <td>{category.name}</td>
      <td>
        <button onClick={() => handleUpdate(category)} className={styles["admin-actions"]}><Icon path={mdiUpdate} size={1} /></button>
      </td>
      <td>
        <button onClick={() => handleDelete(category._id)} className={styles["admin-actions"]}><Icon path={mdiDelete} size={1} /></button>
      </td>
    </tr>
  );
};

export default AdminCategoryRow;
