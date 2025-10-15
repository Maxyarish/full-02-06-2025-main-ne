import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteChangelogThunk } from '../../store/changelogSlice';

const AdminChangelogRow = ({ changelog }) => {
  const dispatch = useDispatch();
  const { _id, title, version, description, releaseDate } = changelog;

  const handleDelete = (id) => {
    dispatch(deleteChangelogThunk(id));
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{version}</td>
      <td  style={{ whiteSpace: "pre-wrap" }}>{description}</td>
     <td>{new Date(changelog.releaseDate).toLocaleDateString()}</td>
      <td>
        <button onClick={() => handleDelete(_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default AdminChangelogRow;
