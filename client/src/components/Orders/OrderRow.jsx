import React from 'react'; 
import styles from './Order.module.scss';

const OrderRow = (props) => {
  const { order, setIdOrder } = props;
  const { _id, createdAt, totalSumma, status } = order;
  const handleViewDetail = () => {
    setIdOrder(_id);
  };
  return (
    <tr>
      <td>{_id}</td>
      <td>{createdAt.slice(0, 10)}</td>
      <td>{totalSumma} usd</td>
      <td>{status}</td>
      <td>
        <button onClick={handleViewDetail}  className={styles['view-detail-button']}>view detail</button>
      </td>
    </tr>
  );
};

export default OrderRow;
