// pages/AboutPage.jsx
import React from 'react';
import { 
  Zap, Shield, Truck, Heart, Users, Award, Clock, 
  Globe, Target, TrendingUp, Mail, Phone, MapPin,
  Star, Package, CreditCard, Headphones
} from 'lucide-react';

export function AboutPage({ navigateTo }) {
  const stats = [
    { number: '50K+', label: 'Clientes satisfechos', icon: Users },
    { number: '10K+', label: 'Productos vendidos', icon: Package },
    { number: '4.9', label: 'Rating promedio', icon: Star },
    { number: '24/7', label: 'Soporte al cliente', icon: Headphones }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Pasión por la tecnología',
      description: 'Amamos lo que hacemos y se nota en cada producto que ofrecemos.'
    },
    {
      icon: Shield,
      title: 'Calidad garantizada',
      description: 'Solo trabajamos con las mejores marcas y productos certificados.'
    },
    {
      icon: Users,
      title: 'Cliente primero',
      description: 'Tu satisfacción es nuestra prioridad número uno.'
    },
    {
      icon: TrendingUp,
      title: 'Innovación constante',
      description: 'Siempre a la vanguardia con los últimos productos tech.'
    }
  ];

  const team = [
    {
      name: 'Carlos Rodríguez',
      role: 'CEO & Fundador',
      avatar: '👨‍💼',
      bio: 'Apasionado por la tecnología con más de 10 años de experiencia.'
    },
    {
      name: 'María García',
      role: 'Directora de Operaciones',
      avatar: '👩‍💼',
      bio: 'Experta en logística y satisfacción del cliente.'
    },
    {
      name: 'Juan Pérez',
      role: 'Jefe de Producto',
      avatar: '🧑‍💼',
      bio: 'Siempre buscando los mejores productos para nuestros clientes.'
    },
    {
      name: 'Ana Martínez',
      role: 'Líder de Atención al Cliente',
      avatar: '👩‍💻',
      bio: 'Comprometida con brindar el mejor servicio posible.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'El comienzo',
      description: 'TechGear Pro nace con la visión de democratizar el acceso a tecnología premium.'
    },
    {
      year: '2021',
      title: 'Expansión',
      description: 'Ampliamos nuestro catálogo y llegamos a 10,000 clientes satisfechos.'
    },
    {
      year: '2022',
      title: 'Innovación',
      description: 'Lanzamos nuestra app móvil y programa de fidelidad.'
    },
    {
      year: '2023',
      title: 'Reconocimiento',
      description: 'Premiados como el mejor e-commerce tech del año.'
    },
    {
      year: '2024',
      title: 'Futuro',
      description: 'Expandimos operaciones internacionalmente y lanzamos productos propios.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur rounded-2xl">
              <Zap className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Sobre TechGear Pro</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Somos más que una tienda online. Somos tu aliado tecnológico, 
            comprometidos con traerte los mejores accesorios tech del mercado 
            con un servicio excepcional.
          </p>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <p className="text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  TechGear Pro nació en 2020 con una misión simple pero poderosa: 
                  hacer que la mejor tecnología esté al alcance de todos. Lo que comenzó 
                  como un pequeño proyecto se ha convertido en la tienda online de 
                  accesorios tech más confiable de Colombia.
                </p>
                <p>
                  Desde el primer día, nos hemos enfocado en tres pilares fundamentales: 
                  calidad excepcional, precios justos y servicio al cliente incomparable. 
                  Esta filosofía nos ha permitido crecer orgánicamente, ganando la 
                  confianza de miles de clientes.
                </p>
                <p>
                  Hoy, con más de 50,000 clientes satisfechos y un catálogo en constante 
                  expansión, seguimos comprometidos con nuestra misión original mientras 
                  miramos hacia el futuro con emoción y ambición.
                </p>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contáctanos
              </button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-xl p-6 text-center">
                    <Globe className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <p className="font-semibold">Envíos Globales</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-6 text-center">
                    <Award className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <p className="font-semibold">Productos Premium</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gray-900 rounded-xl p-6 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p className="font-semibold">Garantía Total</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-6 text-center">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                    <p className="font-semibold">Soporte 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Viaje</h2>
          
          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700" />
            
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-gray-900 rounded-xl p-6">
                    <span className="text-blue-400 font-bold text-lg">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
                
                {/* Punto central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-950" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en TechGear Pro
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-10 h-10 text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Las personas detrás de TechGear Pro que trabajan día a día para 
              brindarte la mejor experiencia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-transform">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir TechGear Pro?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-8">
              <Truck className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Envío Rápido y Seguro</h3>
              <p className="text-gray-400">
                Recibe tus productos en tiempo récord con seguimiento en tiempo real 
                y empaque premium que garantiza que lleguen en perfecto estado.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8">
              <CreditCard className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pagos 100% Seguros</h3>
              <p className="text-gray-400">
                Múltiples opciones de pago con encriptación SSL de 256 bits. 
                Tu información financiera siempre está protegida.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8">
              <Award className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Garantía de Satisfacción</h3>
              <p className="text-gray-400">
                30 días de devolución sin preguntas y garantía extendida en todos 
                nuestros productos. Tu satisfacción es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para unirte a la familia TechGear Pro?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Descubre por qué miles de clientes confían en nosotros para sus necesidades tech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('products')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explorar productos
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}