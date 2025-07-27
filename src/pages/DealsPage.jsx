// pages/DealsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
   Zap, Clock, Flame, Tag, TrendingDown, Percent,
   ShoppingCart, Heart, Star, Timer, AlertCircle,
   Bell, ChevronRight, Gift, Crown 
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

export function DealsPage({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount-high');
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 42,
    seconds: 18
  });
  const [subscribedToAlerts, setSubscribedToAlerts] = useState(false);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useUser();
  const { showNotification } = useNotification();

  // Productos en oferta
  const dealsProducts = products.filter(p => p.originalPrice);
  
  // Filtrar por categoría
  const filteredDeals = selectedCategory === 'all' 
    ? dealsProducts 
    : dealsProducts.filter(p => p.category === selectedCategory);

  // Ordenar ofertas
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
    const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
    
    switch (sortBy) {
      case 'discount-high':
        return discountB - discountA;
      case 'discount-low':
        return discountA - discountB;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Categorías de ofertas
  const dealCategories = [
    { id: 'all', name: 'Todas', icon: '🎯' },
    { id: 'flash', name: 'Flash', icon: '⚡' },
    { id: 'weekly', name: 'Semanales', icon: '📅' },
    { id: 'clearance', name: 'Liquidación', icon: '🏷️' },
    { id: 'bundle', name: 'Paquetes', icon: '📦' }
  ];

  // Obtener categorías únicas de productos en oferta
  const productCategories = ['all', ...new Set(dealsProducts.map(p => p.category))];

  // Temporizador de cuenta regresiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          // Reiniciar contador
          return { days: 2, hours: 15, minutes: 42, seconds: 18 };
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calcular ahorros totales
  const totalSavings = sortedDeals.reduce((sum, product) => {
    return sum + (product.originalPrice - product.price);
  }, 0);

  const handleSubscribeToAlerts = () => {
    if (!user) {
      showNotification('Inicia sesión para recibir alertas de ofertas', 'warning');
      navigateTo('login');
      return;
    }
    
    setSubscribedToAlerts(true);
    showNotification('¡Te notificaremos sobre nuevas ofertas!', 'success');
  };

  // Ofertas especiales
  const flashDeal = sortedDeals[0];
  const bestDiscounts = sortedDeals.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Flame className="w-10 h-10" />
              Ofertas Especiales
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Ahorra hasta un 70% en accesorios tech seleccionados
            </p>
            
            {/* Contador */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-medium">La oferta termina en:</span>
              <div className="flex gap-2 ml-2">
                <TimeUnit value={timeLeft.days} label="D" />
                <span className="text-2xl">:</span>
                <TimeUnit value={timeLeft.hours} label="H" />
                <span className="text-2xl">:</span>
                <TimeUnit value={timeLeft.minutes} label="M" />
                <span className="text-2xl">:</span>
                <TimeUnit value={timeLeft.seconds} label="S" />
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">{sortedDeals.length}</p>
                <p className="text-sm">Productos en oferta</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">70%</p>
                <p className="text-sm">Descuento máximo</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">${totalSavings.toFixed(0)}</p>
                <p className="text-sm">Ahorros totales</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">24h</p>
                <p className="text-sm">Ofertas flash</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerta de suscripción */}
        {!subscribedToAlerts && (
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-400" />
              <p className="text-blue-400">
                ¿Quieres recibir notificaciones sobre nuevas ofertas?
              </p>
            </div>
            <button
              onClick={handleSubscribeToAlerts}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Activar alertas
            </button>
          </div>
        )}

        {/* Oferta flash destacada */}
        {flashDeal && (
          <FlashDealSection 
            product={flashDeal}
            onAddToCart={() => addToCart(flashDeal)}
            navigateTo={navigateTo}
          />
        )}

        {/* Mejores descuentos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            Mejores descuentos del día
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bestDiscounts.map((product, index) => (
              <BestDealCard
                key={product.id}
                product={product}
                position={index + 1}
                onAddToCart={() => addToCart(product)}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </section>

        {/* Filtros y ordenamiento */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productCategories.map(cat => {
                const category = cat === 'all' 
                  ? { id: 'all', name: 'Todas', icon: '🛍️' }
                  : categories.find(c => c.id === cat);
                
                if (!category) return null;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                );
              })}
            </div>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="discount-high">Mayor descuento</option>
            <option value="discount-low">Menor descuento</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="popular">Más populares</option>
          </select>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedDeals.map(product => (
            <DealCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
              onToggleWishlist={() => toggleWishlist(product)}
              isWishlisted={isInWishlist(product.id)}
              navigateTo={navigateTo}
            />
          ))}
        </div>

        {/* Términos y condiciones */}
        <div className="mt-12 p-6 bg-gray-900 rounded-xl">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Términos de las ofertas
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Las ofertas están sujetas a disponibilidad de stock</li>
            <li>• Los precios mostrados incluyen IVA</li>
            <li>• Las ofertas flash tienen una duración limitada de 24 horas</li>
            <li>• No acumulable con otros cupones o promociones</li>
            <li>• Máximo 3 unidades por producto y cliente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Componente de unidad de tiempo
