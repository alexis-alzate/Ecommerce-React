// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Star, TrendingUp, Zap, Shield, 
  Truck, Clock, ShoppingCart, CreditCard, Headphones, ArrowRight, Sparkles, Heart
} from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

export function HomePage({ navigateTo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showNotification } = useNotification();

  const featuredProducts = products.filter(p => p.featured);
  const bestSellers = products.sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const newArrivals = products.slice(-8);
  const onSale = products.filter(p => p.originalPrice).slice(0, 8);

  const heroSlides = [
    {
      id: 1,
      title: 'Black Friday Tech',
      subtitle: 'Hasta 50% OFF en accesorios premium',
      cta: 'Ver ofertas',
      image: '🎧',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'AirPods Pro Max',
      subtitle: 'La experiencia de audio definitiva',
      cta: 'Comprar ahora',
      image: '🎵',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 3,
      title: 'Nuevos MagSafe',
      subtitle: 'Carga más rápida, más inteligente',
      cta: 'Descubrir',
      image: '⚡',
      gradient: 'from-green-600 to-blue-600'
    }
  ];

  const features = [
    { icon: Truck, title: 'Envío Gratis', desc: 'En compras +$99' },
    { icon: Shield, title: 'Garantía', desc: 'Protección extendida' },
    { icon: CreditCard, title: 'Pago Seguro', desc: 'Múltiples opciones' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Estamos para ayudarte' }
  ];

  // Auto-slide del hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.gradient} relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <div className="text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
                      {slide.subtitle}
                    </p>
                    <button
                      onClick={() => navigateTo('products')}
                      className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 animate-fade-in-delay-2"
                    >
                      {slide.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <span className="text-[300px] animate-float">{slide.image}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controles del slider */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Explora por categoría</h2>
            <button 
              onClick={() => navigateTo('categories')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat.id !== 'all').slice(0, 8).map(category => (
              <button
                key={category.id}
                onClick={() => navigateTo('products')}
                className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 text-center group transition-all hover:scale-105"
              >
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} productos</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold">Productos destacados</h2>
          </div>

          <ProductGrid products={featuredProducts} onAddToCart={handleAddToCart} navigateTo={navigateTo} />
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-red-500" />
              <h2 className="text-3xl font-bold">Ofertas del día</h2>
            </div>
            <CountdownTimer />
          </div>

          <ProductGrid products={onSale} onAddToCart={handleAddToCart} navigateTo={navigateTo} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold">Más vendidos</h2>
          </div>

          <ProductGrid products={bestSellers} onAddToCart={handleAddToCart} navigateTo={navigateTo} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">No te pierdas las ofertas</h2>
          <p className="text-gray-400 mb-8">
            Suscríbete para recibir ofertas exclusivas y las últimas novedades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => showNotification('¡Gracias por suscribirte!', 'success')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Componente de grid de productos
function ProductGrid({ products, onAddToCart, navigateTo }) {
  const { toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="group relative">
          <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
            {product.badge && (
              <span className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-2 right-2 z-10 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <button
              onClick={() => navigateTo('product-detail', product)}
              className="block w-full"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
            </button>

            <div className="p-4">
              <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente de cuenta regresiva
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-red-500" />
      <div className="flex gap-1 font-mono">
        <span className="bg-gray-800 px-2 py-1 rounded">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-gray-800 px-2 py-1 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-gray-800 px-2 py-1 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

