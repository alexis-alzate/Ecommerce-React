// pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Star, Heart, ShoppingCart, Truck, Shield, 
  RotateCcw, Check, X, Plus, Minus, Share2, Package,
  Clock, CreditCard, Info, ChevronRight, Zap, Award
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

export function ProductDetailPage({ product, navigateTo }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useUser();
  const { showNotification } = useNotification();

  // Productos relacionados
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Reviews simuladas
  const [reviews] = useState([
    {
      id: 1,
      user: 'Carlos M.',
      avatar: '👨',
      rating: 5,
      date: '2024-01-15',
      title: 'Excelente producto',
      comment: 'La calidad es increíble, totalmente recomendado. Llegó antes de lo esperado.',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: 'María L.',
      avatar: '👩',
      rating: 4,
      date: '2024-01-10',
      title: 'Muy bueno pero...',
      comment: 'El producto es de muy buena calidad, aunque el precio es un poco elevado.',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: 'Juan P.',
      avatar: '🧑',
      rating: 5,
      date: '2024-01-05',
      title: 'Superó mis expectativas',
      comment: 'No me arrepiento de la compra. La construcción es sólida y funciona perfectamente.',
      helpful: 15,
      verified: true
    }
  ]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showNotification(`${quantity} ${product.name} añadido(s) al carrito`, 'success');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigateTo('cart');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Enlace copiado al portapapeles', 'success');
    }
  };

  // Calcular estadísticas de reviews
  const reviewStats = {
    average: product.rating,
    total: product.reviews,
    distribution: {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-white transition-colors"
          >
            Inicio
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => navigateTo('products')}
            className="hover:text-white transition-colors"
          >
            Productos
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Producto principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Galería de imágenes */}
          <div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl mb-4 relative overflow-hidden group">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-sm px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              
              <div className="aspect-square flex items-center justify-center text-[200px] p-8">
                {product.images ? product.images[selectedImage] : product.image}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                🔍 Hover para zoom
              </div>
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-900 rounded-lg p-4 text-4xl hover:ring-2 hover:ring-blue-500 transition-all ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating y reviews */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-500 text-yellow-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <button 
                onClick={() => setActiveTab('reviews')}
                className="text-blue-400 hover:text-blue-300"
              >
                {product.reviews} reseñas
              </button>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">SKU: {product.id.toString().padStart(6, '0')}</span>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">IVA incluido</p>
            </div>

            {/* Descripción corta */}
            <p className="text-gray-300 mb-6">{product.description}</p>

            {/* Selector de color */}
            {product.colors && product.colors.length > 1 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color: <span className="text-gray-400">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="w-5 h-5" />
                  <span>En stock ({product.stockQuantity} disponibles)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <X className="w-5 h-5" />
                  <span>Agotado</span>
                </div>
              )}
            </div>

            {/* Cantidad y botones */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Cantidad:</span>
                <div className="flex items-center bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-700 transition-colors rounded-l-lg"
                    disabled={!product.inStock}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="p-3 hover:bg-gray-700 transition-colors rounded-r-lg"
                    disabled={!product.inStock || quantity >= product.stockQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al carrito
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Comprar ahora
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors flex items-center justify-center gap-2 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-500/20 text-red-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product.id) ? 'En favoritos' : 'Añadir a favoritos'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-500" />
                <div className="text-sm">
                  <p className="font-medium">{product.shipping}</p>
                  <p className="text-gray-400">2-3 días hábiles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div className="text-sm">
                  <p className="font-medium">{product.warranty}</p>
                  <p className="text-gray-400">Garantía oficial</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <div className="text-sm">
                  <p className="font-medium">{product.returnPolicy}</p>
                  <p className="text-gray-400">Sin preguntas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-orange-500" />
                <div className="text-sm">
                  <p className="font-medium">Pago seguro</p>
                  <p className="text-gray-400">SSL encriptado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {['description', 'features', 'specs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'description' && 'Descripción'}
                {tab === 'features' && 'Características'}
                {tab === 'specs' && 'Especificaciones'}
                {tab === 'reviews' && `Reseñas (${product.reviews})`}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de tabs */}
        <div className="mb-16">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-4">{product.description}</p>
              <p className="text-gray-400">
                {product.name} representa lo último en tecnología y diseño. Cada detalle ha sido 
                cuidadosamente pensado para ofrecer la mejor experiencia posible. Ya sea que lo uses 
                para trabajo o entretenimiento, este producto está diseñado para superar tus expectativas.
              </p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <tr 
                      key={key}
                      className={`border-b border-gray-800 ${
                        index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-300">{key}</td>
                      <td className="px-6 py-4 text-gray-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Resumen de reviews */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-1">
                  <div className="bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-5xl font-bold mb-2">{reviewStats.average}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < Math.floor(reviewStats.average) 
                              ? 'fill-yellow-500 text-yellow-500' 
                              : 'text-gray-600'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-400">{reviewStats.total} reseñas totales</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-2">
                    {Object.entries(reviewStats.distribution).reverse().map(([stars, percentage]) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-12">{stars} ⭐</span>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-full rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-12 text-right">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón escribir reseña */}
              {user ? (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Escribir una reseña
                </button>
              ) : (
                <div className="mb-8 p-4 bg-gray-900 rounded-lg flex items-center justify-between">
                  <p>Inicia sesión para escribir una reseña</p>
                  <button
                    onClick={() => navigateTo('login')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Iniciar sesión
                  </button>
                </div>
              )}

              {/* Formulario de reseña */}
              {showReviewForm && (
                <ReviewForm 
                  onClose={() => setShowReviewForm(false)}
                  onSubmit={() => {
                    showNotification('Reseña publicada exitosamente', 'success');
                    setShowReviewForm(false);
                  }}
                />
              )}

              {/* Lista de reviews */}
              <div className="space-y-6">
                {reviews.map(review => (
                  <ReviewItem key={review.id} review={review} />
                ))}

                <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  Cargar más reseñas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Productos relacionados */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <RelatedProductCard 
                key={relProduct.id} 
                product={relProduct}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Componente de formulario de reseña
function ReviewForm({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && title && comment) {
      onSubmit({ rating, title, comment });
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Escribir una reseña</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Calificación</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl transition-colors"
              >
                <Star 
                  className={`w-8 h-8 ${
                    star <= rating 
                      ? 'fill-yellow-500 text-yellow-500' 
                      : 'text-gray-600 hover:text-gray-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Resume tu experiencia"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Comentario</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cuéntanos más sobre tu experiencia con este producto"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Publicar reseña
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// Componente de reseña individual
function ReviewItem({ review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    if (!voted) {
      setHelpful(helpful + 1);
      setVoted(true);
    }
  };

  return (
    <div className="border-b border-gray-800 pb-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{review.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user}</span>
                {review.verified && (
                  <span className="bg-green-600/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Compra verificada
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${
                i < review.rating 
                  ? 'fill-yellow-500 text-yellow-500' 
                  : 'text-gray-600'
              }`} 
            />
          ))}
        </div>
      </div>

      <h4 className="font-semibold mb-2">{review.title}</h4>
      <p className="text-gray-300 mb-4">{review.comment}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleHelpful}
          className={`text-sm flex items-center gap-2 ${
            voted ? 'text-blue-400' : 'text-gray-400 hover:text-white'
          } transition-colors`}
          disabled={voted}
        >
          <Check className="w-4 h-4" />
          Útil ({helpful})
        </button>
      </div>
    </div>
  );
}

// Componente de producto relacionado
function RelatedProductCard({ product, navigateTo }) {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <button
        onClick={() => navigateTo('product-detail', product)}
        className="block w-full"
      >
        <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
          
          <div className="p-4">
            <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs">{product.rating}</span>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <ShoppingCart className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}