'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, clearCart, isGuest } = useCart();
  const router = useRouter();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // ✅ ADD THIS EFFECT TO LOG CART DATA WHEN IT CHANGES
  useEffect(() => {
    console.log('🛒 FULL CART DATA FROM BACKEND:', JSON.stringify(cart, null, 2));
  }, [cart]);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  // Use cart data directly from backend response
  const itemCount = cart.totalItems || 0;
  const subtotal = cart.totalPrice || 0;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleImageError = (itemId: string) => {
    console.log(`❌ Image failed to load for item: ${itemId}`);
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-42 cursor-pointer">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-xl sm:text-2xl  text-gray-900 mb-3 sm:mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Add some products to your cart to see them here.</p>
            <Link 
              href="/products"
              className="inline-block bg-gradient-to-r from-[rgb(255,150,81)] to-[rgb(223,89,0)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-orange-500/25"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-32 ">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl  text-gray-900">Shopping Cart</h1>
          {isGuest && (
            <div className="bg-gradient-to-r from-[rgb(255,150,81)]/10 to-[rgb(223,89,0)]/10 border border-gradient-to-r border-[rgb(255,150,81)]/20 text-[rgb(255,150,81)] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
              <p>
                🛒 Shopping as Guest •{' '}
                <Link href="/signup" className="font-semibold underline hover:text-[rgb(223,89,0)] transition-colors duration-200">
                  Sign up to save your cart
                </Link>
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Cart Items ({itemCount})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {cart.items.map((item) => {
                  // ✅ ========== COMPREHENSIVE DEBUG LOGS ==========
                  console.log('========== CART ITEM DEBUG ==========');
                  console.log('1. Item ID:', item._id);
                  console.log('2. variantId from backend:', item.variantId);
                  console.log('3. variantName from backend:', item.variantName);
                  console.log('4. selectedVariant (if exists):', item.selectedVariant);
                  console.log('5. Product exists:', !!item.product);
                  
                  if (item.product) {
                    console.log('6. Product ID:', item.product._id);
                    console.log('7. Product name:', item.product.name);
                    console.log('8. Product images array:', item.product.images);
                    console.log('9. Product variants array:', item.product.variants);
                    
                    if (item.product.variants && item.product.variants.length > 0) {
                      console.log('10. Number of variants:', item.product.variants.length);
                      item.product.variants.forEach((v, index) => {
                        console.log(`11. Variant ${index}:`, {
                          id: v._id,
                          name: v.variantName,
                          images: v.images,
                          imagesCount: v.images?.length || 0,
                          firstImage: v.images?.[0]?.image || 'no image'
                        });
                      });
                    } else {
                      console.log('10. No variants found in product');
                    }
                  }
                  
                  // Find the selected variant
                  let selectedVariant = null;
                  if (item.variantId && item.product?.variants) {
                    selectedVariant = item.product.variants.find(
                      v => v._id === item.variantId || v.variantName === item.variantName
                    );
                    console.log('12. Found matching variant:', selectedVariant ? 'YES' : 'NO');
                    if (selectedVariant) {
                      console.log('13. Selected variant images:', selectedVariant.images);
                    }
                  }
                  
                  // Build image URL
                  let imageUrl = null;
                  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
                  console.log('14. Base URL:', baseUrl);
                  
                  // Try variant image first
                  if (selectedVariant?.images?.[0]?.image) {
                    const variantImage = selectedVariant.images[0].image;
                    console.log('15. Using variant image path:', variantImage);
                    
                    if (variantImage.startsWith('http')) {
                      imageUrl = variantImage;
                    } else if (variantImage.startsWith('/')) {
                      imageUrl = `${baseUrl}${variantImage}`;
                    } else {
                      imageUrl = `${baseUrl}/uploads/${variantImage}`;
                    }
                    console.log('16. Constructed variant image URL:', imageUrl);
                  }
                  // Fallback to product image
                  else if (item.product?.images?.[0]?.image) {
                    const productImage = item.product.images[0].image;
                    console.log('17. Using product image path:', productImage);
                    
                    if (productImage.startsWith('http')) {
                      imageUrl = productImage;
                    } else if (productImage.startsWith('/')) {
                      imageUrl = `${baseUrl}${productImage}`;
                    } else {
                      imageUrl = `${baseUrl}/uploads/${productImage}`;
                    }
                    console.log('18. Constructed product image URL:', imageUrl);
                  } else {
                    console.log('19. NO IMAGE FOUND - using placeholder');
                  }
                  
                  console.log('20. FINAL IMAGE URL:', imageUrl);
                  console.log('=====================================\n');

                  // Check if image failed to load
                  const hasImageError = imageErrors[item._id];
                  
                  return (
                    <div key={item._id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-6">
                      {/* Product Image and Info - Mobile Layout */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {imageUrl && !hasImageError ? (
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={imageUrl}
                              alt={item.product?.name || 'Product image'}
                              fill
                              sizes="64px"
                              className="object-cover rounded-lg"
                              onError={() => handleImageError(item._id)}
                              unoptimized={imageUrl.startsWith('http') && !imageUrl.includes(process.env.NEXT_PUBLIC_BASE_URL || '')}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Product Info - Mobile Layout */}
                        <div className="sm:hidden flex-grow">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {item.product?.name || 'Unnamed Product'}
                          </h3>
                          {/* Show selected pack/variant */}
                          {selectedVariant && (
                            <p className="text-[rgb(255,150,81)] text-xs font-medium">
                              📦 Pack: {selectedVariant.variantName}
                            </p>
                          )}
                          {!selectedVariant && item.variantName && (
                            <p className="text-[rgb(255,150,81)] text-xs font-medium">
                              📦 Pack: {item.variantName}
                            </p>
                          )}
                          <p className="text-gray-600 text-xs">₹{item.price || 0}</p>
                          {item.product?.stock && item.product.stock < 10 && (
                            <p className="text-orange-600 text-xs mt-1">
                              Only {item.product.stock} left
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Product Info - Desktop Layout */}
                      <div className="hidden sm:block flex-grow">
                        <h3 className="font-semibold text-gray-900">
                          {item.product?.name || 'Unnamed Product'}
                        </h3>
                        {/* Show selected pack/variant */}
                        {selectedVariant && (
                          <p className="text-[rgb(255,150,81)] text-sm font-medium">
                            📦 Pack: {selectedVariant.variantName}
                          </p>
                        )}
                        {!selectedVariant && item.variantName && (
                          <p className="text-[rgb(255,150,81)] text-sm font-medium">
                            📦 Pack: {item.variantName}
                          </p>
                        )}
                        <p className="text-gray-600 text-sm">₹{item.price || 0}</p>
                        {item.product?.stock && item.product.stock < 10 && (
                          <p className="text-orange-600 text-xs mt-1">
                            Only {item.product.stock} left in stock
                          </p>
                        )}
                      </div>
                      
                      {/* Quantity Controls and Price - Mobile Layout */}
                      <div className="flex items-center justify-between sm:justify-center sm:space-x-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateCartItem(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[rgb(255,150,81)]/10 hover:to-[rgb(223,89,0)]/10 hover:border-gradient-to-r hover:border-[rgb(255,150,81)] hover:text-[rgb(255,150,81)] disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-all duration-200 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 sm:w-12 text-center text-sm sm:text-base">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItem(item._id, item.quantity + 1)}
                            disabled={item.quantity >= (item.product?.stock || 0)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-[rgb(255,150,81)]/10 hover:to-[rgb(223,89,0)]/10 hover:border-gradient-to-r hover:border-[rgb(255,150,81)] hover:text-[rgb(255,150,81)] disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-all duration-200 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Price and Remove - Mobile Layout */}
                        <div className="sm:hidden text-right">
                          <p className="font-semibold text-gray-900 text-sm">₹{((item.price || 0) * item.quantity).toFixed(2)}</p>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-800 text-xs transition-colors duration-200 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price and Remove - Desktop Layout */}
                      <div className="hidden sm:block text-right min-w-[100px]">
                        <p className="font-semibold text-gray-900">₹{((item.price || 0) * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-800 text-sm transition-colors duration-200 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="text-[rgb(255,150,81)]">FREE</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-gray-700">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[rgb(255,150,81)] to-[rgb(223,89,0)] text-white py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium mb-3 sm:mb-4 text-sm sm:text-base shadow-lg hover:shadow-orange-500/25 cursor-pointer"
              >
                Proceed to Checkout
              </button>

              {isGuest && (
                <div className="text-center mb-3 sm:mb-4 space-y-2">
                  <p className="text-xs sm:text-sm text-gray-600">Want faster checkout?</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <Link 
                      href="/login"
                      className="bg-gradient-to-r from-[rgb(255,150,81)] to-[rgb(223,89,0)] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-center text-xs sm:text-sm shadow-lg hover:shadow-orange-500/25"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup"
                      className="border border-gradient-to-r border-[rgb(255,150,81)] text-[rgb(255,150,81)] py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-[rgb(255,150,81)] hover:to-[rgb(223,89,0)] hover:text-white transition-all duration-200 font-medium text-center text-xs sm:text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
              
              <Link 
                href="/products"
                className="w-full border border-gradient-to-r border-[rgb(255,150,81)] text-[rgb(255,150,81)] py-3 rounded-lg hover:bg-gradient-to-r hover:from-[rgb(255,150,81)] hover:to-[rgb(223,89,0)] hover:text-white transition-all duration-200 font-medium text-center block text-sm sm:text-base"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}