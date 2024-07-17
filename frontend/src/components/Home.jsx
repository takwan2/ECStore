import Header from './Header.jsx';
import Shop from './Shop.jsx';
import CartContextProvider from '../store/shopping-cart-context.jsx';

function Home() {

  return (
    <CartContextProvider>
      <Header />
      <Shop/>
    </CartContextProvider>
  );
}

export default Home;