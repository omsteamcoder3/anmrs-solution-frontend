// src/components/ProductCard.tsx
import { Product } from '@/types/product';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

// Format price with commas
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ============= OFFER LOGIC - WORKS FOR BOTH PRODUCT AND VARIANTS =============
const getProductOfferInfo = (product: Product) => {
  
  // 🎯 CASE 1: PRODUCT HAS VARIANTS - Check default variant for offer
  if (product.variants && product.variants.length > 0) {
    // Get default variant or first variant
    const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
    
    // ✅ Check if variant has originalPrice AND it's greater than price
    if (defaultVariant.originalPrice && 
        defaultVariant.price && 
        parseFloat(defaultVariant.originalPrice.toString()) > parseFloat(defaultVariant.price.toString())) {
      
      const original = parseFloat(defaultVariant.originalPrice.toString());
      const discounted = parseFloat(defaultVariant.price.toString());
      const discountPercentage = defaultVariant.discountPercentage || 
        ((original - discounted) / original) * 100;
      
      return {
        hasOffer: true,
        originalPrice: original,
        discountedPrice: discounted,
        discountPercentage: Math.round(discountPercentage * 100) / 100
      };
    }
    
    // No offer on default variant
    return {
      hasOffer: false,
      originalPrice: parseFloat(defaultVariant.price.toString()),
      discountedPrice: parseFloat(defaultVariant.price.toString()),
      discountPercentage: 0
    };
  }
  
  // 🎯 CASE 2: NO VARIANTS - Check product-level offer
  if (product.hasOffer && 
      product.originalPrice && 
      product.basePrice &&
      parseFloat(product.originalPrice.toString()) > parseFloat(product.basePrice.toString())) {
    
    const original = parseFloat(product.originalPrice.toString());
    const discounted = parseFloat(product.basePrice.toString());
    const discountPercentage = product.discountPercentage || 
      ((original - discounted) / original) * 100;
    
    return {
      hasOffer: true,
      originalPrice: original,
      discountedPrice: discounted,
      discountPercentage: Math.round(discountPercentage * 100) / 100
    };
  }
  
  // No offer
  return {
    hasOffer: false,
    originalPrice: parseFloat(product.basePrice?.toString() || '0'),
    discountedPrice: parseFloat(product.basePrice?.toString() || '0'),
    discountPercentage: 0
  };
};

// Get product image - prioritize variant images
const getProductImage = (product: Product) => {
  // Check variants first
  if (product.variants && product.variants.length > 0) {
    const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
    
    if (defaultVariant?.images?.[0]?.image) {
      return `${process.env.NEXT_PUBLIC_BASE_URL}${defaultVariant.images[0].image}`;
    }
  }
  
  // Fallback to main product images
  if (product.images?.[0]?.image) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].image}`;
  }
  
  return '/placeholder-image.jpg';
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToCart, cart } = useCart();
  const router = useRouter();

  // ✅ Get offer info - THIS WILL SHOW OFFER BADGE FOR VARIANTS
  const offerInfo = getProductOfferInfo(product);
  const hasValidOffer = offerInfo.hasOffer && offerInfo.originalPrice > offerInfo.discountedPrice;
  
  const isInCart = cart?.items?.some(item => item.product._id === product._id) || false;
  const isOutOfStock = product.stock <= 0;
  const imageUrl = getProductImage(product);

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <div 
      className="group relative bg-black border border-black shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Cart Badge */}
      {isInCart && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-orange-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-[10px] sm:text-xs  shadow-lg border border-white/20">
          ✓
        </div>
      )}

      {/* Image Section - 70% of card */}
      <div className="relative h-36 xs:h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-orange-500/10 to-transparent">
        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 260px) 90vw, (max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-100' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
            priority={false}
            loading="lazy"
          />
        </div>

        {/* Image Error Fallback */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Offer Badge - Positioned on Image */}
        {hasValidOffer && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-orange-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 text-[8px] sm:text-[10px] md:text-xs font-['Agbalumo'] shadow-lg border border-white/10">
            {Math.round(offerInfo.discountPercentage)}% OFF
          </div>
        )}

        {/* Gradient Overlay at Bottom of Image */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 md:h-12 lg:h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
      
      {/* Content Section - 30% of card */}
      <div className="p-2 sm:p-3 md:p-4 pt-1 sm:pt-1.5 md:pt-2">
        {/* Product Name - Compact */}
        <h3 className="font-['Agbalumo'] text-white text-[10px] xs:text-xs sm:text-sm md:text-base mb-1 sm:mb-1.5 md:mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Price and Stock Row - Compact */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3">
          <div className="flex items-baseline gap-0.5 sm:gap-1 md:gap-1.5">
            {/* Current Price */}
            <span className="font-['Agbalumo'] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl  text-orange-400">
              ₹{formatPrice(offerInfo.discountedPrice)}
            </span>
            
            {/* Original Price (if on offer) */}
            {hasValidOffer && (
              <span className="font-['Agbalumo'] text-[8px] xs:text-[10px] sm:text-xs text-gray-500 line-through">
                ₹{formatPrice(offerInfo.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status - Minimal */}
          <span className={`font-['Agbalumo'] text-[7px] xs:text-[8px] sm:text-[10px] px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 ${
            !isOutOfStock 
              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' 
              : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}>
            {!isOutOfStock ? 'In Stock' : 'Out'}
          </span>
        </div>

        {/* Add to Cart Button - Compact */}
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-2.5 sm:px-3 font-['Agbalumo'] text-[10px] xs:text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 shadow-md hover:shadow-orange-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: isOutOfStock ? '#374151' : 'rgb(249, 115, 22)',
            color: isOutOfStock ? '#9CA3AF' : '#000000'
          }}
        >
          <ShoppingBag size={12} className={`sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${isOutOfStock ? 'text-gray-400' : 'text-black'}`} />
          <span>{!isOutOfStock ? 'Add' : 'Out of Stock'}</span>
        </button>
      </div>

      {/* Hover Effect Overlay - Subtle */}
      <div className={`absolute inset-0 border border-orange-500/0 pointer-events-none transition-all duration-500 ${
        isHovered ? 'border-orange-500/50' : ''
      }`} />
    </div>
  );
}