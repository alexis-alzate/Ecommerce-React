// pages/CartPage.jsx
import React, { useState } from 'react';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, 
  Shield, Truck, CreditCard, X, AlertCircle, ChevronRight,
  Package, Clock, Heart
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import { products } from '../data/products';

export function CartPage({ navigateTo }) {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartSubtotal,
    getCartDiscount,
    applyCoupon,
    moveToCart,
    wishlist
  } = useCart();
  
  const { user } = useUser();
  const { showNotification } = useNotification();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const shipping = getCartTotal() >= 99 ? 0 : 9.99;
  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const couponDiscount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? (subtotal - discount) * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;
  const total = subtotal - discount - couponDiscount + shipping;

  // Productos recomendados basados en el carrito
  const recommendedProducts = products
    .filter(p => !cart.find(item => item.id === p.id))
    .filter(p => cart.some(item => item.category === p.category))
    .slice(0, 4);

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    if (result) {
      setAppliedCoupon(result);
      showNotification(`Cupón ${couponCode} aplicado: ${result.discount}${result.type === 'percentage' ? '%' : '$'} de descuento`, 'success');
      setCouponCode('');
      setShowCouponInput(false);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      showNotification('Por favor inicia sesión para continuar', 'warning');
      navigateTo('login');
    } else {
      navigateTo('checkout');
    }
  };

  if (cart.length === 0) {
    return <EmptyCart navigateTo={navigateTo} wishlist={wishlist} moveToCart={moveToCart} />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Carrito de compras</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Package className="w-4 h-4" />
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} artículos</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {/* Acciones del carrito */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => navigateTo('products')}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                ← Continuar comprando
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                    clearCart();
                  }
                }}
                className="text-red-400 hover:text-red-300 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Vaciar carrito
              </button>
            </div>

            {/* Productos en el carrito */}
            {cart.map(item => (
              <CartItem 
                key={item.id} 
                item={item}
                onRemove={() => removeFromCart(item.id)}
                onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                navigateTo={navigateTo}
              />
            ))}

            {/* Cupón de descuento */}
            <div className="bg-gray-900 rounded-xl p-4">
              {!showCouponInput ? (
                <button
                  onClick={() => setShowCouponInput(true)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <Tag className="w-4 h-4" />
                  ¿Tienes un cupón de descuento?
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Código del cupón"
                      className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Aplicar
                    </button>
                    <button
                      onClick={() => {
                        setShowCouponInput(false);
                        setCouponCode('');
                      }}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Prueba: WELCOME10, SAVE20, FLAT50, TECHGEAR
                  </p>
                </div>
              )}

              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between bg-green-600/20 text-green-400 px-3 py-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Cupón aplicado: {appliedCoupon.discount}{appliedCoupon.type === 'percentage' ? '%' : '$'} de descuento
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="hover:text-green-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Descuentos</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-500">
                    <span>Cupón</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">IVA incluido</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-4"
              >
                Proceder al pago
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Métodos de pago */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">💳</span>
                <span className="text-4xl">📱</span>
                <span className="text-4xl">🏦</span>
                <span className="text-4xl">💰</span>
              </div>

              {/* Beneficios */}
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-gray-400">Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-400">Envío rápido y rastreable</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-400">Múltiples formas de pago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos recomendados */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">También te puede interesar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map(product => (
                <RecommendedProduct 
                  key={product.id} 
                  product={product}
                  navigateTo={navigateTo}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Componente de producto en el carrito
function CartItem({ item, onRemove, onUpdateQuantity, navigateTo }) {
  const discount = item.originalPrice ? item.originalPrice - item.price : 0;
  const savings = discount * item.quantity;

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <div className="flex gap-4">
        {/* Imagen */}
        <button
          onClick={() => navigateTo('product-detail', item)}
          className="shrink-0"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center text-4xl md:text-5xl hover:scale-105 transition-transform">
            {item.image}
          </div>
        </button>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                <button
                  onClick={() => navigateTo('product-detail', item)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </button>
              </h3>
              <p className="text-sm text-gray-400 mb-2">{item.color}</p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.shipping === 'Envío gratis' && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                    <Truck className="w-3 h-3" />
                    Envío gratis
                  </span>
                )}
                {item.stockQuantity <= 5 && (
                  <span className="inline-flex items-center gap-1 text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    Quedan {item.stockQuantity}
                  </span>
                )}
                {savings > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                    Ahorras ${savings.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Precio móvil */}
              <div className="md:hidden mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-4">
                {/* Cantidad */}
                <div className="flex items-center bg-gray-800 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.quantity - 1)}
                    className="p-2 hover:bg-gray-700 transition-colors rounded-l-lg"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.quantity + 1)}
                    className="p-2 hover:bg-gray-700 transition-colors rounded-r-lg"
                    disabled={item.quantity >= item.stockQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Acciones */}
                <button
                  onClick={onRemove}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Eliminar del carrito"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Precio desktop */}
            <div className="hidden md:block text-right">
              <div className="mb-2">
                <div className="text-xl font-bold">${item.price}</div>
                {item.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${item.originalPrice}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400">
                Total: <span className="font-semibold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de carrito vacío
function EmptyCart({ navigateTo, wishlist, moveToCart }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 opacity-20">🛒</div>
        <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-8">
          ¡Agrega algunos productos increíbles y comienza tu compra!
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('products')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Explorar productos
          </button>
          
          {wishlist.length > 0 && (
            <div className="pt-4">
              <p className="text-gray-400 mb-4">
                Tienes {wishlist.length} productos en tu lista de deseos
              </p>
              <div className="grid grid-cols-2 gap-4">
                {wishlist.slice(0, 4).map(product => (
                  <div key={product.id} className="bg-gray-900 rounded-lg p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{product.image}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                        <p className="text-sm font-bold">${product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => moveToCart(product.id)}
                      className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded transition-colors"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                ))}
              </div>
              
              {wishlist.length > 4 && (
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="mt-4 text-blue-400 hover:text-blue-300"
                >
                  Ver toda tu lista de deseos →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de producto recomendado
function RecommendedProduct({ product, navigateTo }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="group">
      <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
        <button
          onClick={() => navigateTo('product-detail', product)}
          className="block w-full"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 relative">
            {product.image}
            
            {product.badge && (
              <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>
        </button>

        <div className="p-4">
          <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <span className="text-xs">⭐ {product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-1">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => toggleWishlist(product)}
                className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button
                onClick={() => addToCart(product)}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}