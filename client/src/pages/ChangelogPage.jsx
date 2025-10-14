import React from "react";
import { useSelector } from "react-redux";
import Changelog from "../components/Changelog/Changelog";

const ChangelogPage = () => {
  const { changelogs, error, isLoading } = useSelector(
    (state) => state.changelogs
  );

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Changelog changelogs={changelogs} />
    </section>
  );
};

export default ChangelogPage;
