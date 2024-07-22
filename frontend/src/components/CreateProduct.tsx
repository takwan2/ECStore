import React from 'react';
import AdminHeader from './AdminHeader.tsx';
import ProductForm from './ProductForm.tsx';

function CreateProduct() {

  return (
    <>
      <AdminHeader title="商品登録"/>
      <ProductForm isEdit={false} />
    </>
  );
}

export default CreateProduct;