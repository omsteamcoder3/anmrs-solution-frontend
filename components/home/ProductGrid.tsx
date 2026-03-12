'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/api';
import ProductCard from '../ui/ProductCard';
import Link from 'next/link';

interface ProductGridProps {
  limit?: number; // Add limit prop
  showViewAll?: boolean; // Add showViewAll prop to control the button visibility
}

export default function ProductGrid({ limit, showViewAll = true }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        
        // Apply limit if provided, otherwise show all products
        const displayedProducts = limit ? data.slice(0, limit) : data;
        setProducts(displayedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [limit]); // Add limit to dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-16 md:py-20 bg-white">
        <div className="flex flex-col items-center gap-3 sm:gap-4 px-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-b-2 border-[#556B2F]"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center">Loading premium products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 bg-white">
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md mx-auto border border-gray-200 shadow-lg">
          <p className="text-red-600 text-base sm:text-lg mb-3 sm:mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

return (
  <section className="py-12 sm:py-16 md:py-20 bg-white">
    <div className="container mx-auto px-3 sm:px-4">
      
      {products.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20">
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-md mx-auto border border-gray-200 shadow-lg">
            <p className="text-gray-600 text-base sm:text-lg mb-2">No products available</p>
            <p className="text-gray-500 text-sm sm:text-base">Check back soon for new arrivals</p>
          </div>
        </div>
      ) : (
        <>
          {/* Single Row Product Grid - Mobile Optimized */}
          <div className="flex justify-center items-start mb-10 sm:mb-12 md:mb-16 overflow-x-auto pb-4 sm:pb-0">
            <div className={`flex justify-center items-stretch gap-4 sm:gap-6 md:gap-8 min-w-full ${
              products.length === 1 ? 'justify-center' : ''
            }`}>
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="flex-shrink-0"
                  style={{ 
                    width: `calc(${100 / Math.max(products.length, 1)}% - ${products.length > 1 ? '1rem' : '0rem'})`,
                    maxWidth: products.length === 1 ? '280px' : products.length === 2 ? '220px' : '200px',
                    minWidth: products.length === 1 ? '220px' : '160px'
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced View All Button */}
          {showViewAll && (
            <div className="text-center">
              <Link 
                href="/products"
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-blue-400 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden inline-flex items-center gap-2 sm:gap-3 hover:from-blue-600 hover:to-purple-700"
              >
                <span className="relative">Explore Full Collection</span>
                <svg 
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                
                <div className="absolute inset-0 -inset-x-32 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>

 
  </section>
);
}