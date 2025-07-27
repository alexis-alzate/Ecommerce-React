// pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Filter, X, ChevronDown, Grid3X3, List, Star, Heart, 
  ShoppingCart, Eye, ArrowUpDown, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import { products, categories, brands, priceRanges, sortOptions } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

export function ProductsPage({ navigateTo }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  // Filtros
  const [filters, setFilters] = useState({
    category: 'all',
    subcategory: 'all',
    brand: [],
    priceRange: 'all',
    rating: 0,
    inStock: false,
    onSale: false
  });
  
  const [sortBy, setSortBy] = useState('featured');
  const [showQuickView, setShowQuickView] = useState(null);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { showNotification } = useNotification();

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let filtered = [...products];

    // Filtro por categoría
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filtro por subcategoría
    if (filters.subcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === filters.subcategory);
    }

    // Filtro por marca
    if (filters.brand.length > 0) {
      filtered = filtered.filter(p => filters.brand.includes(p.brand));
    }

    // Filtro por rango de precio
    if (filters.priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Filtro por rating
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    // Filtro por stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Filtro por ofertas
    if (filters.onSale) {
      filtered = filtered.filter(p => p.originalPrice);
    }

    // Ordenar
    const sortOption = sortOptions.find(opt => opt.id === sortBy);
    if (sortOption) {
      filtered.sort(sortOption.sortFn);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset a la primera página cuando cambian los filtros
  }, [filters, sortBy]);

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'brand') {
      setFilters(prev => ({
        ...prev,
        brand: prev.brand.includes(value)
          ? prev.brand.filter(b => b !== value)
          : [...prev.brand, value]
      }));
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      subcategory: 'all',
      brand: [],
      priceRange: 'all',
      rating: 0,
      inStock: false,
      onSale: false
    });
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.subcategory !== 'all' ? 1 : 0) +
    filters.brand.length +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  return (
    <div className="min-h-screen">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Todos los productos</h1>
          <p className="text-gray-400">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersPanel 
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              activeCount={activeFiltersCount}
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
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4">
                {/* Selector de ordenamiento */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-800 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Selector de vista */}
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

            {/* Filtros activos */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category !== 'all' && (
                  <FilterTag
                    label={`Categoría: ${categories.find(c => c.id === filters.category)?.name}`}
                    onRemove={() => handleFilterChange('category', 'all')}
                  />
                )}
                {filters.brand.map(brand => (
                  <FilterTag
                    key={brand}
                    label={`Marca: ${brand}`}
                    onRemove={() => handleFilterChange('brand', brand)}
                  />
                ))}
                {filters.priceRange !== 'all' && (
                  <FilterTag
                    label={`Precio: ${priceRanges.find(r => r.id === filters.priceRange)?.label}`}
                    onRemove={() => handleFilterChange('priceRange', 'all')}
                  />
                )}
                {filters.rating > 0 && (
                  <FilterTag
                    label={`Rating: ${filters.rating}+ ⭐`}
                    onRemove={() => handleFilterChange('rating', 0)}
                  />
                )}
                {filters.inStock && (
                  <FilterTag
                    label="En stock"
                    onRemove={() => handleFilterChange('inStock', false)}
                  />
                )}
                {filters.onSale && (
                  <FilterTag
                    label="En oferta"
                    onRemove={() => handleFilterChange('onSale', false)}
                  />
                )}
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Grid/Lista de productos */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-400 mb-4">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <button
                  onClick={resetFilters}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {currentProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product)}
                        isWishlisted={isInWishlist(product.id)}
                        onQuickView={() => setShowQuickView(product)}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentProducts.map(product => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product)}
                        isWishlisted={isInWishlist(product.id)}
                        onQuickView={() => setShowQuickView(product)}
                        navigateTo={navigateTo}
                      />
                    ))}
                  </div>
                )}

                {/* Paginación */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
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
              <FiltersPanel 
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
                activeCount={activeFiltersCount}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de vista rápida */}
      {showQuickView && (
        <QuickViewModal
          product={showQuickView}
          onClose={() => setShowQuickView(null)}
          onAddToCart={() => {
            addToCart(showQuickView);
            setShowQuickView(null);
          }}
          navigateTo={navigateTo}
        />
      )}
    </div>
  );
}

