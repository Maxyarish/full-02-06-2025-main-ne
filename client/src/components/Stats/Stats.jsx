 import React from 'react';
import { useSelector } from 'react-redux';
import AdminStats from '../Admin/AdminStats';
 
 const Stats = () => {
    const {isLoading,error}=useSelector((state)=>state.stats)
    return (
        <section>
                <h2>stats</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    <AdminStats />

        </section>
    );
 }
 
 export default Stats;
 