// components/Notification.jsx
import React, { useEffect } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Info, X, 
  ShoppingCart, Heart, Package, CreditCard
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

export function Notification() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function NotificationItem({ notification, onClose }) {
  const { id, message, type } = notification;

  // Auto-cerrar después de animación
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById(`notification-${id}`);
      if (element) {
        element.classList.add('animate-slide-out');
      }
    }, 2700);

    return () => clearTimeout(timer);
  }, [id]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertCircle;
      case 'info':
      default:
        return Info;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-600/10 border-green-600/20',
          icon: 'text-green-400',
          text: 'text-green-400'
        };
      case 'error':
        return {
          container: 'bg-red-600/10 border-red-600/20',
          icon: 'text-red-400',
          text: 'text-red-400'
        };
      case 'warning':
        return {
          container: 'bg-yellow-600/10 border-yellow-600/20',
          icon: 'text-yellow-400',
          text: 'text-yellow-400'
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-600/10 border-blue-600/20',
          icon: 'text-blue-400',
          text: 'text-blue-400'
        };
    }
  };

  // Detectar tipo de notificación por el mensaje
  const getContextIcon = () => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('carrito')) return ShoppingCart;
    if (lowerMessage.includes('favoritos') || lowerMessage.includes('deseos')) return Heart;
    if (lowerMessage.includes('pedido')) return Package;
    if (lowerMessage.includes('pago')) return CreditCard;
    return null;
  };

  const Icon = getIcon();
  const ContextIcon = getContextIcon();
  const styles = getStyles();

  return (
    <div
      id={`notification-${id}`}
      className={`
        ${styles.container}
        border backdrop-blur-xl rounded-lg p-4 shadow-2xl
        animate-slide-in cursor-pointer hover:scale-105 transition-all
        min-w-[320px] max-w-sm
      `}
      onClick={onClose}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`shrink-0 ${styles.icon}`}>
          {ContextIcon ? (
            <div className="relative">
              <Icon className="w-5 h-5" />
              <ContextIcon className="w-3 h-3 absolute -bottom-1 -right-1" />
            </div>
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1 pt-0.5">
          <p className={`text-sm font-medium ${styles.text}`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`shrink-0 p-1 hover:bg-gray-800 rounded transition-colors ${styles.icon}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full animate-progress ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            type === 'warning' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}
        />
      </div>
    </div>
  );
}

// Estilos CSS para las animaciones
const styles = `
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.animate-slide-out {
  animation: slide-out 0.3s ease-out forwards;
}

.animate-progress {
  animation: progress 3s linear;
}
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}