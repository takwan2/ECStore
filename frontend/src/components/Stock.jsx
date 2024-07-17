import Product from './Product.jsx';
import { fetchProducts } from '../http/http.js';
import { useFetch } from '../hooks/useFetch.js';
import { Link } from "react-router-dom";
import { deleteProducts } from '../http/http.js';

export default function Shop() {
  const { fetchData, refetch  } = useFetch(fetchProducts, []);

  async function deleteProduct(id) {
    const result = confirm('削除しますか?');
    if(result) {
      await deleteProducts(id);
      refetch();
    }
  }

  return (
    <section id="shop">
      <ul id="products">
        {fetchData.map((product) => (
          <li key={product.id}>
            <Product {...product} 
            actions={
            <>
              <Link to={`/admin/product/${product.id}`}>
                <button className="edit">編集</button>
              </Link>
              <button className="delete" onClick={() => deleteProduct(product.id)}>削除</button>
            </>
          }/>
          </li>
        ))}
      </ul>
    </section>
  );
}
