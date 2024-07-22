import AdminHeader from './AdminHeader.tsx';
import ProductForm from './ProductForm.tsx';
import { fetchProduct } from '../http/http.js';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

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