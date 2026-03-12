'use client';

import Image from 'next/image';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductCard from '@/components/ui/ProductCard';
import { Product, ProductVariant } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useCart } from '@/context/CartContext';

interface ClientProductDetailProps {
  product: Product;
  randomProducts: Product[];
}

// Define interface for category attribute
interface CategoryAttribute {
  value: string;
  unit?: string;
  _id?: {
    $oid: string;
  };
}

// Mobile Floating Button Component
interface MobileFloatingButtonProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  isVisible: boolean;
  onAddToCart: (quantity: number, variant: ProductVariant | null) => Promise<void>;
}

const MobileFloatingButton = ({ 
  product, 
  selectedVariant,
  isVisible, 
  onAddToCart 
}: MobileFloatingButtonProps) => {
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToBuy, setAddingToBuy] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const currentStock = selectedVariant ? selectedVariant.stock : (product?.stock || 0);
  const isOutOfStock = currentStock <= 0;
  
  const handleCartClick = async () => {
    if (isOutOfStock || !product) return;
    
    try {
      setAddingToCart(true);
      await onAddToCart(quantity, selectedVariant);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };
  
  const handleBuyClick = async () => {
    if (isOutOfStock || !product) return;
    try {
      setAddingToBuy(true);
      router.push('/checkout');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAddingToBuy(false);
    }
  };

  return (
    <div className={`
      lg:hidden fixed bottom-0 left-0 right-0 z-50 
      transform transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>
      <div className="bg-orange-400 border-t border-orange-500">
        <div className="flex items-center justify-between px-3 py-1.5 bg-orange-300 border-b border-orange-500">
          <span className="text-xs font-medium text-black">Quantity:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-6 h-6 flex items-center justify-center bg-white border border-orange-600 rounded-md text-black disabled:opacity-40 hover:bg-orange-50"
            >-</button>
            <span className="text-sm font-medium w-6 text-center text-black">{quantity}</span>
            <button
              onClick={() => {
                const maxStock = currentStock || 99;
                setQuantity(prev => Math.min(maxStock, prev + 1))
              }}
              disabled={isOutOfStock || quantity >= (currentStock || 99)}
              className="w-6 h-6 flex items-center justify-center bg-white border border-orange-600 rounded-md text-black disabled:opacity-40 hover:bg-orange-50"
            >+</button>
          </div>
        </div>
        
        <div className="flex items-stretch h-10">
          <button
            onClick={handleCartClick}
            disabled={isOutOfStock || addingToCart}
            className={`
              flex-1 flex items-center justify-center gap-1 transition-all duration-300 relative
              ${isOutOfStock || addingToCart
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-900 hover:shadow-md shadow cursor-pointer'
              }
            `}
          >
            {addingToCart ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
            ) : showAddedMessage ? (
              <span className="text-xs font-medium animate-pulse">Added! ✓</span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-medium">Cart</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleBuyClick}
            disabled={isOutOfStock || addingToBuy}
            className={`
              flex-1 flex items-center justify-center gap-1 transition-colors duration-200
              ${isOutOfStock || addingToBuy
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-gray-100 border-l border-orange-500'
              }
            `}
          >
            {addingToBuy ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-black"></div>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-xs font-medium">Buy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Structured Data Component (JSON-LD)
const ProductStructuredData = ({ product, selectedVariant }: { product: Product, selectedVariant: ProductVariant | null }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || '';
  
  const displayPrice = selectedVariant ? selectedVariant.price : (product?.basePrice || 0);
  const displayImage = selectedVariant && selectedVariant.images && selectedVariant.images.length > 0 && selectedVariant.images[0]?.image 
    ? `${process.env.NEXT_PUBLIC_BASE_URL || ''}${selectedVariant.images[0].image}`
    : product?.images && product.images.length > 0 && product.images[0]?.image 
      ? `${process.env.NEXT_PUBLIC_BASE_URL || ''}${product.images[0].image}`
      : `${siteUrl}/og-image.png`;
  
  const displayStock = selectedVariant ? selectedVariant.stock : (product?.stock || 0);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": (product?.name || '') + (selectedVariant ? ` - ${selectedVariant.variantName}` : ''),
    "description": selectedVariant?.description || product?.description || '',
    "image": displayImage,
    "brand": {
      "@type": "Brand",
      "name": product?.seller || storeName,
      "logo": `${siteUrl}/logo.png`
    },
    "sku": selectedVariant?.sku || product?._id || '',
    "gtin": product?.sNo?.toString() || `SNO${product?.sNo}` || '',
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product?.slug || ''}`,
      "priceCurrency": "INR",
      "price": displayPrice,
      "availability": displayStock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": product?.seller || storeName
      }
    },
    "category": product?.category && typeof product.category === 'object' ? product.category.name : "Products",
    "additionalProperty": []
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${siteUrl}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": (product?.name || '') + (selectedVariant ? ` - ${selectedVariant.variantName}` : ''),
        "item": `${siteUrl}/products/${product?.slug || ''}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
    </>
  );
};

// Helper function to format weight display
const formatWeightDisplay = (weight: number, unit: string): string => {
  if (!weight || weight <= 0) return '';
  
  let displayWeight = weight;
  let displayUnit = unit;
  
  if (unit === 'gram' && weight >= 1000) {
    displayWeight = weight / 1000;
    displayUnit = 'kg';
  } else if (unit === 'ml' && weight >= 1000) {
    displayWeight = weight / 1000;
    displayUnit = 'liter';
  }
  
  const formattedWeight = Number.isInteger(displayWeight) 
    ? displayWeight.toString()
    : parseFloat(displayWeight.toFixed(2)).toString();
  
  return `${formattedWeight} ${displayUnit}`;
};

export default function ClientProductDetail({ product, randomProducts }: ClientProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImages, setCurrentImages] = useState(product?.images || []);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // State for category attributes selection
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [catalogAttributes, setCatalogAttributes] = useState<Record<string, CategoryAttribute>>({});
  
  const { addToCart, cart } = useCart();
  const router = useRouter();

  // Parse category attributes safely
  useEffect(() => {
    if (product && 'categoryAttributes' in product) {
      const attrs = (product as any).categoryAttributes;
      if (attrs && typeof attrs === 'object') {
        setCatalogAttributes(attrs as Record<string, CategoryAttribute>);
        
        // Set default selections for comma-separated values
        const initialOptions: Record<string, string> = {};
        Object.entries(attrs as Record<string, CategoryAttribute>).forEach(([key, attr]) => {
          if (attr.value && attr.value.includes(',')) {
            const options = attr.value.split(',').map(s => s.trim());
            initialOptions[key] = options[0];
          }
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [product]);

  // Set default variant on component mount
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
      setSelectedVariant(defaultVariant);
      
      if (defaultVariant.images && defaultVariant.images.length > 0) {
        setCurrentImages(defaultVariant.images);
      }
    }
  }, [product]);

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0);
    
    if (variant.images && variant.images.length > 0) {
      setCurrentImages(variant.images);
    } else {
      setCurrentImages(product?.images || []);
    }
  };

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleImageThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isScrollingUp = currentScrollY < lastScrollY;
      const isPastThreshold = currentScrollY > 100;
      const isNotAtBottom = currentScrollY < documentHeight - windowHeight - 100;
      
      setShowFloatingButton(isScrollingUp && isPastThreshold && isNotAtBottom);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleMobileAddToCart = async (quantity: number, variant: ProductVariant | null) => {
    if (!product) {
      alert('Product not found');
      return;
    }
    
    try {
      await addToCart(product, quantity, variant || undefined);
      return;
    } catch (error) {
      console.error('❌ Mobile - Error adding to cart:', error);
      throw error;
    }
  };

  const handleBuyNow = async () => {
    if (!product) {
      alert('Product not found');
      return;
    }
    
    try {
      const existingCartItem = cart.items.find(item => {
        if (item.product._id !== product._id) return false;
        
        if (selectedVariant) {
          return item.selectedVariant?.variantName === selectedVariant.variantName;
        } else {
          return !item.selectedVariant;
        }
      });
      
      if (!existingCartItem) {
        await addToCart(product, quantity, selectedVariant || undefined);
      }
      
      router.push('/checkout');
    } catch (error) {
      console.error('❌ Error in Buy Now:', error);
      alert('Failed to process Buy Now. Please try again.');
    }
  };

  const currentStock = selectedVariant ? selectedVariant.stock : (product?.stock || 0);
  const displayPrice = selectedVariant ? selectedVariant.price : (product?.basePrice || 0);
  const originalPrice = selectedVariant?.originalPrice || product?.originalPrice;
  const discountPercentage = originalPrice && displayPrice < originalPrice 
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) 
    : selectedVariant?.discountPercentage || product?.discountPercentage || 0;

  const groupedSpecifications = () => {
    if (!product?.specifications || !Array.isArray(product.specifications)) {
      return [];
    }

    const groups: { [key: string]: Array<{ key: string; value: string }> } = {};
    
    product.specifications.forEach(spec => {
      const category = 'Specifications';
      
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(spec);
    });
    
    return Object.entries(groups);
  };

  const specGroups = groupedSpecifications();

  if (!product) {
    return (
      <div className="min-h-screen bg-orange-400 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-black">Product not found</h1>
          <p className="text-gray-700 mt-2">The product you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductStructuredData product={product} selectedVariant={selectedVariant} />
      
      {/* Page Header */}
      <div className="bg-orange-400 border-b-2 border-orange-500  top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-black line-clamp-1">{product.name}</h1>
                <div className="flex items-center gap-2 text-xs text-black/70">
                  <span>Home</span>
                  <span>/</span>
                  <span>Products</span>
                  <span>/</span>
                  <span className="font-medium text-black">{product.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {product.hasOffer && (
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">HOT OFFER</span>
              )}
              {product.featured && (
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">FEATURED</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Main Product Card */}
          <div className="bg-white  overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Left Column - Images */}
              <div className="bg-white p-6 lg:p-8">
                <div className="relative w-full h-[400px] sm:h-[900px] mb-4 rounded-xl overflow-hidden bg-white shadow-inner">
                  {currentImages && currentImages.length > selectedImageIndex && currentImages[selectedImageIndex]?.image ? (
                    <>
                      {currentImages.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageThumbnailClick(Math.max(0, selectedImageIndex - 1))}
                            disabled={selectedImageIndex === 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg border border-orange-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleImageThumbnailClick(Math.min(currentImages.length - 1, selectedImageIndex + 1))}
                            disabled={selectedImageIndex === currentImages.length - 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg border border-orange-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}${currentImages[selectedImageIndex].image}`}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-orange-700">No image available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {currentImages && currentImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {currentImages.slice(0, 5).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageThumbnailClick(index)}
                        className={`
                          relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                          ${selectedImageIndex === index 
                            ? 'border-orange-600 ring-2 ring-orange-200 scale-105' 
                            : 'border-gray-200 hover:border-orange-400'
                          }
                        `}
                      >
                        {img.image ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}${img.image}`}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="p-6 lg:p-8 space-y-6">
                
                {/* Product Title & Meta */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
                    {product.name}
                    {selectedVariant && (
                      <span className="text-lg font-normal text-gray-600 ml-2">
                        - {selectedVariant.variantName}
                      </span>
                    )}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {product.seller && (
                      <span className="text-gray-600">
                        Sold by: <span className="font-medium text-black">{product.seller}</span>
                      </span>
                    )}
                    {product.sNo && (
                      <span className="text-gray-600">
                        SKU: <span className="font-medium text-black">#{product.sNo}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl lg:text-4xl font-bold text-black">
                      ₹{displayPrice.toLocaleString('en-IN')}
                    </span>
                    {originalPrice && originalPrice > displayPrice && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          {discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Tax included
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Shipping calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {currentStock > 0 ? (
                    <>
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium text-green-700">
                        In Stock ({currentStock} available)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-sm font-medium text-red-700">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Category Attributes as Selectable Options */}
                {Object.keys(catalogAttributes).length > 0 && (
                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Product Options
                    </h3>
        
                  </div>
                )}

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Available Packs
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => {
                        const weightDisplay = variant.weight && variant.weightUnit 
                          ? formatWeightDisplay(variant.weight, variant.weightUnit)
                          : '';
                        
                        return (
                          <button
                            key={variant._id || variant.variantName}
                            onClick={() => handleVariantSelect(variant)}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-medium transition-all
                              ${selectedVariant?.variantName === variant.variantName
                                ? 'bg-orange-600 text-white shadow-md ring-2 ring-orange-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                              }
                            `}
                          >
                            <div className="text-center">
                              <div className="font-medium">{variant.variantName}</div>
                              {weightDisplay && (
                                <div className="text-xs mt-0.5 opacity-80">{weightDisplay}</div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons - ALL IN ONE ROW */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors disabled:opacity-40"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                      <button
                        onClick={() => {
                          const maxStock = currentStock || 99;
                          setQuantity(prev => Math.min(maxStock, prev + 1))
                        }}
                        disabled={currentStock <= 0 || quantity >= (currentStock || 99)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors disabled:opacity-40"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex-1">
                      <AddToCartButton 
                        product={product} 
                        selectedVariant={selectedVariant || undefined}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                      />
                    </div>

                    {/* Buy Now Button */}
                    <button
                      onClick={handleBuyNow}
                      disabled={currentStock <= 0}
                      className={`
                        flex-1 h-10 mt-10 rounded-lg font-medium flex items-center justify-center gap-2
                        transition-all duration-300 shadow-sm
                        ${currentStock <= 0 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-black text-white hover:bg-gray-800 hover:shadow-md'
                        }
                      `}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Key Features */}
                {(selectedVariant?.features?.length || product.keyFeatures?.length) ? (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.keyFeatures?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-600 mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Description */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedVariant?.description || product.description}
                  </p>
                </div>

                {/* Specifications */}
                {specGroups.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {specGroups[0]?.[1].map((spec, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-500 block">{spec.key}</span>
                          <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">{product.rating}</span>
                      <div className="flex ml-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-orange-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{product.numberOfReviews} reviews</span>
                  </div>
                )}

         
              </div>
            </div>
          </div>

          {/* Related Products */}
          {randomProducts && randomProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-black mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {randomProducts.slice(0, 4).map((relatedProduct) => (
                  <ProductCard key={relatedProduct._id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Floating Button */}
        {product && (
          <MobileFloatingButton 
            product={product} 
            selectedVariant={selectedVariant}
            isVisible={showFloatingButton}
            onAddToCart={handleMobileAddToCart}
          />
        )}
      </div>
    </>
  );
}