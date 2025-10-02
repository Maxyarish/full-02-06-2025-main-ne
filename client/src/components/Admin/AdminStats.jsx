import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStatsThunk } from "../../store/statsSlice";

const AdminStats = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getAdminStatsThunk());
  }, [dispatch]);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Users</td>
            <td>{stats.users}</td>
          </tr>
          <tr>
            <td>Orders</td>
            <td>{stats.orders}</td>
          </tr>
          <tr>
            <td>Products</td>
            <td>{stats.products}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminStats;
