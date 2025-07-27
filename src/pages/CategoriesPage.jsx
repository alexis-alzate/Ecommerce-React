// pages/CategoriesPage.jsx
import React, { useState } from 'react';
import { 
  Grid3X3, ChevronRight, Package, TrendingUp, Star, 
  Sparkles, Clock, Filter, Search, Award 
} from 'lucide-react';
import { categories, products } from '../data/products';
import { useCart } from '../contexts/CartContext';

export function CategoriesPage({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Filtrar categorías según búsqueda
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obtener productos destacados por categoría
  const getFeaturedProducts = (categoryId) => {
    return products
      .filter(p => p.category === categoryId)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  };

  // Obtener estadísticas de categoría
  const getCategoryStats = (categoryId) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
    const avgRating = categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length;
    const onSaleCount = categoryProducts.filter(p => p.originalPrice).length;
    
    return {
      totalProducts: categoryProducts.length,
      avgPrice: avgPrice.toFixed(2),
      avgRating: avgRating.toFixed(1),
      onSaleCount
    };
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleViewAllProducts = (categoryId) => {
    // Aquí podrías navegar a la página de productos con el filtro de categoría aplicado
    navigateTo('products');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categorías</h1>
          <p className="text-gray-400">
            Explora nuestra colección completa de accesorios tech
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Grid de categorías */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories
            .filter(cat => cat.id !== 'all')
            .map(category => {
              const stats = getCategoryStats(category.id);
              const isExpanded = selectedCategory?.id === category.id;
              const featuredProducts = isExpanded ? getFeaturedProducts(category.id) : [];

              return (
                <div
                  key={category.id}
                  className={`bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  {/* Header de categoría */}
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="w-full p-6 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {stats.totalProducts} productos
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`} />
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">${stats.avgPrice}</p>
                        <p className="text-xs text-gray-400">Precio promedio</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold flex items-center justify-center gap-1">
                          {stats.avgRating}
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        </p>
                        <p className="text-xs text-gray-400">Rating promedio</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">
                          {stats.onSaleCount}
                        </p>
                        <p className="text-xs text-gray-400">En oferta</p>
                      </div>
                    </div>

                    {/* Subcategorías */}
                    {category.subcategories && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {category.subcategories.map(sub => (
                          <span
                            key={sub.id}
                            className="text-xs bg-gray-800 px-3 py-1 rounded-full"
                          >
                            {sub.icon} {sub.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>

                  {/* Contenido expandido */}
                  {isExpanded && (
                    <div className="border-t border-gray-800">
                      <div className="p-6">
                        <h4 className="font-semibold mb-4">Productos destacados</h4>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {featuredProducts.map(product => (
                            <FeaturedProductCard
                              key={product.id}
                              product={product}
                              onAddToCart={() => addToCart(product)}
                              onToggleWishlist={() => toggleWishlist(product)}
                              isWishlisted={isInWishlist(product.id)}
                              navigateTo={navigateTo}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => handleViewAllProducts(category.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          Ver todos los productos de {category.name}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Sección de tendencias */}
        <TrendingSection navigateTo={navigateTo} />

        {/* Sección de marcas populares */}
        <PopularBrandsSection navigateTo={navigateTo} />
      </div>
    </div>
  );
}

// Componente de producto destacado
function FeaturedProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, navigateTo }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all group">
      <button
        onClick={() => navigateTo('product-detail', product)}
        className="block w-full"
      >
        <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
      </button>
      
      <div className="p-3">
        <h5 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h5>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-xs">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
              }}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
            >
              <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <ShoppingCart className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sección de tendencias
function TrendingSection({ navigateTo }) {
  const trendingCategories = [
    {
      id: 'smart-home',
      name: 'Casa inteligente',
      icon: '🏠',
      trend: '+45%',
      description: 'Controla tu hogar desde tu dispositivo'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: '🎮',
      trend: '+38%',
      description: 'Accesorios para gamers profesionales'
    },
    {
      id: 'fitness',
      name: 'Fitness Tech',
      icon: '💪',
      trend: '+52%',
      description: 'Tecnología para tu entrenamiento'
    },
    {
      id: 'eco',
      name: 'Eco-friendly',
      icon: '🌱',
      trend: '+67%',
      description: 'Productos sustentables'
    }
  ];

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          Categorías en tendencia
        </h2>
        <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
          Ver todas
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingCategories.map(category => (
          <button
            key={category.id}
            onClick={() => navigateTo('products')}
            className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 text-left transition-all hover:scale-105 group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{category.icon}</span>
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                {category.trend}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{category.name}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
            
            <div className="mt-4 flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm">Explorar</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// Sección de marcas populares
function PopularBrandsSection({ navigateTo }) {
  const popularBrands = [
    { name: 'Apple', logo: '🍎', products: 45 },
    { name: 'Sony', logo: '🎵', products: 32 },
    { name: 'Bose', logo: '🎧', products: 28 },
    { name: 'Logitech', logo: '🖱️', products: 38 },
    { name: 'Anker', logo: '⚡', products: 25 },
    { name: 'Belkin', logo: '🔌', products: 22 }
  ];

  return (
    <section className="mt-16 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-500" />
          Marcas populares
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {popularBrands.map(brand => (
          <button
            key={brand.name}
            onClick={() => navigateTo('products')}
            className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 text-center transition-all hover:scale-105"
          >
            <span className="text-4xl mb-3 block">{brand.logo}</span>
            <h4 className="font-medium mb-1">{brand.name}</h4>
            <p className="text-xs text-gray-400">{brand.products} productos</p>
          </button>
        ))}
      </div>
    </section>
  );
}