import { Product, StoreInfo } from '../types';

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_fashion_boutique_1794920645538.jpg',
  alt: 'Interior luminoso de Casa Vértice con abrigos de lana camel, chaquetas de lino marfil y gabardina arquitectónica',
};

export const STORE_INFO: StoreInfo = {
  name: 'Casa Vértice · Boutique Salamanca',
  street: 'Calle de Velázquez, 62',
  unit: 'Local B · Planta Calle',
  postalAndCity: '28001 Madrid, España',
  neighborhood: 'Barrio de Salamanca (entre Calle de Ayala y Calle de Don Ramón de la Cruz)',
  phone: '+34 914 820 310',
  email: 'hola@casavertice.es',
  hours: [
    { day: 'Lunes a Viernes', time: '10:30 – 20:30' },
    { day: 'Sábados', time: '10:30 – 21:00' },
    { day: 'Domingos y festivos', time: '11:30 – 18:00' },
  ],
  transit: [
    'Metro Velázquez (Línea 4) · Salida Núñez de Balboa (2 min a pie)',
    'Metro Núñez de Balboa (Líneas 5 y 9) · 4 min a pie',
    'Autobuses EMT líneas 1, 9, 19, 51 y 74',
  ],
  parking: 'Aparcamiento público Velázquez-Ayala a 90 metros del local.',
};

export const CATEGORY_SECTIONS: {
  id: 'mujeres' | 'hombres' | 'accesorios';
  indexLabel: string;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'mujeres',
    indexLabel: '01. Colección Femenina',
    title: 'Mujeres',
    subtitle: 'Siluetas fluidas en gabardina orgánica, seda morera y punto merino de corte depurado.',
  },
  {
    id: 'hombres',
    indexLabel: '02. Colección Masculina',
    title: 'Hombres',
    subtitle: 'Sastrería relajada en lana italiana, lino belga de alto gramaje y básicos estructurados.',
  },
  {
    id: 'accesorios',
    indexLabel: '03. Marroquinería y Complementos',
    title: 'Accesorios',
    subtitle: 'Piel de curtición vegetal, bufandas en cachemir escocés y gafas de acetato pulido a mano.',
  },
];

