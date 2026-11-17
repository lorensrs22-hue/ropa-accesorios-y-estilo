export type CategoryId = 'mujeres' | 'hombres' | 'accesorios';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  material: string;
  price: number;
  image: string;
  imageAlt: string;
  sizes: string[];
  color: string;
  description: string;
  care: string;
  inStoreStock: boolean;
  featuredTag?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface StoreInfo {
  name: string;
  street: string;
  unit: string;
  postalAndCity: string;
  neighborhood: string;
  phone: string;
  email: string;
  hours: { day: string; time: string }[];
  transit: string[];
  parking: string;
}
