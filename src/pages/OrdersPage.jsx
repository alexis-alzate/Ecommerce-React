// pages/OrdersPage.jsx
import React, { useState } from 'react';
import { 
  Package, Clock, Truck, Check, X, ChevronRight, ChevronDown,
  MapPin, CreditCard, Calendar, Search, Filter, Download,
  AlertCircle, Phone, Mail, Copy, ExternalLink, Star
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

export function OrdersPage({ navigateTo }) {
  const { user, orders } = useUser();
  const { showNotification } = useNotification();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tus pedidos</h2>
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

  // Filtrar pedidos
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Ordenar pedidos
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'total-desc':
        return b.total - a.total;
      case 'total-asc':
        return a.total - b.total;
      default:
        return 0;
    }
  });

  // Estadísticas
  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const handleCopyTracking = (trackingNumber) => {
    navigator.clipboard.writeText(trackingNumber);
    showNotification('Número de seguimiento copiado', 'success');
  };

  const handleDownloadInvoice = (order) => {
    // Simulación de descarga de factura
    showNotification(`Descargando factura del pedido ${order.id}`, 'info');
  };

  const handleCancelOrder = (order) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      // Aquí iría la lógica para cancelar el pedido
      showNotification('Pedido cancelado exitosamente', 'success');
    }
  };

  const handleContactSupport = (order) => {
    setSelectedOrder(order);
    // Aquí podrías abrir un modal de contacto o redirigir
    showNotification('Abriendo soporte...', 'info');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mis pedidos</h1>
          <p className="text-gray-400">Gestiona y haz seguimiento de todos tus pedidos</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-400">Total pedidos</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{stats.processing}</p>
            <p className="text-sm text-gray-400">En proceso</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{stats.shipped}</p>
            <p className="text-sm text-gray-400">Enviados</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{stats.delivered}</p>
            <p className="text-sm text-gray-400">Entregados</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 text-center md:col-span-1 col-span-2">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-400">Total gastado</p>
          </div>
        </div>

        {/* Barra de herramientas */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número de pedido o producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="processing">En proceso</option>
              <option value="shipped">Enviados</option>
              <option value="delivered">Entregados</option>
              <option value="cancelled">Cancelados</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date-desc">Más recientes</option>
              <option value="date-asc">Más antiguos</option>
              <option value="total-desc">Mayor precio</option>
              <option value="total-asc">Menor precio</option>
            </select>
          </div>
        </div>

        {/* Lista de pedidos */}
        {sortedOrders.length === 0 ? (
          <EmptyOrders filterStatus={filterStatus} navigateTo={navigateTo} />
        ) : (
          <div className="space-y-4">
            {sortedOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrder === order.id}
                onToggleExpand={() => setExpandedOrder(
                  expandedOrder === order.id ? null : order.id
                )}
                onTrackOrder={() => {
                  setSelectedOrder(order);
                  setShowTrackingModal(true);
                }}
                onCopyTracking={handleCopyTracking}
                onDownloadInvoice={handleDownloadInvoice}
                onCancelOrder={handleCancelOrder}
                onContactSupport={handleContactSupport}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de tracking */}
      {showTrackingModal && selectedOrder && (
        <TrackingModal
          order={selectedOrder}
          onClose={() => setShowTrackingModal(false)}
        />
      )}
    </div>
  );
}

// Componente de tarjeta de pedido
function OrderCard({ 
  order, 
  isExpanded, 
  onToggleExpand, 
  onTrackOrder,
  onCopyTracking,
  onDownloadInvoice,
  onCancelOrder,
  onContactSupport,
  navigateTo 
}) {
  const getStatusInfo = (status) => {
    const statusConfig = {
      processing: {
        label: 'En proceso',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        icon: Clock,
        description: 'Tu pedido está siendo preparado'
      },
      shipped: {
        label: 'Enviado',
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        icon: Truck,
        description: 'Tu pedido está en camino'
      },
      delivered: {
        label: 'Entregado',
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        icon: Check,
        description: 'Tu pedido ha sido entregado'
      },
      cancelled: {
        label: 'Cancelado',
        color: 'text-red-400',
        bgColor: 'bg-red-400/10',
        icon: X,
        description: 'Este pedido fue cancelado'
      }
    };
    return statusConfig[status] || statusConfig.processing;
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Header del pedido */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">Pedido {order.id}</h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                <StatusIcon className="w-4 h-4" />
                {statusInfo.label}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(order.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span>{order.items.length} productos</span>
              <span className="font-semibold text-white">${order.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Vista previa de productos */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg ring-2 ring-gray-900"
              >
                {item.image}
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm ring-2 ring-gray-900">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400">
            {order.items.map(item => item.name).join(', ')}
          </p>
        </div>

        {/* Información de tracking */}
        {order.trackingNumber && order.status !== 'cancelled' && (
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Número de seguimiento</p>
                <p className="text-xs text-gray-400 font-mono">{order.trackingNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onCopyTracking(order.trackingNumber)}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Copiar número"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={onTrackOrder}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Rastrear pedido"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="flex flex-wrap gap-2 mt-4">
          {order.status === 'processing' && (
            <button
              onClick={() => onCancelOrder(order)}
              className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              Cancelar pedido
            </button>
          )}
          {order.status === 'delivered' && (
            <>
              <button
                onClick={() => navigateTo('products')}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Comprar de nuevo
              </button>
              <button className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1">
                <Star className="w-3 h-3" />
                Dejar reseña
              </button>
            </>
          )}
          <button
            onClick={() => onDownloadInvoice(order)}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Factura
          </button>
          <button
            onClick={() => onContactSupport(order)}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            Soporte
          </button>
        </div>
      </div>

      {/* Detalles expandidos */}
      {isExpanded && (
        <div className="border-t border-gray-800">
          <div className="p-6 space-y-6">
            {/* Productos */}
            <div>
              <h4 className="font-semibold mb-3">Productos del pedido</h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        Cantidad: {item.quantity} • ${item.price} c/u
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de envío */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dirección de envío
                </h4>
                <div className="text-sm text-gray-400">
                  <p>{order.shipping.address.name}</p>
                  <p>{order.shipping.address.street}</p>
                  <p>{order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zipCode}</p>
                  <p>{order.shipping.address.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Método de pago
                </h4>
                <div className="text-sm text-gray-400">
                  <p>Tarjeta terminada en {order.payment.last4}</p>
                  <p className="mt-2">{order.shipping.method.name}</p>
                  <p className="text-xs">{order.shipping.method.time}</p>
                </div>
              </div>
            </div>

            {/* Timeline del pedido */}
            {order.status !== 'cancelled' && (
              <div>
                <h4 className="font-semibold mb-3">Historial del pedido</h4>
                <OrderTimeline status={order.status} orderDate={order.date} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Timeline del pedido
function OrderTimeline({ status, orderDate }) {
  const steps = [
    { id: 'ordered', label: 'Pedido realizado', icon: Package },
    { id: 'processing', label: 'En preparación', icon: Clock },
    { id: 'shipped', label: 'Enviado', icon: Truck },
    { id: 'delivered', label: 'Entregado', icon: Check }
  ];

  const currentStepIndex = steps.findIndex(step => {
    if (status === 'processing') return step.id === 'processing';
    if (status === 'shipped') return step.id === 'shipped';
    if (status === 'delivered') return step.id === 'delivered';
    return false;
  });

  return (
    <div className="relative">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isCompleted = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div key={step.id} className="flex items-start gap-4">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? isCurrent ? 'bg-blue-600' : 'bg-green-600'
                  : 'bg-gray-800'
              }`}>
                <StepIcon className="w-5 h-5" />
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-10 left-1/2 w-0.5 h-12 -translate-x-1/2 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-800'
                }`} />
              )}
            </div>
            
            <div className="flex-1 pb-12">
              <p className={`font-medium ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                {step.label}
              </p>
              {index === 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(orderDate).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
              {isCurrent && (
                <p className="text-sm text-blue-400 mt-1">En progreso</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Modal de tracking
function TrackingModal({ order, onClose }) {
  const trackingEvents = [
    {
      date: new Date().toISOString(),
      status: 'Paquete en tránsito',
      location: 'Centro de distribución - Bogotá',
      description: 'El paquete está en camino a su destino'
    },
    {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'Paquete recibido',
      location: 'Centro de distribución - Bogotá',
      description: 'El paquete ha sido recibido en nuestras instalaciones'
    },
    {
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      status: 'Pedido procesado',
      location: 'Almacén principal',
      description: 'Tu pedido ha sido preparado y está listo para envío'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Rastrear pedido</h3>
              <p className="text-sm text-gray-400 mt-1">
                Pedido {order.id} • {order.trackingNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Mapa simulado */}
          <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <Truck className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <p className="text-gray-400">Mapa de seguimiento</p>
              <p className="text-sm text-gray-500 mt-2">
                Tu paquete está en camino
              </p>
            </div>
          </div>

          {/* Eventos de tracking */}
          <div>
            <h4 className="font-semibold mb-4">Historial de envío</h4>
            <div className="space-y-4">
              {trackingEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5" />
                    {index < trackingEvents.length - 1 && (
                      <div className="absolute top-3 left-1/2 w-0.5 h-full bg-gray-700 -translate-x-1/2" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <p className="font-medium">{event.status}</p>
                    <p className="text-sm text-gray-400">{event.location}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(event.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-400">
                <p className="font-medium mb-1">Tiempo estimado de entrega</p>
                <p>Tu pedido llegará el {new Date(order.estimatedDelivery).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}</p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Llamar al repartidor
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Contactar soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de pedidos vacíos
function EmptyOrders({ filterStatus, navigateTo }) {
  if (filterStatus !== 'all') {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-semibold mb-2">
          No tienes pedidos {filterStatus === 'processing' && 'en proceso'}
          {filterStatus === 'shipped' && 'enviados'}
          {filterStatus === 'delivered' && 'entregados'}
          {filterStatus === 'cancelled' && 'cancelados'}
        </h3>
        <p className="text-gray-400">
          Prueba cambiando los filtros para ver otros pedidos
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
      <h3 className="text-xl font-semibold mb-2">No tienes pedidos todavía</h3>
      <p className="text-gray-400 mb-6">
        Cuando hagas tu primera compra, podrás hacer seguimiento aquí
      </p>
      <button
        onClick={() => navigateTo('products')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Explorar productos
      </button>
    </div>
  );
}