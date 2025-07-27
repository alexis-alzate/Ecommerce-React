// pages/ContactPage.jsx
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageSquare,
  Facebook, Twitter, Instagram, Youtube, Headphones,
  CheckCircle, AlertCircle, Loader2, HelpCircle,
  Package, CreditCard, Truck, Shield
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

export function ContactPage({ navigateTo }) {
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    orderNumber: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'soporte@techgearpro.com',
      action: 'mailto:soporte@techgearpro.com'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+57 300 123 4567',
      action: 'tel:+573001234567'
    },
    {
      icon: MapPin,
      title: 'Dirección',
      value: 'Cra 7 #123-45, Bogotá, Colombia',
      action: null
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun-Vie: 8AM-8PM, Sáb: 9AM-6PM',
      action: null
    }
  ];

  const subjects = [
    'Consulta general',
    'Estado de mi pedido',
    'Problema con un producto',
    'Devolución o cambio',
    'Información de producto',
    'Soporte técnico',
    'Facturación',
    'Sugerencias',
    'Otro'
  ];

  const faqs = [
    {
      question: '¿Cuál es el tiempo de entrega?',
      answer: 'El tiempo de entrega estándar es de 5-7 días hábiles para Bogotá y 7-10 días para el resto del país.',
      icon: Truck
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Una vez enviado tu pedido, recibirás un email con el número de seguimiento y un enlace para rastrearlo.',
      icon: Package
    },
    {
      question: '¿Cuál es la política de devolución?',
      answer: 'Tienes 30 días para devolver cualquier producto en su estado original con empaque completo.',
      icon: Shield
    },
    {
      question: '¿Los pagos son seguros?',
      answer: 'Sí, utilizamos encriptación SSL de 256 bits y procesamos pagos a través de pasarelas certificadas.',
      icon: CreditCard
    }
  ];

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-600' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Por favor selecciona un tema';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
    
    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      orderNumber: '',
      message: ''
    });
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. No dudes en contactarnos para cualquier 
            consulta, sugerencia o problema que tengas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                Envíanos un mensaje
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-600/10 border border-green-600/20 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-medium">¡Mensaje enviado!</p>
                    <p className="text-sm text-green-400/80 mt-1">
                      Hemos recibido tu mensaje y te responderemos lo antes posible.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.name ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                      }`}
                      placeholder="Juan Pérez"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.email ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                      }`}
                      placeholder="juan@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Número de pedido
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ORD-1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Asunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subject ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                    }`}
                  >
                    <option value="">Selecciona un tema</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-xs text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.message ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            {/* Tarjetas de contacto */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Información de contacto</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">{info.title}</p>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-400">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soporte en vivo */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <Headphones className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Soporte en vivo</h3>
              <p className="mb-4 text-white/90">
                ¿Necesitas ayuda inmediata? Nuestro equipo está disponible 
                para chatear contigo.
              </p>
              <button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-2 rounded-lg font-semibold transition-colors">
                Iniciar chat
              </button>
            </div>

            {/* Redes sociales */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 ${social.color} transition-all`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas frecuentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <div key={index} className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">¿No encuentras lo que buscas?</p>
            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto">
              <HelpCircle className="w-5 h-5" />
              Ver todas las preguntas frecuentes
            </button>
          </div>
        </section>

        {/* Mapa */}
        <section className="mt-16">
          <div className="bg-gray-900 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">Mapa interactivo</p>
              <p className="text-sm text-gray-500 mt-2">
                Cra 7 #123-45, Bogotá, Colombia
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}