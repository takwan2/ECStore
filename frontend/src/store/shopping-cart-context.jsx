import { createContext, useState } from "react";
import { fetchProducts } from '../http/http.js';
import { useFetch } from '../hooks/useFetch.js';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
  const { fetchData } = useFetch(fetchProducts, []);

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];
      const product = fetchData.find((product) => product.id === id);

      if (existingCartItem) {

        if (existingCartItem.quantity + 1 > product.stock) {
          alert('在庫を超えています');
          return prevShoppingCart;
        }
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        if (!product || product.stock < 1) {
          alert('在庫切れです');
          return prevShoppingCart;
        }
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      if (updatedItemIndex === -1) return prevShoppingCart;

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      const product = fetchData.find((product) => product.id === productId);

      const newQuantity = updatedItem.quantity + amount;
      if (newQuantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else if (newQuantity > product.stock) {
        alert('在庫を超えています');
        return prevShoppingCart;
      } else {
        updatedItem.quantity = newQuantity;
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
