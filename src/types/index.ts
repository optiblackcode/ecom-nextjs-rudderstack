export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  collectionId: string;
  image: string;
  images?: string[];
  badge?: string;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  firstPurchaseDate?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    name: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
  };
}
