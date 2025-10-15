import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteChangelogThunk } from '../../store/changelogSlice';
import styles from './Admin.module.scss';
import { mdiDelete } from "@mdi/js";
import Icon from '@mdi/react';

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
             <button
               onClick={() => {
                 handleDelete(_id);
               }}
               className={styles["admin-actions"]}
             >
               <Icon path={mdiDelete} size={0.7} />
             </button>
           </td>
    </tr>
  );
};

export default AdminChangelogRow;
