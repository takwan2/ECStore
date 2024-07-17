import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { editProducts, postProducts } from '../http/http';
import { Link } from "react-router-dom";

const ProductForm = ({ product, isEdit }) => {
  const [title, setTitle] = useState(product ? product.title : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [stock, setStock] = useState(product ? product.stock : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const id = useParams().id

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isEdit) {
      try {
        const response = await editProducts(id, {title: title, price: price, stock: stock, description: description})
        console.log(response)
        alert("更新しました")
      } catch(e) {
        console.log(e)
        alert("更新に失敗しました")
      }
    } else {
      try {
        const response = await postProducts({title: title, price: price, stock: stock, description: description})
        console.log(response)
        alert("登録しました")
      } catch(e) {
        console.log(e)
        alert("登録に失敗しました")
      }
    }
  };

  return (
    <section id='product-form'>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          価格
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          商品説明
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          在庫
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
        <br />
        <div className='buttons'>
          <Link to={`/admin/product/`}><button className='back'>戻る</button></Link>
          <button type="submit" className='action'>{isEdit ? "更新する": "登録する"}</button>
        </div>
      </form>
    </section>
  );
};

export default ProductForm;