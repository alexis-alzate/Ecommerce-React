// pages/WishlistPage.jsx
import React, { useState } from 'react';
import { 
  Heart, ShoppingCart, Trash2, Share2, Search, Filter,
  Star, ArrowRight, Package, X, Copy, Check
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

export function WishlistPage({ navigateTo }) {
  const { wishlist, removeFromWishlist, addToCart, moveToCart } = useCart();
  const { user } = useUser();
  const { showNotification } = useNotification();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-added');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtrar productos según búsqueda
  const filteredWishlist = wishlist.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ordenar productos
  const sortedWishlist = [...filteredWishlist].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // date-added (orden original)
    }
  });

  const handleMoveAllToCart = () => {
    wishlist.forEach(product => {
      moveToCart(product.id);
    });
    showNotification('Todos los productos se han añadido al carrito', 'success');
  };

  const handleShareWishlist = () => {
    // Generar URL única para compartir
    const url = `${window.location.origin}/wishlist/shared/${user?.id || 'guest'}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showNotification('Enlace copiado al portapapeles', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showNotification('Error al copiar el enlace', 'error');
    }
  };

  const totalValue = sortedWishlist.reduce((sum, product) => sum + product.price, 0);
  const totalSavings = sortedWishlist.reduce((sum, product) => {
    return sum + (product.originalPrice ? product.originalPrice - product.price : 0);
  }, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              Mi lista de deseos
            </h1>
            {sortedWishlist.length > 0 && (
              <button
                onClick={handleShareWishlist}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Compartir lista
              </button>
            )}
          </div>
          
          {sortedWishlist.length > 0 && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>{sortedWishlist.length} productos</span>
              <span>•</span>
              <span>Valor total: ${totalValue.toFixed(2)}</span>
              {totalSavings > 0 && (
                <>
                  <span>•</span>
                  <span className="text-green-400">Ahorras: ${totalSavings.toFixed(2)}</span>
                </>
              )}
            </div>
          )}
        </div>

        {sortedWishlist.length === 0 ? (
          <EmptyWishlist navigateTo={navigateTo} />
        ) : (
          <>
            {/* Barra de herramientas */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en tu lista de deseos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date-added">Más recientes</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                  <option value="rating">Mejor valorados</option>
                </select>

                <button
                  onClick={handleMoveAllToCart}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Añadir todo al carrito</span>
                  <span className="sm:hidden">Todo al carrito</span>
                </button>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedWishlist.map(product => (
                <WishlistItem
                  key={product.id}
                  product={product}
                  onRemove={() => removeFromWishlist(product.id)}
                  onMoveToCart={() => moveToCart(product.id)}
                  navigateTo={navigateTo}
                />
              ))}
            </div>

            {/* Sección de recomendaciones */}
            <RecommendationSection 
              category={sortedWishlist[0]?.category}
              navigateTo={navigateTo}
            />
          </>
        )}
      </div>

      {/* Modal de compartir */}
      {showShareModal && (
        <ShareModal
          shareUrl={shareUrl}
          onClose={() => setShowShareModal(false)}
          onCopy={handleCopyLink}
          copied={copied}
        />
      )}
    </div>
  );
}

// Componente de producto en la wishlist
function WishlistItem({ product, onRemove, onMoveToCart, navigateTo }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`
      bg-gray-900 rounded-xl overflow-hidden group transition-all duration-300
      ${isRemoving ? 'scale-95 opacity-0' : 'hover:ring-2 hover:ring-blue-500'}
    `}>
      <div className="relative">
        <button
          onClick={() => navigateTo('product-detail', product)}
          className="block w-full"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
        </button>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Botón eliminar */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
          {product.inStock ? (
            <span className="text-sm text-green-500">• En stock</span>
          ) : (
            <span className="text-sm text-red-500">• Agotado</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onMoveToCart}
          disabled={!product.inStock}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Añadir al carrito' : 'Sin stock'}
        </button>
      </div>
    </div>
  );
}

// Componente de wishlist vacía
function EmptyWishlist({ navigateTo }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 opacity-20">💔</div>
        <h2 className="text-3xl font-bold mb-4">Tu lista de deseos está vacía</h2>
        <p className="text-gray-400 mb-8">
          Guarda tus productos favoritos aquí para comprarlos más tarde
        </p>
        
        <button
          onClick={() => navigateTo('products')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
        >
          Explorar productos
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="mt-12 p-6 bg-gray-900 rounded-xl">
          <h3 className="font-semibold mb-3">¿Sabías que...?</h3>
          <ul className="text-left text-sm text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Puedes compartir tu lista de deseos con amigos y familiares</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Te notificaremos cuando los productos bajen de precio</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Puedes mover todos los productos al carrito con un clic</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Modal de compartir
function ShareModal({ shareUrl, onClose, onCopy, copied }) {
  const shareOptions = [
    { name: 'WhatsApp', icon: '💬', color: 'bg-green-600' },
    { name: 'Facebook', icon: '👍', color: 'bg-blue-600' },
    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
    { name: 'Email', icon: '✉️', color: 'bg-gray-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Compartir lista de deseos</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* URL para compartir */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Enlace de tu lista
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-sm"
              />
              <button
                onClick={onCopy}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Opciones de compartir */}
          <div>
            <p className="text-sm font-medium text-gray-400 mb-3">
              Compartir en redes sociales
            </p>
            <div className="grid grid-cols-4 gap-3">
              {shareOptions.map(option => (
                <button
                  key={option.name}
                  className={`${option.color} hover:opacity-80 text-white p-3 rounded-lg transition-opacity flex flex-col items-center gap-1`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-xs">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Información */}
          <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <p className="text-sm text-blue-400">
              Las personas que accedan a este enlace podrán ver los productos en tu lista de deseos, 
              pero no podrán modificarla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sección de recomendaciones
function RecommendationSection({ category, navigateTo }) {
  // Aquí normalmente buscarías productos relacionados con la categoría
  const recommendations = [
    { id: 101, name: 'Cable USB-C Premium', price: 29.99, image: '🔌', rating: 4.7 },
    { id: 102, name: 'Funda protectora', price: 39.99, image: '📱', rating: 4.8 },
    { id: 103, name: 'Adaptador multipuerto', price: 49.99, image: '🔗', rating: 4.6 },
    { id: 104, name: 'Power Bank 10000mAh', price: 59.99, image: '🔋', rating: 4.9 }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">También te puede interesar</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <div key={product.id} className="bg-gray-900 rounded-xl p-4 hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center text-4xl mb-3">
              {product.image}
            </div>
            <h4 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h4>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs">{product.rating}</span>
            </div>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}