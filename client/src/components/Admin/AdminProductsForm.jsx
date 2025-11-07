import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Admin.module.scss";
import {
  createProductThunk,
  updateProductThunk,
} from "../../store/productsSlice";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../../validation/product.validate";

const AdminProductsForm = (props) => {
  const { selectedProduct, cancelForm } = props;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const initialValues = {
    title: selectedProduct?.title || "",
    description: selectedProduct?.description || "",
    price: selectedProduct?.price || "",
    stockQty: selectedProduct?.stockQty || "",
    isSale: selectedProduct?.isSale || false,
    category: selectedProduct?.category._id || "",
    images: [],
  };
  const onSubmit = (values) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("stockQty", values.stockQty);
    data.append("isSale", values.isSale);
    data.append("category", values.category);
    values.images.forEach((file) => data.append("images", file));

    if (selectedProduct) {
      dispatch(updateProductThunk({ id: selectedProduct._id, values: data }));
    } else {
      dispatch(createProductThunk(data));
    }
    cancelForm();
  };
  const [isCreating, setIsCreating] = useState(!selectedProduct);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={
        selectedProduct ? productUpdateSchema : productCreateSchema
      }
    >
      {({ setFieldValue }) => {
        const showOption = (category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        );
        return (
          <Form className={styles.form}>
            <label>
              <Field name="title" placeholder="Product title" />
              <ErrorMessage name="title" />
            </label>
            <label>
              <Field name="description" placeholder="Product description" />
              <ErrorMessage name="description" />
            </label>
            <label>
              <Field name="price" type="number" step="0.01" placeholder="Product price" />
              <ErrorMessage name="price" />
            </label>
            <label>
              <Field name="stockQty" placeholder="Stock quantity" type="number" min="0" />
              <ErrorMessage name="stockQty" />
            </label>
            <label>
              <span>Is Sale</span>
              <Field name="isSale" type="checkbox"  />
              <ErrorMessage name="isSale" />
            </label>
            <label>
              <span>Category Name</span>
              <Field name="category" as="select">
                <option>choose category</option>
                {categories?.map(showOption)}
              </Field>
              <ErrorMessage name="category" />
            </label>
            <label>
              <span>images</span>
              <input
                name="images"
                type="file"
                multiple
                onChange={(event) => {
                  setFieldValue("images", Array.from(event.target.files));
                }}
              />
            </label>
            <button type="submit">{isCreating ? "Create" : "Update"}</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminProductsForm;
