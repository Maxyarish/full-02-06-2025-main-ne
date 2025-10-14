import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Admin.module.scss";
import { createChangelogThunk } from "../../store/changelogSlice";
import { createChangelogSchema } from "../../validation/changelog.validate";

const AdminChangelogForm = ({ cancelForm }) => {
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
    cancelForm();
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
            <span>Title</span>
            <Field name="title" />
            <ErrorMessage name="title" />
          </label>

          <label>
            <span>Version</span>
            <Field name="version" />
            <ErrorMessage name="version" />
          </label>

          <label>
            <span>Description</span>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" />
          </label>

          <label>
            <span>Release Date</span>
            <Field name="releaseDate" type="date" />
            <ErrorMessage name="releaseDate" />
          </label>

          <div>
            <button type="submit">Create</button>
            <button type="button" onClick={cancelForm}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminChangelogForm;
