import Product from './Product.jsx';
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { fetchProducts } from '../http/http.js';
import { useFetch } from '../hooks/useFetch.js';

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
