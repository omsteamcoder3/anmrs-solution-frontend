import { Product, ProductVariant } from './product';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  variantId?: string;           // ✅ ADD THIS - comes from backend
  variantName?: string;         // ✅ ADD THIS - comes from backend
  selectedVariant?: ProductVariant; // Keep for backward compatibility
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  variantId?: string; 
}

export interface UpdateCartItemData {
  quantity: number;
}

export interface GuestCartItem {
  product: Product;
  quantity: number;
  price: number;
  variantId?: string;           // ✅ ADD THIS
  variantName?: string;         // ✅ ADD THIS
}

export interface GuestCart {
  items: GuestCartItem[];
  totalPrice: number;
  totalItems: number;
}