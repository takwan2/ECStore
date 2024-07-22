import React from 'react';
import Header from './Header.jsx';
import Shop from './Shop.tsx';
import CartContextProvider from '../store/shopping-cart-context.tsx';

function Home() {

  return (
    <CartContextProvider>
      <Header />
      <Shop/>
    </CartContextProvider>
  );
}

export default Home;