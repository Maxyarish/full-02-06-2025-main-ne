import React from 'react';
import OrderRow from './OrderRow';

const OrdersList = (props) => {
  const { orders, setIdOrder } = props;
  const showOrderRow = (order) => <OrderRow key={order._id} order={order}  setIdOrder={setIdOrder}/>;
  return (
    <table>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Data</th>
          <th>Total summa</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>{orders.map(showOrderRow)}</tbody>
    </table>
  );
};

export default OrdersList;
