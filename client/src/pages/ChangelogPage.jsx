import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllChangelogsThunk } from "../store/changelogSlice";

const ChangelogPage = () => {
  const dispatch = useDispatch();
  const { changelogs, error, isLoading } = useSelector(
    (state) => state.changelogs
  );

  useEffect(() => {
    dispatch(getAllChangelogsThunk());
  }, [dispatch]);

  return (
    <section>
      <h2>Changelogs</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {changelogs.map((changelog) => (
          <div key={changelog._id}>
            <h3 >{changelog.title}</h3>
            <h3>{changelog.version}</h3>
            <p>{changelog.description}</p>
            <p>{changelog.releaseDate}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default ChangelogPage;
