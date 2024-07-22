import React from 'react';
import AdminHeader from './AdminHeader.tsx';
import Stock from './Stock.tsx';
import { Link } from "react-router-dom";

function Home() {
  const button = <Link to={`/admin/product/create`}><button>新規作成</button></Link>

  return (
    <>
      <AdminHeader title="在庫一覧" buttons={button}/>
      <Stock>
      </Stock>
    </>
  );
}

export default Home;