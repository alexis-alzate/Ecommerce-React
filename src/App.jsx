// App.jsx - Componente Principal
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { DealsPage } from './pages/DealsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Notification } from './components/Notification';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const navigateTo = (page, product = null) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'products':
        return <ProductsPage navigateTo={navigateTo} />;
      case 'product-detail':
        return <ProductDetailPage product={selectedProduct} navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage navigateTo={navigateTo} />;
      case 'checkout':
        return <CheckoutPage navigateTo={navigateTo} />;
      case 'profile':
        return <ProfilePage navigateTo={navigateTo} />;
      case 'wishlist':
        return <WishlistPage navigateTo={navigateTo} />;
      case 'orders':
        return <OrdersPage navigateTo={navigateTo} />;
      case 'categories':
        return <CategoriesPage navigateTo={navigateTo} />;
      case 'deals':
        return <DealsPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'search':
        return <SearchResultsPage query={searchQuery} navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <NotificationProvider>
      <UserProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-950 text-white">
            <Header 
              navigateTo={navigateTo}
              currentPage={currentPage}
              setSearchQuery={setSearchQuery}
              setShowLogin={setShowLogin}
            />
            
            <main className="min-h-[calc(100vh-80px)]">
              {renderPage()}
            </main>
            
            <Footer navigateTo={navigateTo} />
            
            {showLogin && (
              <LoginModal onClose={() => setShowLogin(false)} />
            )}
            
            <Notification />
          </div>
        </CartProvider>
      </UserProvider>
    </NotificationProvider>
  );
}