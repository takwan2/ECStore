import React from 'react';
import Product from './Product.tsx';
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.tsx";
import { fetchProducts } from '../http/http.js';
import { useFetch } from '../hooks/useFetch.tsx';

export default function Shop() {
  const { addItemToCart } = useContext(CartContext);
  const { fetchData } = useFetch(fetchProducts, []);
  
  return (
    <section id="shop">
      <ul id="products">
        {fetchData.map((product) => (
          <li key={product.id}>
            <Product {...product} 
            actions={<button onClick={() => addItemToCart(product.id)}>カートに入れる</button>}/>
          </li>
        ))}
      </ul>
    </section>
  );
}
