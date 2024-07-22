import React, { createContext, useState } from "react";
import { fetchProducts } from '../http/http.js';
import { useFetch } from '../hooks/useFetch.tsx';

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState<{ items: CartItem[] }>({
    items: [],
  });
  const { fetchData } = useFetch<Product[]>(fetchProducts, []);

  function handleAddItemToCart(id: string) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      const existingCartItem = updatedItems[existingCartItemIndex];
      const product = fetchData.find((product) => product.id === id);

      if (!product) {
        alert('商品が見つかりません');
        return prevShoppingCart;
      }

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

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
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

      if (!product) {
        alert('商品が見つかりません');
        return prevShoppingCart;
      }

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
