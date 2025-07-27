// pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, X, ShoppingCart, Heart, Star, 
  TrendingUp, Clock, Package, AlertCircle, 
  ChevronRight, Grid3X3, List
} from 'lucide-react';
import { products, categories, brands } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

export function SearchResultsPage({ query, navigateTo }) {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showNotification } = useNotification();

  // Búsqueda inicial
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [searchResults, selectedBrands, selectedCategories, priceRange, sortBy]);

  const performSearch = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Buscar en productos
    const results = products.filter(product => {
      const inName = product.name.toLowerCase().includes(lowerQuery);
      const inDescription = product.description.toLowerCase().includes(lowerQuery);
      const inCategory = product.category.toLowerCase().includes(lowerQuery);
      const inBrand = product.brand.toLowerCase().includes(lowerQuery);
      const inFeatures = product.features.some(feature => 
        feature.toLowerCase().includes(lowerQuery)
      );
      
      return inName || inDescription || inCategory || inBrand || inFeatures;
    });

    // Calcular relevancia
    const resultsWithRelevance = results.map(product => {
      let relevance = 0;
      const lowerName = product.name.toLowerCase();
      const lowerDesc = product.description.toLowerCase();
      
      // Coincidencia exacta en nombre
      if (lowerName === lowerQuery) relevance += 100;
      // Coincidencia parcial en nombre
      if (lowerName.includes(lowerQuery)) relevance += 50;
      // Coincidencia en descripción
      if (lowerDesc.includes(lowerQuery)) relevance += 20;
      // Popularidad
      relevance += product.reviews * 0.01;
      // Rating
      relevance += product.rating * 5;
      
      return { ...product, relevance };
    });

    setSearchResults(resultsWithRelevance);
  };

  const applyFilters = () => {
    let filtered = [...searchResults];

    // Filtrar por marcas
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Ordenar
    switch (sortBy) {
      case 'relevance':
        filtered.sort((a, b) => b.relevance - a.relevance);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredResults(filtered);
  };

  // Obtener sugerencias de búsqueda
  const getSearchSuggestions = () => {
    const suggestions = [];
    
    // Categorías relacionadas
    const relatedCategories = categories.filter(cat => 
      searchResults.some(product => product.category === cat.id)
    );
    
    // Marcas relacionadas
    const relatedBrands = [...new Set(searchResults.map(p => p.brand))];
    
    return { categories: relatedCategories, brands: relatedBrands };
  };

  const suggestions = getSearchSuggestions();

  // Búsquedas relacionadas populares
  const relatedSearches = [
    'accesorios iPhone',
    'cargadores rápidos',
    'auriculares bluetooth',
    'fundas premium',
    'hubs USB-C'
  ].filter(search => search !== query.toLowerCase());

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`${product.name} añadido al carrito`, 'success');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de resultados */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <button 
              onClick={() => navigateTo('home')}
              className="hover:text-white transition-colors"
            >
              Inicio
            </button>
            <ChevronRight className="w-4 h-4" />
            <span>Búsqueda</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Resultados de búsqueda
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <p>
              {filteredResults.length} resultados para 
              <span className="text-white font-medium ml-1">"{query}"</span>
            </p>
            {searchResults.length !== filteredResults.length && (
              <span className="text-sm">
                ({searchResults.length} totales antes de filtros)
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar de filtros - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <SearchFilters
              searchResults={searchResults}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              suggestions={suggestions}
            />
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de herramientas */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Más relevantes</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                  <option value="popular">Más populares</option>
                </select>

                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700' : ''}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados */}
            {filteredResults.length === 0 ? (
              <NoResults 
                query={query} 
                hasFilters={selectedBrands.length > 0 || selectedCategories.length > 0}
                onClearFilters={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange({ min: 0, max: 1000 });
                }}
                navigateTo={navigateTo}
              />
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredResults.map(product => (
                      <SearchResultCard
                        key={product.id}
                        product={product}
                        query={query}
                        onAddToCart={() => handleAddToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product)}
                        isWishlisted={isInWishlist(product.id)}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredResults.map(product => (
                      <SearchResultListItem
                        key={product.id}
                        product={product}
                        query={query}
                        onAddToCart={() => handleAddToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product)}
                        isWishlisted={isInWishlist(product.id)}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Búsquedas relacionadas */}
            {filteredResults.length > 0 && (
              <RelatedSearches 
                searches={relatedSearches}
                navigateTo={navigateTo}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de filtros móvil */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Filtros</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <SearchFilters
                searchResults={searchResults}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                suggestions={suggestions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de filtros
function SearchFilters({ 
  searchResults, 
  selectedBrands, 
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  suggestions 
}) {
  const availableBrands = [...new Set(searchResults.map(p => p.brand))];
  const availableCategories = [...new Set(searchResults.map(p => p.category))];
  
  const minPrice = Math.min(...searchResults.map(p => p.price));
  const maxPrice = Math.max(...searchResults.map(p => p.price));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filtrar resultados</h3>
      </div>

      {/* Categorías sugeridas */}
      {suggestions.categories.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Categorías relacionadas</h4>
          <div className="space-y-2">
            {suggestions.categories.map(category => {
              const count = searchResults.filter(p => p.category === category.id).length;
              return (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category.id]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                      }
                    }}
                    className="rounded text-blue-600"
                  />
                  <span className="flex-1">{category.name}</span>
                  <span className="text-sm text-gray-500">{count}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Marcas */}
      {availableBrands.length > 1 && (
        <div>
          <h4 className="font-medium mb-3">Marca</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map(brand => {
              const count = searchResults.filter(p => p.brand === brand).length;
              return (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(selectedBrands.filter(b => b !== brand));
                      }
                    }}
                    className="rounded text-blue-600"
                  />
                  <span className="flex-1">{brand}</span>
                  <span className="text-sm text-gray-500">{count}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Rango de precio */}
      <div>
        <h4 className="font-medium mb-3">Precio</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-24 px-3 py-2 bg-gray-800 rounded-lg text-sm"
              min={0}
              max={priceRange.max}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-24 px-3 py-2 bg-gray-800 rounded-lg text-sm"
              min={priceRange.min}
              max={1000}
            />
          </div>
          <div className="text-xs text-gray-500">
            Rango: ${minPrice.toFixed(0)} - ${maxPrice.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Rating mínimo */}
      <div>
        <h4 className="font-medium mb-3">Valoración mínima</h4>
        <div className="space-y-2">
          {[4.5, 4, 3.5, 3].map(rating => {
            const count = searchResults.filter(p => p.rating >= rating).length;
            return (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="text-blue-600"
                />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span>{rating}+</span>
                </div>
                <span className="text-sm text-gray-500 ml-auto">({count})</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Tarjeta de resultado (vista grid)
function SearchResultCard({ product, query, onAddToCart, onToggleWishlist, isWishlisted, navigateTo }) {
  // Resaltar coincidencias en el texto
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} className="bg-yellow-500/30 font-semibold">{part}</span>
        : part
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all group">
      <div className="relative">
        <button
          onClick={() => navigateTo('product-detail', product)}
          className="block w-full"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
        </button>

        {product.badge && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        <button
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1">
          {highlightText(product.name, query)}
        </h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
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
            onClick={onAddToCart}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Item de resultado (vista lista)
function SearchResultListItem({ product, query, onAddToCart, onToggleWishlist, isWishlisted, navigateTo }) {
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} className="bg-yellow-500/30 font-semibold">{part}</span>
        : part
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex gap-4 hover:ring-2 hover:ring-blue-500 transition-all">
      <button
        onClick={() => navigateTo('product-detail', product)}
        className="shrink-0"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-5xl hover:scale-105 transition-transform">
          {product.image}
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              {highlightText(product.name, query)}
            </h3>
            <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
              <span className="text-sm text-gray-500">• {product.brand}</span>
              {product.inStock ? (
                <span className="text-sm text-green-500">En stock</span>
              ) : (
                <span className="text-sm text-red-500">Agotado</span>
              )}
            </div>

            {/* Características destacadas */}
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => {
                const hasMatch = feature.toLowerCase().includes(query.toLowerCase());
                return (
                  <span 
                    key={index} 
                    className={`text-xs px-2 py-1 rounded-full ${
                      hasMatch 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {feature}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="text-right">
            <div className="mb-2">
              <div className="text-2xl font-bold">${product.price}</div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onToggleWishlist}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button
                onClick={onAddToCart}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente sin resultados
function NoResults({ query, hasFilters, onClearFilters, navigateTo }) {
  return (
    <div className="text-center py-16">
      <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
      <h3 className="text-2xl font-semibold mb-2">
        No se encontraron resultados
      </h3>
      <p className="text-gray-400 mb-6">
        No encontramos productos que coincidan con "{query}"
        {hasFilters && ' con los filtros seleccionados'}
      </p>

      <div className="space-y-4">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-blue-400 hover:text-blue-300"
          >
            Limpiar filtros y buscar de nuevo
          </button>
        )}

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">Sugerencias:</p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Verifica la ortografía de tu búsqueda</li>
            <li>• Intenta con términos más generales</li>
            <li>• Usa menos palabras clave</li>
          </ul>
        </div>

        <button
          onClick={() => navigateTo('products')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Explorar todos los productos
        </button>
      </div>
    </div>
  );
}

// Búsquedas relacionadas
function RelatedSearches({ searches, navigateTo }) {
  return (
    <div className="mt-12 p-6 bg-gray-900 rounded-xl">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        Búsquedas relacionadas
      </h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => {
              // Aquí deberías actualizar la búsqueda
              navigateTo('search');
            }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}