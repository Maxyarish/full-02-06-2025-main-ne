import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChangelogsThunk } from "../../store/changelogSlice"; 
import AdminChangelogForm from "./AdminChangelogForm";
import AdminChangelogRow from "./AdminChangelogRow";


const AdminChangelog = () => {
  const dispatch = useDispatch();
  const { changelogs, isLoading,error } = useSelector((state) => state.changelogs);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedChangelog, setSelectedChangelog] = useState(null);
  
  useEffect(() => {
    if (changelogs?.length === 0) {
      dispatch(getAllChangelogsThunk());
    }
  }, [dispatch, changelogs?.length]);

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedChangelog(null);
  };
 
  
  const cancelForm = () => {
    setIsCreating(false);
  };
    const showChangelogs = (changelog) => (
    <AdminChangelogRow
      key={changelog._id}
      changelog={changelog}
    />
  );

  return (
    <section>
      <h3>Changelogs</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>Version</th>
            <th>Description</th>
            <th>releaseDate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {changelogs?.map(showChangelogs)}
        </tbody>
      </table>

      <div>
        <button onClick={handleCreate}>Create new changelog</button>
      </div>

      {isCreating && (
        <AdminChangelogForm
          selectedChangelog={selectedChangelog}
          cancelForm={cancelForm}
        />
      )}
    </section>
  );
};

export default AdminChangelog;
