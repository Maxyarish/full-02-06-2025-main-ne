import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import CONSTANTS from "../../constants";
import { updateOrderStatusThunk } from "../../store/ordersSlice";
import styles from "./Admin.module.scss";
import Icon from "@mdi/react";
import { mdiContentSave } from "@mdi/js";
const AdminOrderForm = (props) => {
  const { order } = props;
  const dispatch = useDispatch();
  const showStatus = (status) => (
    <option key={status} value={status}>
      {status}
    </option>
  );
  const onSubmit = (value) => {
    dispatch(updateOrderStatusThunk({ id: order._id, status: value.status }));
  };
  return (
    <Formik initialValues={{ status: order?.status }} onSubmit={onSubmit} >
      <Form >
        <Field as="select" name="status" className={styles.option}>
          {CONSTANTS.ORDER_STATUS.map(showStatus)}
        </Field>
        <div>
          <button type="submit" className={styles['admin-actions']}>
            <Icon path={mdiContentSave} size={0.7} />
          </button>
          </div>
      </Form>
    </Formik>
  );
};

export default AdminOrderForm;
