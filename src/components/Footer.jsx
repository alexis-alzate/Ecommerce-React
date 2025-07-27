// components/Footer.jsx
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, 
  Youtube, Linkedin, ChevronRight, Send, Shield, Truck, 
  CreditCard, Headphones, Award, Heart, ArrowUp
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

export function Footer({ navigateTo }) {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { showNotification } = useNotification();

  // Mostrar botón de scroll cuando se hace scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      showNotification('¡Gracias por suscribirte! Recibirás nuestras ofertas pronto.', 'success');
      setEmail('');
    } else {
      showNotification('Por favor ingresa un email válido', 'error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    productos: [
      { name: 'Nuevos productos', action: () => navigateTo('products') },
      { name: 'Más vendidos', action: () => navigateTo('products') },
      { name: 'Ofertas especiales', action: () => navigateTo('deals') },
      { name: 'Categorías', action: () => navigateTo('categories') },
      { name: 'Marcas', action: () => navigateTo('products') }
    ],
    soporte: [
      { name: 'Centro de ayuda', action: () => navigateTo('contact') },
      { name: 'Seguir mi pedido', action: () => navigateTo('orders') },
      { name: 'Envíos y entregas', action: () => navigateTo('contact') },
      { name: 'Devoluciones', action: () => navigateTo('contact') },
      { name: 'Garantía', action: () => navigateTo('contact') }
    ],
    empresa: [
      { name: 'Sobre nosotros', action: () => navigateTo('about') },
      { name: 'Trabaja con nosotros', action: () => navigateTo('about') },
      { name: 'Blog', action: () => navigateTo('about') },
      { name: 'Prensa', action: () => navigateTo('about') },
      { name: 'Sostenibilidad', action: () => navigateTo('about') }
    ],
    legal: [
      { name: 'Términos y condiciones', action: () => {} },
      { name: 'Política de privacidad', action: () => {} },
      { name: 'Política de cookies', action: () => {} },
      { name: 'Aviso legal', action: () => {} }
    ]
  };

  const paymentMethods = ['💳', '📱', '🏦', '💰'];
  
  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' }
  ];

  const features = [
    { icon: Truck, text: 'Envío gratis +$99' },
    { icon: Shield, text: 'Compra segura' },
    { icon: CreditCard, text: 'Pago fácil' },
    { icon: Headphones, text: 'Soporte 24/7' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="mb-6 text-white/90">
              Recibe ofertas exclusivas y las últimas novedades tech
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Suscribir
                </button>
              </div>
            </form>
            
            <p className="text-xs mt-4 text-white/70">
              Al suscribirte aceptas nuestra política de privacidad
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <feature.icon className="w-8 h-8 text-gray-400" />
                <span className="text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links principales */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo y descripción */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TechGear Pro
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Tu destino para los mejores accesorios tech. Calidad premium, 
                precios justos y servicio excepcional.
              </p>
              
              {/* Redes sociales */}
              <div className="flex gap-2">
                {socialMedia.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 text-gray-400 ${social.color} transition-all`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Productos */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Productos</h4>
              <ul className="space-y-2">
                {footerLinks.productos.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-2">
                {footerLinks.soporte.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2">
                {footerLinks.empresa.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Contacto</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="tel:+573001234567"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    +57 300 123 4567
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@techgearpro.com"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    info@techgearpro.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">
                    Cra 7 #123-45<br />
                    Bogotá, Colombia
                  </span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Lun-Vie 8AM-8PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 TechGear Pro. Todos los derechos reservados.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Hecho con</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500 hidden md:inline" />
              <span className="hidden md:inline">en Colombia</span>
            </div>

            {/* Métodos de pago */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Aceptamos:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method, index) => (
                  <span key={index} className="text-2xl">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Links legales */}
            <div className="flex gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <button
                  key={index}
                  onClick={link.action}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Certificaciones */}
          <div className="mt-6 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Shield className="w-4 h-4" />
              SSL Seguro
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Award className="w-4 h-4" />
              Certificado de calidad
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <CreditCard className="w-4 h-4" />
              PCI DSS Compliant
            </div>
          </div>
        </div>
      </div>

      {/* Botón de scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 z-40"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}