// Panel de filtros
function FiltersPanel({ filters, onFilterChange, onReset, activeCount }) {
  const selectedCategory = categories.find(c => c.id === filters.category);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      {/* Categorías */}
      <div>
        <h4 className="font-medium mb-3">Categoría</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.id}
                onChange={() => onFilterChange('category', category.id)}
                className="text-blue-600"
              />
              <span className="flex-1">{category.name}</span>
              <span className="text-sm text-gray-500">{category.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategorías */}
      {subcategories.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Subcategoría</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="subcategory"
                checked={filters.subcategory === 'all'}
                onChange={() => onFilterChange('subcategory', 'all')}
                className="text-blue-600"
              />
              <span>Todas</span>
            </label>
            {subcategories.map(sub => (
              <label key={sub.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="subcategory"
                  checked={filters.subcategory === sub.id}
                  onChange={() => onFilterChange('subcategory', sub.id)}
                  className="text-blue-600"
                />
                <span>{sub.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Marcas */}
      <div>
        <h4 className="font-medium mb-3">Marca</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => onFilterChange('brand', brand)}
                className="text-blue-600 rounded"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h4 className="font-medium mb-3">Precio</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.id}
                onChange={() => onFilterChange('priceRange', range.id)}
                className="text-blue-600"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Valoración mínima</h4>
        <div className="space-y-2">
          {[0, 4, 4.5, 4.8].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFilterChange('rating', rating)}
                className="text-blue-600"
              />
              <div className="flex items-center gap-1">
                {rating === 0 ? (
                  <span>Todas</span>
                ) : (
                  <>
                    <span>{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-gray-500">y más</span>
                  </>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Otros filtros */}
      <div>
        <h4 className="font-medium mb-3">Otros filtros</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange('inStock', e.target.checked)}
              className="text-blue-600 rounded"
            />
            <span>Solo productos en stock</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => onFilterChange('onSale', e.target.checked)}
              className="text-blue-600 rounded"
            />
            <span>Solo ofertas</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Componente de producto (vista grid)
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onQuickView, navigateTo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        <button
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 z-10 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        <button
  onClick={() => navigateTo('product-detail', product)}
  className="block w-full"
>
  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 relative">
    {product.image}
    
    {isHovered && (
      <div  
        onClick={(e) => {
          e.stopPropagation();
          onQuickView();
        }}
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"  
      >
        <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Vista rápida
        </div>
      </div>  
    )}
  </div>
</button>
        <div className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
          
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
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de producto (vista lista)
function ProductListItem({ product, onAddToCart, onToggleWishlist, isWishlisted, onQuickView, navigateTo }) {
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
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
              {product.inStock ? (
                <span className="text-sm text-green-500">En stock</span>
              ) : (
                <span className="text-sm text-red-500">Agotado</span>
              )}
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
                onClick={onQuickView}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
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

// Tag de filtro activo
function FilterTag({ label, onRemove }) {
  return (
    <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-lg">
      <span className="text-sm">{label}</span>
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-gray-700 rounded transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

// Componente de paginación
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// Modal de vista rápida
function QuickViewModal({ product, onClose, onAddToCart, navigateTo }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-gray-800/80 backdrop-blur rounded-lg hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Imagen */}
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-[200px]">
            {product.image}
          </div>

          {/* Información */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviews} reseñas)</span>
              {product.inStock ? (
                <span className="text-green-500">✓ En stock</span>
              ) : (
                <span className="text-red-500">Agotado</span>
              )}
            </div>

            <p className="text-gray-400 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through ml-3">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Selector de color */}
            {product.colors && product.colors.length > 1 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Color: {selectedColor}</h4>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
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

            {/* Cantidad */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Cantidad</h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={onAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Añadir al carrito
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-red-500 bg-red-500/20 text-red-500'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                navigateTo('product-detail', product);
                onClose();
              }}
              className="w-full mt-3 text-blue-400 hover:text-blue-300 py-2 transition-colors"
            >
              Ver detalles completos →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

