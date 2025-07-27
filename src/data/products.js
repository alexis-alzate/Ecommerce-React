// data/products.js
export const products = [
  // Audio
  {
    id: 1,
    name: 'AirPods Pro Max',
    category: 'audio',
    subcategory: 'headphones',
    price: 549.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviews: 2341,
    image: '🎧',
    images: ['🎧', '📦', '🎵', '🔊'],
    color: 'Space Gray',
    colors: ['Space Gray', 'Silver', 'Sky Blue', 'Pink', 'Green'],
    featured: true,
    badge: 'Bestseller',
    inStock: true,
    stockQuantity: 45,
    description: 'Los AirPods Max reinventan los audífonos circumaurales. Cada parte de su diseño ha sido pensada para ofrecer un sonido excepcional.',
    features: [
      'Cancelación activa de ruido líder en la industria',
      'Modo de sonido ambiente para escuchar el entorno',
      'Audio espacial con seguimiento dinámico de la cabeza',
      'Diseño acústico de alta fidelidad',
      'Hasta 20 horas de batería'
    ],
    specifications: {
      'Conectividad': 'Bluetooth 5.0',
      'Batería': '20 horas con ANC',
      'Peso': '384.8 g',
      'Compatibilidad': 'iOS, Android, Windows',
      'Incluye': 'Estuche Smart Case, Cable Lightning a USB-C'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    category: 'audio',
    subcategory: 'headphones',
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviews: 1876,
    image: '🎧',
    images: ['🎧', '📦', '🎵', '🔊'],
    color: 'Black',
    colors: ['Black', 'Silver', 'Midnight Blue'],
    featured: true,
    badge: 'Nueva versión',
    inStock: true,
    stockQuantity: 32,
    description: 'La mejor cancelación de ruido del mercado ahora es aún mejor. Los WH-1000XM5 redefinen el silencio.',
    features: [
      'Procesador HD QN1 para cancelación de ruido',
      'Speak-to-Chat: pausa automática al hablar',
      '30 horas de batería',
      'Carga rápida: 3 horas con 3 minutos',
      'Multipoint: conecta 2 dispositivos'
    ],
    specifications: {
      'Drivers': '30mm',
      'Respuesta de frecuencia': '4Hz-40,000Hz',
      'Peso': '250g',
      'Bluetooth': '5.2',
      'Códecs': 'SBC, AAC, LDAC'
    },
    brand: 'Sony',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 3,
    name: 'Bose QuietComfort Earbuds',
    category: 'audio',
    subcategory: 'earbuds',
    price: 279.99,
    rating: 4.7,
    reviews: 1543,
    image: '🎵',
    images: ['🎵', '📦', '🎧', '🔊'],
    color: 'Triple Black',
    colors: ['Triple Black', 'Soapstone'],
    inStock: true,
    stockQuantity: 28,
    description: 'Los auriculares con la mejor cancelación de ruido del mundo. Controla cuánto escuchas del mundo exterior.',
    features: [
      'Cancelación de ruido ajustable en 11 niveles',
      'Modo Aware para escuchar el entorno',
      '6 horas de batería + 12 horas con estuche',
      'Resistencia IPX4',
      'Control táctil personalizable'
    ],
    specifications: {
      'Tipo': 'In-ear verdaderamente inalámbricos',
      'Batería por carga': '6 horas',
      'Batería total': '18 horas',
      'Tiempo de carga': '2 horas',
      'Bluetooth': '5.1'
    },
    brand: 'Bose',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Carga
  {
    id: 4,
    name: 'MagSafe Charger Pro',
    category: 'charging',
    subcategory: 'wireless',
    price: 79.99,
    rating: 4.6,
    reviews: 892,
    image: '🔌',
    images: ['🔌', '📦', '⚡', '📱'],
    color: 'White',
    colors: ['White'],
    featured: true,
    inStock: true,
    stockQuantity: 150,
    description: 'Carga inalámbrica rápida y eficiente con alineación perfecta para iPhone 12 y posteriores.',
    features: [
      'Carga inalámbrica de hasta 15W',
      'Alineación magnética perfecta',
      'Compatible con fundas MagSafe',
      'LED indicador de carga',
      'Cable USB-C integrado de 1m'
    ],
    specifications: {
      'Potencia máxima': '15W con adaptador de 20W+',
      'Compatibilidad': 'iPhone 12 y posteriores',
      'Longitud del cable': '1 metro',
      'Conector': 'USB-C',
      'Material': 'Aluminio y silicona'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 5,
    name: 'Anker PowerCore 10000',
    category: 'charging',
    subcategory: 'powerbank',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 3456,
    image: '🔋',
    images: ['🔋', '📦', '⚡', '📱'],
    color: 'Black',
    colors: ['Black', 'Blue', 'Red'],
    badge: 'Más vendido',
    inStock: true,
    stockQuantity: 89,
    description: 'Power bank ultracompacto con capacidad para cargar tu iPhone 3 veces completas.',
    features: [
      'Capacidad de 10,000mAh',
      'PowerIQ y VoltageBoost',
      'Carga rápida de 18W',
      'Tamaño de tarjeta de crédito',
      'MultiProtect sistema de seguridad'
    ],
    specifications: {
      'Capacidad': '10,000mAh',
      'Entrada': 'USB-C: 18W',
      'Salida': 'USB-A: 12W, USB-C: 18W',
      'Peso': '180g',
      'Dimensiones': '9.2 x 6.2 x 2.2 cm'
    },
    brand: 'Anker',
    warranty: '18 meses',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 6,
    name: 'Belkin 3-in-1 Wireless Charger',
    category: 'charging',
    subcategory: 'wireless',
    price: 149.99,
    rating: 4.7,
    reviews: 567,
    image: '⚡',
    images: ['⚡', '📦', '🔌', '📱'],
    color: 'White',
    colors: ['White', 'Black'],
    inStock: true,
    stockQuantity: 34,
    description: 'Estación de carga 3 en 1 para iPhone, Apple Watch y AirPods. Diseño premium con certificación MFi.',
    features: [
      'Carga iPhone, Apple Watch y AirPods simultáneamente',
      'Carga rápida de 15W para iPhone',
      'Carga magnética para Apple Watch',
      'LED indicador discreto',
      'Certificado MFi por Apple'
    ],
    specifications: {
      'Potencia iPhone': '15W máx',
      'Potencia Apple Watch': '5W',
      'Potencia AirPods': '5W',
      'Entrada': 'Adaptador incluido 40W',
      'Certificaciones': 'MFi, Qi'
    },
    brand: 'Belkin',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Teclados
  {
    id: 7,
    name: 'Magic Keyboard para iPad Pro',
    category: 'keyboards',
    subcategory: 'ipad',
    price: 349.99,
    rating: 4.7,
    reviews: 1203,
    image: '⌨️',
    images: ['⌨️', '📦', '💻', '🖱️'],
    color: 'Black',
    colors: ['Black', 'White'],
    inStock: true,
    stockQuantity: 23,
    description: 'La experiencia de escritura definitiva para iPad Pro con trackpad integrado y diseño flotante.',
    features: [
      'Trackpad con soporte Multi-Touch',
      'Diseño flotante con ángulo ajustable',
      'Teclado retroiluminado',
      'Puerto USB-C para carga pass-through',
      'Protección frontal y trasera'
    ],
    specifications: {
      'Compatibilidad': 'iPad Pro 11" (todas las generaciones)',
      'Conectividad': 'Smart Connector',
      'Peso': '600g',
      'Ángulo de visión': 'Ajustable hasta 130°',
      'Material': 'Poliuretano exterior'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 8,
    name: 'Logitech MX Keys',
    category: 'keyboards',
    subcategory: 'desktop',
    price: 119.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviews: 2890,
    image: '⌨️',
    images: ['⌨️', '📦', '💻', '🖱️'],
    color: 'Graphite',
    colors: ['Graphite', 'Pale Gray'],
    badge: 'Elección del editor',
    inStock: true,
    stockQuantity: 67,
    description: 'Teclado inalámbrico premium para profesionales creativos con teclas perfectamente diseñadas.',
    features: [
      'Teclas con forma esférica perfecta',
      'Retroiluminación inteligente',
      'Flow: trabaja en 3 dispositivos',
      'USB-C recargable: 10 días con luz, 5 meses sin',
      'Compatible con Windows, Mac, Linux, iOS, Android'
    ],
    specifications: {
      'Conectividad': 'Bluetooth, USB Receiver',
      'Alcance': '10 metros',
      'Batería': 'Recargable Li-Po 1500mAh',
      'Dimensiones': '430.2 x 131.6 x 20.5mm',
      'Peso': '810g'
    },
    brand: 'Logitech',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 9,
    name: 'Keychron K2 Wireless',
    category: 'keyboards',
    subcategory: 'mechanical',
    price: 89.99,
    rating: 4.9,
    reviews: 1567,
    image: '⌨️',
    images: ['⌨️', '📦', '💻', '🖱️'],
    color: 'RGB Backlight',
    colors: ['RGB Backlight', 'White Backlight'],
    inStock: true,
    stockQuantity: 45,
    description: 'Teclado mecánico compacto 75% con switches intercambiables y RGB personalizable.',
    features: [
      'Layout 75% ahorra espacio',
      'Switches Gateron mecánicos',
      'RGB con 15+ efectos',
      'Bluetooth 5.1 y cable',
      'Compatible Mac y Windows'
    ],
    specifications: {
      'Switches': 'Gateron Red/Blue/Brown',
      'Layout': '84 teclas (75%)',
      'Batería': '4000mAh',
      'Material': 'Marco de aluminio',
      'Modos': 'Cable/Bluetooth/2.4GHz'
    },
    brand: 'Keychron',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Accesorios
  {
    id: 10,
    name: 'Apple Pencil Pro',
    category: 'accessories',
    subcategory: 'stylus',
    price: 129.99,
    rating: 4.9,
    reviews: 3421,
    image: '✏️',
    images: ['✏️', '📦', '🎨', '📝'],
    color: 'White',
    colors: ['White'],
    featured: true,
    inStock: true,
    stockQuantity: 78,
    description: 'Precisión pixel-perfect para dibujar, tomar notas y marcar documentos en tu iPad.',
    features: [
      'Sensibilidad a la presión',
      'Sensibilidad a la inclinación',
      'Rechazo de palma preciso',
      'Latencia imperceptible',
      'Carga y emparejamiento magnético'
    ],
    specifications: {
      'Longitud': '166mm',
      'Diámetro': '8.9mm',
      'Peso': '20.7g',
      'Batería': '12 horas de uso',
      'Compatibilidad': 'iPad Pro, iPad Air, iPad mini'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 11,
    name: 'AirTag Pack 4',
    category: 'accessories',
    subcategory: 'tracker',
    price: 99.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 2109,
    image: '📍',
    images: ['📍', '📦', '🔍', '📱'],
    color: 'Silver',
    colors: ['Silver'],
    badge: 'Ahorra 20%',
    inStock: true,
    stockQuantity: 156,
    description: 'Encuentra tus cosas con la app Find My. Pack de 4 AirTags para no perder nada importante.',
    features: [
      'Precisión de búsqueda con chip U1',
      'Red Find My con millones de dispositivos',
      'Resistente al agua IP67',
      'Batería reemplazable de 1+ año',
      'Configuración con un toque'
    ],
    specifications: {
      'Diámetro': '31.9mm',
      'Grosor': '8.0mm',
      'Peso': '11g',
      'Batería': 'CR2032 reemplazable',
      'Alcance Bluetooth': '10-30 metros'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 12,
    name: 'PopSocket MagSafe',
    category: 'accessories',
    subcategory: 'grips',
    price: 29.99,
    rating: 4.5,
    reviews: 876,
    image: '🔘',
    images: ['🔘', '📦', '📱', '🤳'],
    color: 'Black',
    colors: ['Black', 'White', 'Blue', 'Pink', 'Clear'],
    inStock: true,
    stockQuantity: 234,
    description: 'Agarre magnético para iPhone con MagSafe. Quita y pon cuando quieras.',
    features: [
      'Fijación magnética MagSafe',
      'Función de soporte integrada',
      'Compatible con carga inalámbrica',
      'Intercambiable con otros tops',
      'Agarre ergonómico seguro'
    ],
    specifications: {
      'Compatibilidad': 'iPhone 12 y posteriores',
      'Material': 'Policarbonato y TPU',
      'Dimensiones plegado': '7.5mm de grosor',
      'Dimensiones extendido': '25mm',
      'Fuerza magnética': '3x más fuerte'
    },
    brand: 'PopSocket',
    warranty: '6 meses',
    shipping: 'Envío estándar $4.99',
    returnPolicy: '30 días de devolución'
  },

  // Soportes
  {
    id: 13,
    name: 'Studio Display Stand',
    category: 'stands',
    subcategory: 'monitor',
    price: 399.99,
    rating: 4.5,
    reviews: 567,
    image: '🖥️',
    images: ['🖥️', '📦', '💻', '🔧'],
    color: 'Silver',
    colors: ['Silver'],
    inStock: true,
    stockQuantity: 12,
    description: 'Soporte de altura ajustable con inclinación para Studio Display y monitores premium.',
    features: [
      'Ajuste de altura suave de 12cm',
      'Inclinación de -5° a +25°',
      'Base antideslizante premium',
      'Gestión de cables integrada',
      'Construcción de aluminio'
    ],
    specifications: {
      'Compatibilidad': 'Monitores hasta 32"',
      'Peso máximo': '15kg',
      'Material': 'Aluminio anodizado',
      'Ajuste de altura': '12cm',
      'VESA': '100x100mm'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 14,
    name: 'Twelve South BookArc',
    category: 'stands',
    subcategory: 'laptop',
    price: 59.99,
    rating: 4.8,
    reviews: 1234,
    image: '💻',
    images: ['💻', '📦', '🖥️', '🔧'],
    color: 'Space Gray',
    colors: ['Space Gray', 'Silver'],
    badge: 'Diseño icónico',
    inStock: true,
    stockQuantity: 89,
    description: 'Soporte vertical para MacBook que ahorra espacio y mejora la ventilación.',
    features: [
      'Diseño vertical ahorra espacio',
      'Mejora la refrigeración',
      'Insertos de silicona ajustables',
      'Compatible con todos los MacBook',
      'Cable management integrado'
    ],
    specifications: {
      'Material': 'Aluminio sólido',
      'Dimensiones': '10.5 x 8.5 x 5.5cm',
      'Peso': '340g',
      'Compatibilidad': 'MacBook Air/Pro todos los tamaños',
      'Incluye': '3 tamaños de insertos'
    },
    brand: 'Twelve South',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 15,
    name: 'Rain Design mStand',
    category: 'stands',
    subcategory: 'laptop',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 2876,
    image: '🖥️',
    images: ['🖥️', '📦', '💻', '🔧'],
    color: 'Silver',
    colors: ['Silver', 'Space Gray', 'Gold'],
    inStock: true,
    stockQuantity: 123,
    description: 'Eleva tu laptop a la altura ergonómica perfecta con este soporte de aluminio premium.',
    features: [
      'Eleva la pantalla 15cm',
      'Ángulo de inclinación ergonómico',
      'Almohadillas antideslizantes',
      'Espacio para teclado debajo',
      'Una sola pieza de aluminio'
    ],
    specifications: {
      'Material': 'Aluminio anodizado',
      'Altura': '15cm',
      'Inclinación': '25°',
      'Base': '25 x 23cm',
      'Peso máximo': '10kg'
    },
    brand: 'Rain Design',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Fundas
  {
    id: 16,
    name: 'Leather Sleeve MacBook Pro',
    category: 'cases',
    subcategory: 'laptop',
    price: 179.99,
    rating: 4.8,
    reviews: 892,
    image: '💼',
    images: ['💼', '📦', '🎒', '💻'],
    color: 'Saddle Brown',
    colors: ['Saddle Brown', 'Midnight Blue', 'Black'],
    inStock: true,
    stockQuantity: 34,
    description: 'Funda de cuero premium europea con forro de microfibra para máxima protección.',
    features: [
      'Cuero europeo de alta calidad',
      'Forro de microfibra suave',
      'Diseño slim sin bulk',
      'Envejece bellamente con el uso',
      'Cierre magnético invisible'
    ],
    specifications: {
      'Material exterior': 'Cuero europeo',
      'Material interior': 'Microfibra',
      'Compatibilidad': 'MacBook Pro 14"',
      'Dimensiones': '34 x 24.5 x 1.5cm',
      'Peso': '280g'
    },
    brand: 'Apple',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 17,
    name: 'dbrand Grip Case iPhone',
    category: 'cases',
    subcategory: 'phone',
    price: 49.99,
    rating: 4.9,
    reviews: 3456,
    image: '📱',
    images: ['📱', '📦', '🛡️', '🎨'],
    color: 'Black Matrix',
    colors: ['Black Matrix', 'Robot Camo', 'Teardown', 'Damascus'],
    badge: 'Personalizable',
    inStock: true,
    stockQuantity: 167,
    description: 'La funda más grippy del mundo con skins personalizables y protección militar.',
    features: [
      'Textura micro-dot anti-deslizante',
      'Protección de grado militar',
      'Compatible con skins dbrand',
      'Bordes elevados para cámara y pantalla',
      'Sin amarilleamiento garantizado'
    ],
    specifications: {
      'Material': 'Policarbonato + TPU',
      'Protección': 'Caídas hasta 3 metros',
      'Compatibilidad': 'iPhone 15 Pro',
      'Peso': '35g',
      'Grosor': '2.2mm en los lados'
    },
    brand: 'dbrand',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '60 días de devolución'
  },
  {
    id: 18,
    name: 'Peak Design Everyday Case',
    category: 'cases',
    subcategory: 'phone',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 1298,
    image: '📱',
    images: ['📱', '📦', '🛡️', '🎨'],
    color: 'Charcoal',
    colors: ['Charcoal', 'Sage', 'Midnight', 'Redwood'],
    inStock: true,
    stockQuantity: 98,
    description: 'Funda minimalista con sistema de montaje magnético SlimLink para accesorios.',
    features: [
      'Sistema magnético SlimLink',
      'Perfil ultra delgado 2.4mm',
      'Nylon Canvas resistente',
      'Compatible con MagSafe',
      'Botones de aluminio mecanizado'
    ],
    specifications: {
      'Material': 'Policarbonato + Nylon Canvas',
      'Sistema': 'SlimLink magnético',
      'Compatibilidad': 'iPhone 15 series',
      'Peso': '28g',
      'Accesorios': 'Ecosistema completo'
    },
    brand: 'Peak Design',
    warranty: 'De por vida',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Hubs
  {
    id: 19,
    name: 'CalDigit TS4 Thunderbolt 4 Dock',
    category: 'hubs',
    subcategory: 'dock',
    price: 399.99,
    rating: 4.9,
    reviews: 456,
    image: '🔗',
    images: ['🔗', '📦', '💻', '🔌'],
    color: 'Space Gray',
    colors: ['Space Gray'],
    featured: true,
    badge: 'Pro Choice',
    inStock: true,
    stockQuantity: 23,
    description: 'El dock Thunderbolt 4 más completo con 18 puertos y 98W de carga.',
    features: [
      '18 puertos de conectividad total',
      '98W de carga para laptop',
      '2.5 Gigabit Ethernet',
      'Soporta 2 monitores 6K o 1 de 8K',
      'Lector de tarjetas SD UHS-II'
    ],
    specifications: {
      'Puertos Thunderbolt 4': '3 (1 host, 2 downstream)',
      'USB-A': '5 puertos (USB 3.2 Gen2)',
      'USB-C': '3 puertos (USB 3.2 Gen2)',
      'Video': '1x DisplayPort 1.4',
      'Dimensiones': '290 x 110 x 28mm'
    },
    brand: 'CalDigit',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 20,
    name: 'Anker PowerExpand 8-in-1',
    category: 'hubs',
    subcategory: 'usb-c',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 2345,
    image: '🔗',
    images: ['🔗', '📦', '💻', '🔌'],
    color: 'Space Gray',
    colors: ['Space Gray'],
    badge: 'Mejor valor',
    inStock: true,
    stockQuantity: 145,
    description: 'Hub USB-C compacto con todos los puertos esenciales para tu setup móvil.',
    features: [
      'HDMI 4K@60Hz',
      'Carga PD de 100W pass-through',
      '2x USB-A 3.0 de alta velocidad',
      'Lector SD/microSD',
      'Ethernet Gigabit'
    ],
    specifications: {
      'Entrada': 'USB-C (Thunderbolt 3/4)',
      'Salida video': 'HDMI 2.0 4K@60Hz',
      'Transferencia': 'Hasta 5Gbps',
      'Material': 'Aluminio',
      'Cable': '20cm integrado'
    },
    brand: 'Anker',
    warranty: '18 meses',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 21,
    name: 'Satechi USB-C Slim Dock',
    category: 'hubs',
    subcategory: 'usb-c',
    price: 89.99,
    rating: 4.5,
    reviews: 1876,
    image: '🔗',
    images: ['🔗', '📦', '💻', '🔌'],
    color: 'Silver',
    colors: ['Silver', 'Space Gray'],
    inStock: true,
    stockQuantity: 67,
    description: 'Dock minimalista diseñado específicamente para iMac 24" con puertos frontales.',
    features: [
      'Diseño a juego con iMac',
      'Puertos de acceso frontal',
      'USB4 hasta 40Gbps',
      'Lector de tarjetas UHS-I',
      'Perfil ultra delgado'
    ],
    specifications: {
      'Puertos': '3x USB-A, 2x USB-C, SD',
      'Velocidad': 'USB 3.2 Gen 2',
      'Compatibilidad': 'iMac 24" M1/M2',
      'Montaje': 'Adhesivo removible',
      'Dimensiones': '280 x 35 x 12mm'
    },
    brand: 'Satechi',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },

  // Más accesorios variados
  {
    id: 22,
    name: 'Elgato Stream Deck MK.2',
    category: 'accessories',
    subcategory: 'streaming',
    price: 149.99,
    rating: 4.8,
    reviews: 2109,
    image: '🎮',
    images: ['🎮', '📦', '🎬', '💻'],
    color: 'Black',
    colors: ['Black'],
    badge: 'Creator favorite',
    inStock: true,
    stockQuantity: 56,
    description: 'Control total de tu contenido con 15 teclas LCD personalizables.',
    features: [
      '15 teclas LCD personalizables',
      'Integración con OBS, Twitch, YouTube',
      'Soporte ajustable removible',
      'Carpetas ilimitadas',
      'SDK para desarrolladores'
    ],
    specifications: {
      'Teclas': '15 LCD',
      'Resolución por tecla': '72 x 72 px',
      'Conectividad': 'USB-C',
      'Compatible': 'Windows 10+, macOS 10.13+',
      'Dimensiones': '118 x 84 x 25mm'
    },
    brand: 'Elgato',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 23,
    name: 'Philips Hue Play Light Bar',
    category: 'accessories',
    subcategory: 'lighting',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 1543,
    image: '💡',
    images: ['💡', '📦', '🎨', '🏠'],
    color: 'Black',
    colors: ['Black', 'White'],
    badge: 'Smart Home',
    inStock: true,
    stockQuantity: 78,
    description: 'Barras de luz inteligentes para sincronizar con tu entretenimiento.',
    features: [
      '16 millones de colores',
      'Sincronización con TV/Música',
      'Control por voz',
      'Montaje versátil',
      'Requiere Hue Bridge'
    ],
    specifications: {
      'Lúmenes': '530lm por barra',
      'Consumo': '6.6W',
      'Vida útil': '25,000 horas',
      'Conectividad': 'Zigbee via Bridge',
      'Kit incluye': '2 barras + fuente'
    },
    brand: 'Philips',
    warranty: '2 años',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  },
  {
    id: 24,
    name: 'DJI OM 5 Gimbal',
    category: 'accessories',
    subcategory: 'photography',
    price: 159.99,
    rating: 4.6,
    reviews: 987,
    image: '📸',
    images: ['📸', '📦', '🎬', '📱'],
    color: 'Athens Gray',
    colors: ['Athens Gray', 'Sunset White'],
    inStock: true,
    stockQuantity: 45,
    description: 'Estabilizador para smartphone con brazo extensible integrado.',
    features: [
      'Estabilización en 3 ejes',
      'Brazo extensible de 215mm',
      'ActiveTrack 4.0',
      'Gestos de control',
      'Magnético y plegable'
    ],
    specifications: {
      'Peso': '290g',
      'Batería': '6.4 horas',
      'Carga': 'USB-C, 1.5 horas',
      'Compatible': 'Smartphones 170-290g',
      'App': 'DJI Mimo'
    },
    brand: 'DJI',
    warranty: '1 año',
    shipping: 'Envío gratis',
    returnPolicy: '30 días de devolución'
  }
];

// Categorías con subcategorías
export const categories = [
  {
    id: 'all',
    name: 'Todos los productos',
    icon: '🛍️',
    count: products.length
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: '🎧',
    count: products.filter(p => p.category === 'audio').length,
    subcategories: [
      { id: 'headphones', name: 'Audífonos', icon: '🎧' },
      { id: 'earbuds', name: 'Auriculares', icon: '🎵' },
      { id: 'speakers', name: 'Bocinas', icon: '🔊' }
    ]
  },
  {
    id: 'charging',
    name: 'Carga',
    icon: '🔌',
    count: products.filter(p => p.category === 'charging').length,
    subcategories: [
      { id: 'wireless', name: 'Inalámbrica', icon: '⚡' },
      { id: 'powerbank', name: 'Power Banks', icon: '🔋' },
      { id: 'cables', name: 'Cables', icon: '🔌' }
    ]
  },
  {
    id: 'keyboards',
    name: 'Teclados',
    icon: '⌨️',
    count: products.filter(p => p.category === 'keyboards').length,
    subcategories: [
      { id: 'mechanical', name: 'Mecánicos', icon: '⌨️' },
      { id: 'ipad', name: 'Para iPad', icon: '📱' },
      { id: 'desktop', name: 'Desktop', icon: '💻' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accesorios',
    icon: '✨',
    count: products.filter(p => p.category === 'accessories').length,
    subcategories: [
      { id: 'stylus', name: 'Stylus', icon: '✏️' },
      { id: 'tracker', name: 'Rastreadores', icon: '📍' },
      { id: 'grips', name: 'Soportes móvil', icon: '🤳' },
      { id: 'streaming', name: 'Streaming', icon: '🎮' },
      { id: 'lighting', name: 'Iluminación', icon: '💡' },
      { id: 'photography', name: 'Fotografía', icon: '📸' }
    ]
  },
  {
    id: 'stands',
    name: 'Soportes',
    icon: '🖥️',
    count: products.filter(p => p.category === 'stands').length,
    subcategories: [
      { id: 'monitor', name: 'Monitor', icon: '🖥️' },
      { id: 'laptop', name: 'Laptop', icon: '💻' },
      { id: 'tablet', name: 'Tablet', icon: '📱' }
    ]
  },
  {
    id: 'cases',
    name: 'Fundas',
    icon: '💼',
    count: products.filter(p => p.category === 'cases').length,
    subcategories: [
      { id: 'laptop', name: 'Laptop', icon: '💻' },
      { id: 'phone', name: 'Teléfono', icon: '📱' },
      { id: 'tablet', name: 'Tablet', icon: '📱' }
    ]
  },
  {
    id: 'hubs',
    name: 'Hubs & Docks',
    icon: '🔗',
    count: products.filter(p => p.category === 'hubs').length,
    subcategories: [
      { id: 'dock', name: 'Docks TB4', icon: '⚡' },
      { id: 'usb-c', name: 'USB-C Hubs', icon: '🔗' },
      { id: 'adapters', name: 'Adaptadores', icon: '🔌' }
    ]
  }
];

// Marcas
export const brands = [
  'Apple', 'Sony', 'Bose', 'Anker', 'Belkin', 'Logitech', 
  'Keychron', 'PopSocket', 'Twelve South', 'Rain Design', 
  'dbrand', 'Peak Design', 'CalDigit', 'Satechi', 'Elgato', 
  'Philips', 'DJI'
];

// Rangos de precio para filtros
export const priceRanges = [
  { id: 'all', label: 'Todos los precios', min: 0, max: Infinity },
  { id: 'under50', label: 'Menos de $50', min: 0, max: 50 },
  { id: '50to100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100to200', label: '$100 - $200', min: 100, max: 200 },
  { id: '200to500', label: '$200 - $500', min: 200, max: 500 },
  { id: 'over500', label: 'Más de $500', min: 500, max: Infinity }
];

// Opciones de ordenamiento
export const sortOptions = [
  { id: 'featured', label: 'Destacados', sortFn: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) },
  { id: 'newest', label: 'Más recientes', sortFn: (a, b) => b.id - a.id },
  { id: 'price-low', label: 'Precio: Menor a Mayor', sortFn: (a, b) => a.price - b.price },
  { id: 'price-high', label: 'Precio: Mayor a Menor', sortFn: (a, b) => b.price - a.price },
  { id: 'rating', label: 'Mejor valorados', sortFn: (a, b) => b.rating - a.rating },
  { id: 'popular', label: 'Más populares', sortFn: (a, b) => b.reviews - a.reviews }
];