function TimeUnit({ value, label }) {
  return (
    <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
      <span className="text-2xl font-bold">{String(value).padStart(2, '0')}</span>
      <span className="text-xs ml-1">{label}</span>
    </div>
  );
}

// Sección de oferta flash
function FlashDealSection({ product, onAddToCart, navigateTo }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const savings = product.originalPrice - product.price;
  
  return (
    <section className="mb-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-6 h-6" />
        <h2 className="text-2xl font-bold">¡Oferta Flash del Día!</h2>
        <span className="ml-auto bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
          Quedan {product.stockQuantity} unidades
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
          <p className="text-white/90 mb-6">{product.description}</p>
          
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-5xl font-bold">${product.price}</span>
            <span className="text-2xl line-through opacity-60">${product.originalPrice}</span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-bold">
              -{discount}%
            </span>
          </div>
          
          <p className="text-lg mb-6">
            ¡Ahorras ${savings.toFixed(2)}!
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir al carrito
            </button>
            <button
              onClick={() => navigateTo('product-detail', product)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver detalles
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" />
            <span className="relative text-[200px] block">{product.image}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tarjeta de mejor oferta
function BestDealCard({ product, position, onAddToCart, navigateTo }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const positionColors = ['bg-yellow-500', 'bg-gray-400', 'bg-orange-600'];
  const positionIcons = ['🥇', '🥈', '🥉'];
  
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-500 transition-all group">
      <div className="relative">
        <button
          onClick={() => navigateTo('product-detail', product)}
          className="block w-full"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
        </button>
        
        {/* Medalla de posición */}
        <div className={`absolute top-2 left-2 ${positionColors[position - 1]} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg`}>
          {positionIcons[position - 1]}
        </div>
        
        {/* Descuento */}
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
          -{discount}%
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-gray-500 line-through">${product.originalPrice}</span>
        </div>
        
        <button
          onClick={onAddToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

// Tarjeta de oferta
function DealCard({ product, onAddToCart, onToggleWishlist, isWishlisted, navigateTo }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const savings = product.originalPrice - product.price;
  
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-500 transition-all group">
      <div className="relative">
        <button
          onClick={() => navigateTo('product-detail', product)}
          className="block w-full"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
        </button>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
            -{discount}%
          </span>
          {discount >= 50 && (
            <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              HOT
            </span>
          )}
        </div>
        
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-2 right-2 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-xs">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          </div>
          <p className="text-xs text-green-400">Ahorras ${savings.toFixed(2)}</p>
        </div>
        
        {product.stockQuantity <= 5 && (
          <p className="text-xs text-orange-400 mb-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Solo quedan {product.stockQuantity}
          </p>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

// Importar categorías
import { categories } from '../data/products';