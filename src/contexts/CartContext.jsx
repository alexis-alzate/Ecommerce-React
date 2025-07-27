// contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { showNotification } = useNotification();

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Guardar en localStorage cuando cambie la wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        showNotification(`Se agregó ${quantity} más de ${product.name} al carrito`, 'success');
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      showNotification(`${product.name} agregado al carrito`, 'success');
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      showNotification(`${product.name} eliminado del carrito`, 'info');
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Carrito vaciado', 'info');
  };

  // Cálculos del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
  };

  const getCartDiscount = () => {
    return cart.reduce((discount, item) => {
      if (item.originalPrice) {
        return discount + ((item.originalPrice - item.price) * item.quantity);
      }
      return discount;
    }, 0);
  };

  // Funciones de la wishlist
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === product.id)) {
        showNotification(`${product.name} ya está en tu lista de deseos`, 'warning');
        return prevWishlist;
      }
      
      showNotification(`${product.name} agregado a tu lista de deseos`, 'success');
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      showNotification(`${product.name} eliminado de tu lista de deseos`, 'info');
    }
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const moveToCart = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
    }
  };

  // Aplicar cupón
  const applyCoupon = (code) => {
    const validCoupons = {
      'WELCOME10': { discount: 10, type: 'percentage' },
      'SAVE20': { discount: 20, type: 'percentage' },
      'FLAT50': { discount: 50, type: 'fixed' },
      'TECHGEAR': { discount: 15, type: 'percentage' }
    };

    const coupon = validCoupons[code.toUpperCase()];
    if (coupon) {
      showNotification(`Cupón ${code} aplicado correctamente`, 'success');
      return coupon;
    } else {
      showNotification('Cupón inválido', 'error');
      return null;
    }
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartSubtotal,
    getCartDiscount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    moveToCart,
    applyCoupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}