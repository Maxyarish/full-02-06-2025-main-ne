import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Admin.module.scss";
import { createChangelogThunk } from "../../store/changelogSlice";
import { createChangelogSchema } from "../../validation/changelog.validate";

const AdminChangelogForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    version: "",
    description: "",
    releaseDate: "",
  };

  const onSubmit = (values) => {
    const data = {
      title: values.title,
      version: values.version,
      description: values.description,
      releaseDate: values.releaseDate,
    };

    dispatch(createChangelogThunk(data));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={createChangelogSchema}
    >
      {() => (
        <Form className={styles.form}>
          <label>
            <Field name="title" placeholder="Title"/>
            <ErrorMessage name="title" />
          </label>

          <label>
            <Field name="version" placeholder="Version"/>
            <ErrorMessage name="version" />
          </label>

          <label>
            <Field as="textarea" name="description" placeholder="Description" />
            <ErrorMessage name="description" />
          </label>

          <label>
            <h3>Release Date</h3>
            <Field name="releaseDate" type="date"/>
            <ErrorMessage name="releaseDate" />
          </label>

          <div>
            <button type="submit">Create</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminChangelogForm;
