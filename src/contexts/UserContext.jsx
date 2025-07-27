// contexts/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

// Base de datos de usuarios de prueba
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@techgear.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: '👨‍💼',
    phone: '+1 234 567 8900',
    address: {
      street: '123 Tech Street',
      city: 'Silicon Valley',
      state: 'CA',
      zipCode: '94025',
      country: 'USA'
    },
    memberSince: '2023-01-01'
  },
  {
    id: 2,
    email: 'john@example.com',
    password: 'john123',
    name: 'John Doe',
    role: 'customer',
    avatar: '👨',
    phone: '+1 234 567 8901',
    address: {
      street: '456 Main Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    memberSince: '2023-06-15'
  },
  {
    id: 3,
    email: 'sarah@example.com',
    password: 'sarah123',
    name: 'Sarah Johnson',
    role: 'customer',
    avatar: '👩',
    phone: '+1 234 567 8902',
    address: {
      street: '789 Oak Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    memberSince: '2023-08-22'
  },
  {
    id: 4,
    email: 'demo@demo.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'customer',
    avatar: '🧑',
    phone: '+1 234 567 8903',
    address: {
      street: '321 Demo Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    memberSince: '2024-01-10'
  }
];

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadUserData(userData.id);
    }
  }, []);

  // Cargar datos específicos del usuario
  const loadUserData = (userId) => {
    const savedOrders = localStorage.getItem(`orders_${userId}`);
    const savedAddresses = localStorage.getItem(`addresses_${userId}`);
    const savedPaymentMethods = localStorage.getItem(`paymentMethods_${userId}`);

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedPaymentMethods) setPaymentMethods(JSON.parse(savedPaymentMethods));
  };

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      loadUserData(foundUser.id);
      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Email o contraseña incorrectos' };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setOrders([]);
    setAddresses([]);
    setPaymentMethods([]);
    localStorage.removeItem('currentUser');
  };

  // Actualizar perfil
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return { success: true };
  };

  // Gestión de pedidos
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      status: 'processing',
      trackingNumber: `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ...orderData
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
    
    return newOrder;
  };

  // Gestión de direcciones
  const addAddress = (address) => {
    const newAddress = {
      id: Date.now(),
      ...address
    };
    
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses));
    
    return newAddress;
  };

  const updateAddress = (addressId, updatedData) => {
    const updatedAddresses = addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updatedData } : addr
    );
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses));
  };

  const deleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses));
  };

  // Gestión de métodos de pago
  const addPaymentMethod = (paymentMethod) => {
    const newPaymentMethod = {
      id: Date.now(),
      ...paymentMethod
    };
    
    const updatedPaymentMethods = [...paymentMethods, newPaymentMethod];
    setPaymentMethods(updatedPaymentMethods);
    localStorage.setItem(`paymentMethods_${user.id}`, JSON.stringify(updatedPaymentMethods));
    
    return newPaymentMethod;
  };

  const deletePaymentMethod = (paymentMethodId) => {
    const updatedPaymentMethods = paymentMethods.filter(pm => pm.id !== paymentMethodId);
    setPaymentMethods(updatedPaymentMethods);
    localStorage.setItem(`paymentMethods_${user.id}`, JSON.stringify(updatedPaymentMethods));
  };

  const value = {
    user,
    orders,
    addresses,
    paymentMethods,
    isLoading,
    login,
    logout,
    updateProfile,
    addOrder,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod,
    MOCK_USERS // Exportar para mostrar usuarios de prueba en el login
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}