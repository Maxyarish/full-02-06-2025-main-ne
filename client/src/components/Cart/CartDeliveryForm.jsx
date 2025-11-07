import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import CONSTANTS from "../../constants";
import { orderDiliverySchema } from "../../validation/order.validate";
import { createOrderThunk } from "../../store/ordersSlice";
import { clearCart } from "../../store/cartSlice";
import { createCheckoutSession } from "../../api";
import styles from "./Cart.module.scss";
const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const CartDeliveryForm = (props) => {
  const { items } = props;
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const orderValues = {
        products: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        ...values,
        shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
      };
      const order = await dispatch(createOrderThunk(orderValues)).unwrap();

      const stripeProducts = items.map((item) => ({
        title: item.title,
        productPrice: item.price,
        quantity: item.quantity,
      }));

      const response = await createCheckoutSession(order._id, stripeProducts);
      dispatch(clearCart());
      return response.data?.url && (window.location.href = response.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        shippingPhone: "",
        shippingMethod: CONSTANTS.SHIPPING_METHOD[0],
        shippingAddress: "",
      }}
      validationSchema={orderDiliverySchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className={styles.inputs}>
            <label>
              <Field
                name="shippingPhone"
                type="tel"
                placeholder="Phone number"
              />
              <ErrorMessage name="shippingPhone" />
            </label>
            <label>
              <Field name="shippingAddress" type="text" placeholder="Address" />
              <ErrorMessage name="shippingAddress" />
            </label>
            <label>
              <h4>method</h4>
              <Field name="shippingMethod" as="select">
                {CONSTANTS.SHIPPING_METHOD.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="shippingMethod" />
            </label>

            <button type="submit">create order and payment</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CartDeliveryForm;
