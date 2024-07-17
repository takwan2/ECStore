import AdminHeader from './AdminHeader.jsx';
import ProductForm from './ProductForm.jsx';
import { fetchProduct } from '../http/http.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditProduct() {
  const { id } = useParams();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const data = await fetchProduct(id);
      setFetchData(data);
    }
    getProduct();
  }, [id]);

  return (
    <>
      <AdminHeader title="商品編集"/>
      {fetchData && (
        <ProductForm isEdit={true} product={fetchData}/>
      )}
    </>
  );
}

export default EditProduct;