export const PRODUCTS: Product[] = [
  // Mujeres
  {
    id: 'muj-gabardina-velazquez',
    sku: 'CV-M01',
    name: 'Gabardina Cruzada Arena',
    category: 'mujeres',
    categoryLabel: 'Mujeres',
    material: 'Algodón Orgánico',
    price: 285,
    image: '/src/assets/images/women_trench_coat_1794920646350.jpg',
    imageAlt: 'Gabardina cruzada color arena de algodón orgánico con cinturón y hebilla metálica',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Arena cálida',
    description:
      'Confeccionada en gabardina hidrofóbica de algodón orgánico peinado con solapa amplia, cinturón ajustable con anilla en D y botones efecto cuerno.',
    care: 'Limpieza en seco profesional o lavado delicado en frío. Planchar a temperatura baja.',
    inStoreStock: true,
    featuredTag: 'Edición de Temporada',
  },
  {
    id: 'muj-conjunto-seda-marfil',
    sku: 'CV-M02',
    name: 'Blusa Drapeada en Seda Marfil',
    category: 'mujeres',
    categoryLabel: 'Mujeres',
    material: '100% Seda Morera',
    price: 190,
    image: '/src/assets/images/women_silk_blouse_1794920647050.jpg',
    imageAlt: 'Blusa drapeada de seda marfil junto a pantalón de pinzas crudo sobre bloque de travertino',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Marfil natural',
    description:
      'Blusa de caída asimétrica en crepé de seda morera de 19 momme con puños abotonados y acabado mate luminoso. Pensada para combinar con sastrería de tiro alto.',
    care: 'Lavado a mano en agua fría con jabón neutro. Secar en horizontal sobre toalla.',
    inStoreStock: true,
  },
  {
    id: 'muj-cardigan-merino-antracita',
    sku: 'CV-M03',
    name: 'Cárdigan Canalé Lana Merino',
    category: 'mujeres',
    categoryLabel: 'Mujeres',
    material: 'Merino Extrafino',
    price: 165,
    image: '/src/assets/images/women_merino_knit_1794920647127.jpg',
    imageAlt: 'Cárdigan de punto canalé color antracita doblado junto a prenda de lino natural',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Gris antracita',
    description:
      'Tejido en punto inglés de lana merino extrafina sin costuras laterales, escote en pico equilibrado y botones de corozo natural.',
    care: 'Lavar a mano a máximo 30 °C. Guardar doblado, nunca colgado.',
    inStoreStock: true,
  },

  // Hombres
  {
    id: 'hom-sobrecamisa-lana-marino',
    sku: 'CV-H01',
    name: 'Sobrecamisa Lana Italiana Marino',
    category: 'hombres',
    categoryLabel: 'Hombres',
    material: 'Lana Virgen 420 g',
    price: 240,
    image: '/src/assets/images/men_wool_overshirt_1794920646984.jpg',
    imageAlt: 'Sobrecamisa estructurada de lana cepillada azul marino con bolsillos frontales y botones oscuros',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Azul marino profundo',
    description:
      'Prenda exterior ligera cortada en paño cepillado italiano con dos bolsillos de parche con solapa, puños sastre y forro parcial en cupro.',
    care: 'Cepillar con cerdas suaves tras su uso. Limpieza en seco recomendada.',
    inStoreStock: true,
    featuredTag: 'Más vendido en local',
  },
  {
    id: 'hom-pantalon-pinzas-pizarra',
    sku: 'CV-H02',
    name: 'Pantalón de Pinzas Franela Pizarra',
    category: 'hombres',
    categoryLabel: 'Hombres',
    material: 'Franela Lana Virgen',
    price: 175,
    image: '/src/assets/images/men_tailored_trousers_1794920647566.jpg',
    imageAlt: 'Pantalón de pinzas en franela gris pizarra junto a jersey de cachemir avena sobre piedra',
    sizes: ['38', '40', '42', '44', '46'],
    color: 'Gris pizarra',
    description:
      'Corte recto con doble pinza frontal, cintura extendida con ajustadores laterales y caída limpia sobre el calzado.',
    care: 'Planchar al vapor con paño protector. Limpieza en seco.',
    inStoreStock: true,
  },
  {
    id: 'hom-camisa-lino-belga',
    sku: 'CV-H03',
    name: 'Camisa Lino Belga Piedra',
    category: 'hombres',
    categoryLabel: 'Hombres',
    material: 'Lino de Alto Gramaje',
    price: 125,
    image: '/src/assets/images/men_linen_shirt_1794920648689.jpg',
    imageAlt: 'Camisa blanca piedra de lino belga exhibida sobre busto de madera en taller',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Blanco piedra',
    description:
      'Tejida con lino belga lavado a la piedra para lograr una textura suave desde el primer día. Cuello inglés abotonado y botones de nácar.',
    care: 'Lavado a máquina a 30 °C en ciclo suave. Planchar ligeramente húmeda.',
    inStoreStock: true,
  },

  // Accesorios
  {
    id: 'acc-bolso-tote-coñac',
    sku: 'CV-A01',
    name: 'Bolso Tote Piel Curtición Vegetal',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    material: 'Piel Vacuna Plena Flor',
    price: 310,
    image: '/src/assets/images/acc_leather_tote_1794920649046.jpg',
    imageAlt: 'Bolso tote estructurado de piel color coñac sobre cubo de piedra travertino',
    sizes: ['Única'],
    color: 'Coñac tostado',
    description:
      'Bolso de estructura arquitectónica elaborado en Ubrique con piel de curtición vegetal, asas regulables con hebillas en latón y bolsillo interior con cremallera.',
    care: 'Hidratar dos veces al año con crema neutra para piel. Guardar en su funda de algodón.',
    inStoreStock: true,
    featuredTag: 'Edición Numerada',
  },
  {
    id: 'acc-bufanda-cachemir-cinturon',
    sku: 'CV-A02',
    name: 'Bufanda Cachemir Avena',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    material: '100% Cachemir Escocés',
    price: 145,
    image: '/src/assets/images/acc_cashmere_scarf_1794920648766.jpg',
    imageAlt: 'Bufanda de cachemir sin teñir color avena junto a cinturón de piel espresso con hebilla de latón',
    sizes: ['Única'],
    color: 'Avena sin teñir',
    description:
      'Tejida en telares tradicionales con fibras de cachemir sin blanquear ni teñir, ofreciendo una suavidad cálida y flecos torneados a mano.',
    care: 'Lavar a mano en agua fría con champú suave para lana. Secar en plano.',
    inStoreStock: true,
  },
  {
    id: 'acc-gafas-acetato-carey',
    sku: 'CV-A03',
    name: 'Gafas Sol Acetato Carey',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    material: 'Acetato Mazzucchelli',
    price: 155,
    image: '/src/assets/images/acc_acetate_sunglasses_1794920649368.jpg',
    imageAlt: 'Gafas de sol artesanales en acetato carey con lentes verdes sobre bandeja de travertino',
    sizes: ['Única'],
    color: 'Carey cálido / Lente verde G15',
    description:
      'Montura tallada en acetato italiano de celulosa natural con bisagras de cinco barriles y lentes minerales con protección UV400 antirreflejante.',
    care: 'Limpiar con gamuza de microfibra. Incluye estuche rígido de piel.',
    inStoreStock: true,
  },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
