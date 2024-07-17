import AdminHeader from './AdminHeader.jsx';
import Stock from './Stock.jsx';
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