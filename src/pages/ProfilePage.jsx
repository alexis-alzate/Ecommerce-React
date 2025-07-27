// pages/ProfilePage.jsx
import React, { useState } from 'react';
import { 
  User, Package, Heart, MapPin, CreditCard, Bell, Shield, 
  LogOut, Edit2, Save, X, Camera, Mail, Phone, Calendar,
  Award, ShoppingCart, Clock, Settings, ChevronRight, 
  Check, AlertCircle, Lock, Globe, Smartphone
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

export function ProfilePage({ navigateTo }) {
  const { user, orders, addresses, paymentMethods, updateProfile, logout } = useUser();
  const { wishlist } = useCart();
  const { showNotification } = useNotification();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user || {});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tu perfil</h2>
          <button
            onClick={() => navigateTo('login')}
            className="text-blue-400 hover:text-blue-300"
          >
            Iniciar sesión →
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Pedidos totales', 
      value: orders.length, 
      icon: Package,
      color: 'text-blue-500'
    },
    { 
      label: 'Lista de deseos', 
      value: wishlist.length, 
      icon: Heart,
      color: 'text-red-500'
    },
    { 
      label: 'Direcciones', 
      value: addresses.length, 
      icon: MapPin,
      color: 'text-green-500'
    },
    { 
      label: 'Métodos de pago', 
      value: paymentMethods.length, 
      icon: CreditCard,
      color: 'text-purple-500'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'General', icon: User },
    { id: 'orders', label: 'Pedidos', icon: Package, count: orders.length },
    { id: 'addresses', label: 'Direcciones', icon: MapPin, count: addresses.length },
    { id: 'payments', label: 'Pagos', icon: CreditCard, count: paymentMethods.length },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const handleSaveProfile = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
    showNotification('Perfil actualizado exitosamente', 'success');
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      showNotification('Las contraseñas no coinciden', 'error');
      return;
    }
    // Aquí iría la lógica para cambiar la contraseña
    showNotification('Contraseña actualizada exitosamente', 'success');
    setShowChangePassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
      navigateTo('home');
      showNotification('Sesión cerrada exitosamente', 'info');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header del perfil */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-5xl">
                {user.avatar}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-white/80 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Miembro desde {new Date(user.memberSince).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                </div>
                {user.role === 'admin' && (
                  <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Admin</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <OverviewTab 
                user={user}
                editedProfile={editedProfile}
                setEditedProfile={setEditedProfile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSaveProfile}
                recentOrders={orders.slice(0, 3)}
                navigateTo={navigateTo}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersTab 
                orders={orders}
                navigateTo={navigateTo}
              />
            )}

            {activeTab === 'addresses' && (
              <AddressesTab 
                addresses={addresses}
                user={user}
              />
            )}

            {activeTab === 'payments' && (
              <PaymentsTab 
                paymentMethods={paymentMethods}
              />
            )}

            {activeTab === 'security' && (
              <SecurityTab
                showChangePassword={showChangePassword}
                setShowChangePassword={setShowChangePassword}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                onChangePassword={handleChangePassword}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab General
function OverviewTab({ 
  user, 
  editedProfile, 
  setEditedProfile, 
  isEditing, 
  setIsEditing, 
  onSave,
  recentOrders,
  navigateTo 
}) {
  return (
    <div className="space-y-6">
      {/* Información personal */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Información personal</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={() => {
                  setEditedProfile(user);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nombre completo
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Teléfono
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {user.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Dirección principal
            </label>
            <p className="text-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              {user.address.city}, {user.address.state}
            </p>
          </div>
        </div>
      </div>

      {/* Pedidos recientes */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Pedidos recientes</h2>
          <button
            onClick={() => navigateTo('orders')}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <Package className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(order.date).toLocaleDateString('es-ES')} • {order.items.length} productos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-green-400">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No tienes pedidos todavía
          </p>
        )}
      </div>
    </div>
  );
}

// Tab Pedidos
function OrdersTab({ orders, navigateTo }) {
  const getStatusColor = (status) => {
    const colors = {
      'processing': 'text-yellow-400',
      'shipped': 'text-blue-400',
      'delivered': 'text-green-400',
      'cancelled': 'text-red-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'processing': Clock,
      'shipped': Truck,
      'delivered': Check,
      'cancelled': X
    };
    return icons[status] || Package;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Mis pedidos</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none">
            <option>Todos los pedidos</option>
            <option>En proceso</option>
            <option>Enviados</option>
            <option>Entregados</option>
            <option>Cancelados</option>
          </select>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <div key={order.id} className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pedido {order.id}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(order.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-1">${order.total.toFixed(2)}</p>
                    <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {order.status === 'processing' && 'En proceso'}
                        {order.status === 'shipped' && 'Enviado'}
                        {order.status === 'delivered' && 'Entregado'}
                        {order.status === 'cancelled' && 'Cancelado'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Productos del pedido */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Cantidad: {item.quantity} • ${item.price} c/u
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking */}
                {order.trackingNumber && (
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Número de seguimiento:</span>
                      <span className="font-mono text-sm">{order.trackingNumber}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      Rastrear pedido →
                    </button>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => navigateTo('order-detail', order)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Ver detalles
                  </button>
                  {order.status === 'delivered' && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Dejar reseña
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button className="px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      Cancelar pedido
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">No tienes pedidos todavía</h3>
          <p className="text-gray-400 mb-4">
            Cuando hagas tu primera compra, aparecerá aquí
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="text-blue-400 hover:text-blue-300"
          >
            Explorar productos →
          </button>
        </div>
      )}
    </div>
  );
}

// Tab Direcciones
function AddressesTab({ addresses, user }) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Mis direcciones</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Agregar dirección
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <div key={address.id} className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{address.name}</h3>
                  {address.isDefault && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      Predeterminada
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-gray-300">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-3 h-3" />
                  {address.phone}
                </p>
              </div>

              {!address.isDefault && (
                <button className="mt-4 text-sm text-blue-400 hover:text-blue-300">
                  Establecer como predeterminada
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-900 rounded-xl">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">No tienes direcciones guardadas</h3>
          <p className="text-gray-400 mb-4">
            Agrega una dirección para facilitar tus compras
          </p>
        </div>
      )}
    </div>
  );
}

// Tab Métodos de pago
function PaymentsTab({ paymentMethods }) {
  const cardIcons = {
    'Visa': '💳',
    'Mastercard': '💳',
    'Amex': '💳'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Métodos de pago</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Agregar tarjeta
        </button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cardIcons[method.brand]}</span>
                  <div>
                    <h3 className="font-semibold">{method.brand}</h3>
                    <p className="text-sm text-gray-400">•••• {method.last4}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                    Predeterminada
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Expira {method.expiryMonth}/{method.expiryYear}
                </p>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    Editar
                  </button>
                  <button className="text-sm text-red-400 hover:text-red-300">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-900 rounded-xl">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">No tienes métodos de pago guardados</h3>
          <p className="text-gray-400 mb-4">
            Agrega una tarjeta para comprar más rápido
          </p>
        </div>
      )}
    </div>
  );
}

// Tab Seguridad
function SecurityTab({ 
  showChangePassword, 
  setShowChangePassword, 
  passwordData, 
  setPasswordData,
  onChangePassword 
}) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Seguridad de la cuenta</h2>

      {/* Cambiar contraseña */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Contraseña</h3>
            <p className="text-sm text-gray-400">
              Última actualización hace 3 meses
            </p>
          </div>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="text-blue-400 hover:text-blue-300"
          >
            Cambiar contraseña
          </button>
        </div>

        {showChangePassword && (
          <div className="space-y-4 mt-6 pt-6 border-t border-gray-800">
            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña actual
              </label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onChangePassword}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Actualizar contraseña
              </button>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswordData({ current: '', new: '', confirm: '' });
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Autenticación de dos factores */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              Autenticación de dos factores
            </h3>
            <p className="text-sm text-gray-400">
              Añade una capa extra de seguridad a tu cuenta
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <div className="mt-6 p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="w-5 h-5" />
              <p className="text-sm">
                La autenticación de dos factores está activa
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sesiones activas */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Sesiones activas</h3>
          <button
            onClick={() => setShowSessions(!showSessions)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {showSessions ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {showSessions && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">iPhone 13 Pro</p>
                  <p className="text-sm text-gray-400">Safari • Bogotá, Colombia</p>
                </div>
              </div>
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                Actual
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Chrome en MacBook Pro</p>
                  <p className="text-sm text-gray-400">Chrome • Bogotá, Colombia</p>
                </div>
              </div>
              <button className="text-sm text-red-400 hover:text-red-300">
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Eliminar cuenta */}
      <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-2 text-red-400">
          Zona de peligro
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.
        </p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          Eliminar cuenta permanentemente
        </button>
      </div>
    </div>
  );
}

// Tab Configuración
function SettingsTab() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    darkMode: true,
    language: 'es'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Configuración</h2>

      {/* Notificaciones */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificaciones
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-gray-400">
                Recibe notificaciones importantes en tu correo
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Actualizaciones de pedidos</p>
              <p className="text-sm text-gray-400">
                Notificaciones sobre el estado de tus pedidos
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.orderUpdates}
              onChange={() => handleToggle('orderUpdates')}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Promociones y ofertas</p>
              <p className="text-sm text-gray-400">
                Recibe ofertas exclusivas y descuentos especiales
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.promotions}
              onChange={() => handleToggle('promotions')}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-gray-400">
                Novedades y lanzamientos de productos
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={() => handleToggle('newsletter')}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Preferencias */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferencias
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Idioma</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Modo oscuro</p>
              <p className="text-sm text-gray-400">
                Usa el tema oscuro en toda la aplicación
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Privacidad */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacidad
        </h3>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between">
            <span>Descargar mis datos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between">
            <span>Política de privacidad</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between">
            <span>Términos y condiciones</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}