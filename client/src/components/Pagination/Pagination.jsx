import React from "react";
import CONSTANTS from "../../constants";
   import { mdiArrowRightBoldCircle } from '@mdi/js';
    import { mdiArrowLeftBoldCircle } from '@mdi/js';
import Icon from "@mdi/react";
import styles from "./Pagination.module.scss";
const Pagination = (props) => {
  const { page, setPage,total,amount,setAmount } = props;
  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (page < total / amount) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const showOption = (option) => (
    <option key={option} value={option}>
      {option}
    </option>
  );
  const handleChange=(event)=>{
    setAmount(event.target.value)
    setPage(1)
  }
  return (
    <div className={styles.pagination}>
      <span onClick={handlePrev}><Icon path={mdiArrowLeftBoldCircle} size={1}/></span>
      <span>{page}</span>
      <span onClick={handleNext}><Icon path={mdiArrowRightBoldCircle} size={1}/></span>
      <select value={amount} onChange={handleChange}>
        {
            CONSTANTS.PRODUCT_AMOUNT?.map(showOption)
        }
      </select>
    </div>
  );
};

export default Pagination;
