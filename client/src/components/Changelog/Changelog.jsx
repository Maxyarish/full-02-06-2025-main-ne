import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChangelogsThunk } from '../../store/changelogSlice'
import styles from './Changelog.module.scss';

const Changelog = () => {
      const dispatch = useDispatch();
  const { changelogs, error, isLoading } = useSelector(
    (state) => state.changelogs
  );

  useEffect(() => {
    dispatch(getAllChangelogsThunk());
  }, [dispatch]);

    return (
        <section className={styles.section}>
          <h2>Changelog</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
        {changelogs.map((changelog) => (
          <div key={changelog._id} className={styles.changelogItem}>
            <h3 >{changelog.title}</h3>
            <h3>{changelog.version}</h3>
            <p>{changelog.description}</p>
            <p>{changelog.releaseDate}</p>
          </div>
        ))}
    </section>
    );
}

export default Changelog;
