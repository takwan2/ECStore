import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';
import { CartContext } from '../store/shopping-cart-context.jsx';

export default function Header() {
  const modal = useRef();
  const { items } = useContext(CartContext);

  const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0);;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>閉じる</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>閉じる</button>
        <button>購入する</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="カート"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <h1>ECサイト</h1>
        </div>
        <div id="main-menu">
            <button onClick={handleOpenCartClick}>カート ({cartQuantity})</button>
            {/* <button onClick={handleOpenCartClick}>カート ({cartQuantity})</button> */}
        </div>
      </header>
    </>
  );
}
