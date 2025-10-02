import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createCategoryThunk, updateCategoryThunk } from '../../store/categoriesSlice';
import styles from './Admin.module.scss';

const AdminCategoriesForm = (props) => {
  const { cancelForm, selectedCategory } = props;
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    if (selectedCategory) {
      dispatch(updateCategoryThunk({id: selectedCategory._id, values}))
    } else {
      dispatch(createCategoryThunk(values));
    }    
    cancelForm();
  };
  return (
    <Formik initialValues={{ name: selectedCategory?.name || '' }} onSubmit={onSubmit}>
      {() => {
        return (
          <Form className={styles['new-category-form']}>
            <label>
              <span>Category name: </span>
              <Field type="text" name="name" placeholder="category name..." className={styles.input} />
              <ErrorMessage name="name" />
            </label>
            <button type="submit">{selectedCategory?'Update':'Create'}</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminCategoriesForm;
