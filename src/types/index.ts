
// Core Application Types

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Producer {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  featured: boolean;
  foundedYear: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  categoryId: number;
  producerId: number; // Assuming Producer type will be used if needed
  stock: number;
  featured: boolean;
  rating?: number;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Made optional, typically not stored in frontend state after login
  address?: string;
  phone?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product; // Optional: To store product details for cart display
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';

export interface Order {
  id: number;
  userId: number; // Linked to User
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  // items: OrderDetail[]; // An order would typically contain its details
}

export interface OrderDetail {
  id: number;
  orderId: number; // Linked to Order
  productId: number; // Linked to Product
  quantity: number;
  price: number; // Price at the time of order
}
