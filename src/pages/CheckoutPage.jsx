// pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, CreditCard, Truck, User, 
  MapPin, Package, Shield, Check, AlertCircle, Plus,
  Edit2, Trash2, Home, Building, Clock, X
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

export function CheckoutPage({ navigateTo }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, addresses, paymentMethods, addOrder, addAddress, addPaymentMethod } = useUser();
  const { showNotification } = useNotification();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
    isDefault: false
  });
  
  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });

  const steps = [
    { id: 1, name: 'Dirección', icon: MapPin },
    { id: 2, name: 'Envío', icon: Truck },
    { id: 3, name: 'Pago', icon: CreditCard },
    { id: 4, name: 'Confirmación', icon: Check }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Envío estándar',
      price: 0,
      time: '5-7 días hábiles',
      icon: '📦'
    },
    {
      id: 'express',
      name: 'Envío express',
      price: 9.99,
      time: '2-3 días hábiles',
      icon: '🚚'
    },
    {
      id: 'premium',
      name: 'Envío premium',
      price: 19.99,
      time: '1 día hábil',
      icon: '✈️'
    }
  ];

  useEffect(() => {
    if (!user) {
      showNotification('Por favor inicia sesión para continuar', 'warning');
      navigateTo('login');
    }
  }, [user]);

  useEffect(() => {
    // Seleccionar dirección y método de pago por defecto
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
    if (paymentMethods.length > 0 && !selectedPayment) {
      const defaultPayment = paymentMethods.find(p => p.isDefault) || paymentMethods[0];
      setSelectedPayment(defaultPayment);
    }
  }, [addresses, paymentMethods]);

  const handleAddAddress = () => {
    if (validateAddress()) {
      const address = addAddress(newAddress);
      setSelectedAddress(address);
      setShowNewAddress(false);
      setNewAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        phone: '',
        isDefault: false
      });
      showNotification('Dirección agregada exitosamente', 'success');
    }
  };

  const handleAddPayment = () => {
    if (validatePayment()) {
      const payment = addPaymentMethod({
        ...newPayment,
        last4: newPayment.cardNumber.slice(-4),
        brand: detectCardBrand(newPayment.cardNumber)
      });
      setSelectedPayment(payment);
      setShowNewPayment(false);
      setNewPayment({
        cardNumber: '',
        cardHolder: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        isDefault: false
      });
      showNotification('Método de pago agregado exitosamente', 'success');
    }
  };

  const validateAddress = () => {
    const { name, street, city, state, zipCode, phone } = newAddress;
    if (!name || !street || !city || !state || !zipCode || !phone) {
      showNotification('Por favor completa todos los campos', 'error');
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    const { cardNumber, cardHolder, expiryMonth, expiryYear, cvv } = newPayment;
    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvv) {
      showNotification('Por favor completa todos los campos', 'error');
      return false;
    }
    if (cardNumber.length !== 16) {
      showNotification('Número de tarjeta inválido', 'error');
      return false;
    }
    return true;
  };

  const detectCardBrand = (number) => {
    const firstDigit = number[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Unknown';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento del pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderData = {
      items: cart,
      total: calculateTotal(),
      shipping: {
        address: selectedAddress,
        method: shippingOptions.find(o => o.id === selectedShipping)
      },
      payment: {
        method: selectedPayment,
        last4: selectedPayment.last4
      }
    };
    
    const order = addOrder(orderData);
    clearCart();
    
    showNotification('¡Pedido realizado exitosamente!', 'success');
    setIsProcessing(false);
    
    // Redirigir a la página de confirmación
    navigateTo('order-confirmation', order);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const option = shippingOptions.find(o => o.id === selectedShipping);
    return option ? option.price : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedAddress !== null;
      case 2: return selectedShipping !== null;
      case 3: return selectedPayment !== null;
      default: return true;
    }
  };

  if (!user || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">No hay productos en el carrito</h2>
          <button
            onClick={() => navigateTo('products')}
            className="text-blue-400 hover:text-blue-300"
          >
            Ir a comprar →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al carrito
          </button>
          <h1 className="text-3xl font-bold">Finalizar compra</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`ml-3 hidden sm:block ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <AddressStep
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                showNewAddress={showNewAddress}
                setShowNewAddress={setShowNewAddress}
                newAddress={newAddress}
                setNewAddress={setNewAddress}
                onAddAddress={handleAddAddress}
              />
            )}

            {currentStep === 2 && (
              <ShippingStep
                shippingOptions={shippingOptions}
                selectedShipping={selectedShipping}
                onSelectShipping={setSelectedShipping}
                selectedAddress={selectedAddress}
              />
            )}

            {currentStep === 3 && (
              <PaymentStep
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                showNewPayment={showNewPayment}
                setShowNewPayment={setShowNewPayment}
                newPayment={newPayment}
                setNewPayment={setNewPayment}
                onAddPayment={handleAddPayment}
                formatCardNumber={formatCardNumber}
              />
            )}

            {currentStep === 4 && (
              <ConfirmationStep
                cart={cart}
                selectedAddress={selectedAddress}
                selectedShipping={shippingOptions.find(o => o.id === selectedShipping)}
                selectedPayment={selectedPayment}
                total={calculateTotal()}
                onPlaceOrder={handlePlaceOrder}
                isProcessing={isProcessing}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cart={cart}
              subtotal={calculateSubtotal()}
              shipping={calculateShipping()}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Dirección
function AddressStep({ 
  addresses, 
  selectedAddress, 
  onSelectAddress, 
  showNewAddress, 
  setShowNewAddress,
  newAddress,
  setNewAddress,
  onAddAddress 
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <MapPin className="w-6 h-6" />
        Dirección de envío
      </h2>

      {addresses.length === 0 && !showNewAddress && (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 mb-4">No tienes direcciones guardadas</p>
          <button
            onClick={() => setShowNewAddress(true)}
            className="text-blue-400 hover:text-blue-300"
          >
            Agregar dirección
          </button>
        </div>
      )}

      {/* Direcciones guardadas */}
      <div className="space-y-4 mb-6">
        {addresses.map(address => (
          <label
            key={address.id}
            className={`block p-4 bg-gray-900 rounded-xl cursor-pointer transition-all ${
              selectedAddress?.id === address.id 
                ? 'ring-2 ring-blue-500' 
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="address"
                checked={selectedAddress?.id === address.id}
                onChange={() => onSelectAddress(address)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{address.name}</h4>
                  {address.isDefault && (
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                      Predeterminada
                    </span>
                  )}
                </div>
                <p className="text-gray-300">{address.street}</p>
                <p className="text-gray-300">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-400 text-sm mt-1">{address.phone}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Botón agregar dirección */}
      {!showNewAddress && addresses.length > 0 && (
        <button
          onClick={() => setShowNewAddress(true)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-4 h-4" />
          Agregar nueva dirección
        </button>
      )}

      {/* Formulario nueva dirección */}
      {showNewAddress && (
        <div className="bg-gray-900 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold mb-4">Nueva dirección</h3>
          
          <input
            type="text"
            placeholder="Nombre completo"
            value={newAddress.name}
            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            placeholder="Dirección"
            value={newAddress.street}
            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Ciudad"
              value={newAddress.city}
              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              placeholder="Estado/Provincia"
              value={newAddress.state}
              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Código postal"
              value={newAddress.zipCode}
              onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="tel"
              placeholder="Teléfono"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Establecer como dirección predeterminada</span>
          </label>
          
          <div className="flex gap-3">
            <button
              onClick={onAddAddress}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Guardar dirección
            </button>
            <button
              onClick={() => setShowNewAddress(false)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Step 2: Envío
function ShippingStep({ shippingOptions, selectedShipping, onSelectShipping, selectedAddress }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <Truck className="w-6 h-6" />
        Método de envío
      </h2>

      {/* Dirección de envío */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-400 mb-2">Enviar a:</p>
        <p className="font-medium">{selectedAddress.name}</p>
        <p className="text-gray-300">
          {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
        </p>
      </div>

      {/* Opciones de envío */}
      <div className="space-y-4">
        {shippingOptions.map(option => (
          <label
            key={option.id}
            className={`block p-4 bg-gray-900 rounded-xl cursor-pointer transition-all ${
              selectedShipping === option.id 
                ? 'ring-2 ring-blue-500' 
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={() => onSelectShipping(option.id)}
              />
              <span className="text-3xl">{option.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{option.name}</h4>
                  <span className="font-bold">
                    {option.price === 0 ? 'Gratis' : `$${option.price}`}
                  </span>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {option.time}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// Step 3: Pago
function PaymentStep({ 
  paymentMethods, 
  selectedPayment, 
  onSelectPayment, 
  showNewPayment,
  setShowNewPayment,
  newPayment,
  setNewPayment,
  onAddPayment,
  formatCardNumber
}) {
  const cardBrandEmojis = {
    'Visa': '💳',
    'Mastercard': '💳',
    'Amex': '💳',
    'Unknown': '💳'
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <CreditCard className="w-6 h-6" />
        Método de pago
      </h2>

      {paymentMethods.length === 0 && !showNewPayment && (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 mb-4">No tienes métodos de pago guardados</p>
          <button
            onClick={() => setShowNewPayment(true)}
            className="text-blue-400 hover:text-blue-300"
          >
            Agregar método de pago
          </button>
        </div>
      )}

      {/* Métodos de pago guardados */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map(payment => (
          <label
            key={payment.id}
            className={`block p-4 bg-gray-900 rounded-xl cursor-pointer transition-all ${
              selectedPayment?.id === payment.id 
                ? 'ring-2 ring-blue-500' 
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment?.id === payment.id}
                onChange={() => onSelectPayment(payment)}
              />
              <span className="text-2xl">{cardBrandEmojis[payment.brand]}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{payment.brand} •••• {payment.last4}</p>
                    <p className="text-sm text-gray-400">
                      Expira {payment.expiryMonth}/{payment.expiryYear}
                    </p>
                  </div>
                  {payment.isDefault && (
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                      Predeterminada
                    </span>
                  )}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Botón agregar método de pago */}
      {!showNewPayment && paymentMethods.length > 0 && (
        <button
          onClick={() => setShowNewPayment(true)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <Plus className="w-4 h-4" />
          Agregar nuevo método de pago
        </button>
      )}

      {/* Formulario nuevo método de pago */}
      {showNewPayment && (
        <div className="bg-gray-900 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold mb-4">Nueva tarjeta</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Número de tarjeta</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(newPayment.cardNumber)}
              onChange={(e) => setNewPayment({
                ...newPayment, 
                cardNumber: e.target.value.replace(/\s/g, '')
              })}
              maxLength="19"
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Titular de la tarjeta</label>
            <input
              type="text"
              placeholder="JOHN DOE"
              value={newPayment.cardHolder}
              onChange={(e) => setNewPayment({
                ...newPayment, 
                cardHolder: e.target.value.toUpperCase()
              })}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mes</label>
              <select
                value={newPayment.expiryMonth}
                onChange={(e) => setNewPayment({...newPayment, expiryMonth: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Año</label>
              <select
                value={newPayment.expiryYear}
                onChange={(e) => setNewPayment({...newPayment, expiryYear: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">YY</option>
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={String(year).slice(-2)}>
                      {String(year).slice(-2)}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={newPayment.cvv}
                onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                maxLength="4"
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newPayment.isDefault}
              onChange={(e) => setNewPayment({...newPayment, isDefault: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Establecer como método de pago predeterminado</span>
          </label>
          
          <div className="flex gap-3">
            <button
              onClick={onAddPayment}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Guardar tarjeta
            </button>
            <button
              onClick={() => setShowNewPayment(false)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Información de seguridad */}
      <div className="mt-6 flex items-center gap-3 p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
        <Shield className="w-5 h-5 text-green-400" />
        <p className="text-sm text-green-400">
          Tu información de pago está protegida con encriptación SSL de 256 bits
        </p>
      </div>
    </div>
  );
}

// Step 4: Confirmación
function ConfirmationStep({ 
  cart, 
  selectedAddress, 
  selectedShipping, 
  selectedPayment, 
  total,
  onPlaceOrder,
  isProcessing 
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <Check className="w-6 h-6" />
        Confirmar pedido
      </h2>

      {/* Resumen del pedido */}
      <div className="space-y-6">
        {/* Dirección */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Dirección de envío
          </h3>
          <p>{selectedAddress.name}</p>
          <p className="text-gray-400">
            {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
          </p>
          <p className="text-gray-400">{selectedAddress.phone}</p>
        </div>

        {/* Método de envío */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Método de envío
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedShipping.icon}</span>
              <div>
                <p>{selectedShipping.name}</p>
                <p className="text-sm text-gray-400">{selectedShipping.time}</p>
              </div>
            </div>
            <span className="font-semibold">
              {selectedShipping.price === 0 ? 'Gratis' : `$${selectedShipping.price}`}
            </span>
          </div>
        </div>

        {/* Método de pago */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Método de pago
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <p>{selectedPayment.brand} •••• {selectedPayment.last4}</p>
              <p className="text-sm text-gray-400">
                Expira {selectedPayment.expiryMonth}/{selectedPayment.expiryYear}
              </p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Productos ({cart.length})
          </h3>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-2xl">{item.image}</span>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Cantidad: {item.quantity} • ${item.price} c/u
                  </p>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4">
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total a pagar:</span>
            <span className="text-2xl">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón confirmar */}
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando pago...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Confirmar y pagar ${total.toFixed(2)}
            </>
          )}
        </button>

        {/* Términos */}
        <p className="text-xs text-gray-400 text-center">
          Al confirmar tu pedido, aceptas nuestros términos y condiciones y política de privacidad
        </p>
      </div>
    </div>
  );
}

// Resumen del pedido (sidebar)
function OrderSummary({ cart, subtotal, shipping, total }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
      
      {/* Productos */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="flex gap-3">
            <span className="text-2xl">{item.image}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <p className="text-xs text-gray-400">
                {item.quantity} x ${item.price}
              </p>
            </div>
            <span className="text-sm font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="space-y-2 pt-4 border-t border-gray-800">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Envío</span>
          <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}