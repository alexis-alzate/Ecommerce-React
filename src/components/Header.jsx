// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Heart, Menu, X, ChevronDown,
  Package, LogOut, Settings, Clock, MapPin, CreditCard,
  Bell, Home, Grid, Tag, Info, Phone, LogIn
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { categories } from '../data/products';

export function Header({ navigateTo, currentPage, setSearchQuery, setShowLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { getCartCount, wishlist } = useCart();
  const { user, logout } = useUser();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      navigateTo('search');
      setIsSearchOpen(false);
      setSearchInput('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigateTo('home');
  };

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home, action: () => navigateTo('home') },
    { id: 'products', label: 'Productos', icon: Grid, action: () => navigateTo('products') },
    { id: 'categories', label: 'Categorías', icon: Tag, action: () => navigateTo('categories') },
    { id: 'deals', label: 'Ofertas', icon: Tag, badge: 'HOT', action: () => navigateTo('deals') },
    { id: 'about', label: 'Nosotros', icon: Info, action: () => navigateTo('about') },
    { id: 'contact', label: 'Contacto', icon: Phone, action: () => navigateTo('contact') }
  ];

  const userMenuItems = user ? [
    { label: 'Mi Perfil', icon: User, action: () => { navigateTo('profile'); setIsUserMenuOpen(false); } },
    { label: 'Mis Pedidos', icon: Package, action: () => { navigateTo('orders'); setIsUserMenuOpen(false); } },
    { label: 'Lista de Deseos', icon: Heart, badge: wishlist.length, action: () => { navigateTo('wishlist'); setIsUserMenuOpen(false); } },
    { label: 'Direcciones', icon: MapPin, action: () => { navigateTo('profile'); setIsUserMenuOpen(false); } },
    { label: 'Métodos de Pago', icon: CreditCard, action: () => { navigateTo('profile'); setIsUserMenuOpen(false); } },
    { divider: true },
    { label: 'Configuración', icon: Settings, action: () => { navigateTo('profile'); setIsUserMenuOpen(false); } },
    { label: 'Cerrar Sesión', icon: LogOut, action: handleLogout, danger: true }
  ] : [
    { label: 'Iniciar Sesión', icon: LogIn, action: () => { setShowLogin(true); setIsUserMenuOpen(false); } },
    { label: 'Crear Cuenta', icon: User, action: () => { setShowLogin(true); setIsUserMenuOpen(false); } }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-950/95 backdrop-blur-xl shadow-lg shadow-black/20' 
          : 'bg-gray-950/80 backdrop-blur-lg'
      } border-b border-gray-800`}>
        {/* Top Bar - Anuncio */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2 px-4 text-center">
          <p>🎉 <strong>Black Friday Tech!</strong> Hasta 50% OFF en productos seleccionados • Envío gratis en compras +$99</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y navegación principal */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 group"
              >
                <span className="text-2xl group-hover:animate-pulse">⚡</span>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TechGear Pro
                </h1>
              </button>
              
              {/* Navegación desktop */}
              <nav className="hidden lg:flex items-center gap-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                      currentPage === item.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}

                {/* Dropdown de categorías */}
                <div className="relative">
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 font-medium transition-all"
                  >
                    Categorías
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoriesOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsCategoriesOpen(false)}
                      />
                      <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-50">
                        {categories.filter(cat => cat.id !== 'all').map(category => (
                          <button
                            key={category.id}
                            onClick={() => {
                              navigateTo('products');
                              setIsCategoriesOpen(false);
                            }}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                            <span className="text-sm text-gray-500 group-hover:text-gray-300">
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </nav>
            </div>

            {/* Acciones de usuario */}
            <div className="flex items-center gap-2">
              {/* Búsqueda */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notificaciones (solo usuarios logueados) */}
              {user && (
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

              {/* Wishlist */}
              <button 
                onClick={() => navigateTo('wishlist')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all relative"
                aria-label="Lista de deseos"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              
              {/* Carrito */}
              <button 
                onClick={() => navigateTo('cart')}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-all"
                aria-label="Carrito"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Usuario */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`p-2 hover:bg-gray-800 rounded-lg transition-all flex items-center gap-2 ${
                    user ? 'pl-3' : ''
                  }`}
                  aria-label="Menú de usuario"
                >
                  {user ? (
                    <>
                      <span className="text-2xl">{user.avatar}</span>
                      <span className="hidden md:block text-sm font-medium">{user.name.split(' ')[0]}</span>
                    </>
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>

                {/* Dropdown de usuario */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-50">
                      {user && (
                        <div className="px-4 py-3 border-b border-gray-800">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      )}
                      
                      <div className="py-2">
                        {userMenuItems.map((item, index) => (
                          item.divider ? (
                            <div key={index} className="my-2 border-t border-gray-800" />
                          ) : (
                            <button
                              key={index}
                              onClick={item.action}
                              className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors ${
                                item.danger ? 'text-red-400 hover:text-red-300' : ''
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.badge > 0 && (
                                <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Menú móvil */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-all"
                aria-label="Menú"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de búsqueda */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Buscar productos</h3>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Buscar productos, marcas, categorías..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      autoFocus
                    />
                  </div>
                </form>

                {/* Búsquedas populares */}
                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-3">Búsquedas populares</p>
                  <div className="flex flex-wrap gap-2">
                    {['AirPods', 'iPhone 15', 'MacBook', 'Cargadores', 'Fundas'].map(term => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchInput(term);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menú móvil */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-gray-900 z-50 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Menú</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                item.action();
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Categorías en móvil */}
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Categorías</h3>
          <div className="space-y-1">
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <button
                key={category.id}
                onClick={() => {
                  navigateTo('products');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span>{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info de usuario en móvil */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{user.avatar}</span>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Overlay del menú móvil */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}