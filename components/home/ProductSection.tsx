'use client';

import { useEffect, useState, useRef } from 'react';
import { Roboto_Flex } from 'next/font/google';
import Link from 'next/link';
import { Category } from '@/types/category';
import ProductGrid from '@/components/products/ProductGrid';
import { getAllProducts, fetchActiveCategories } from '@/lib/api';

const agbalumo = Roboto_Flex({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface ProductSectionProps {
  featuredCategories: Category[];
}

export default function ProductSection({ featuredCategories }: ProductSectionProps) {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<string[]>([]);
  const [checkingProducts, setCheckingProducts] = useState(true);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [totalProductCount, setTotalProductCount] = useState(0);
  
  useEffect(() => {
    fetchActiveCategories().then(data => {
      console.log("Categories from API:", data);
    });
  }, []);

  useEffect(() => {
    const checkCategoriesForProducts = async () => {
      try {
        setCheckingProducts(true);

        const response = await getAllProducts({});
        const products = response.data || [];

        const categoryIds = new Set<string>();
        const counts: Record<string, number> = {};

        products.forEach((p: any) => {
          const cat = typeof p.category === 'object'
            ? p.category._id
            : p.category;
          
          const catId = cat?.toString();
          if (catId) {
            categoryIds.add(catId);
            counts[catId] = (counts[catId] || 0) + 1;
          }
        });
        
        setTotalProductCount(products.length);
        console.log("Category IDs found in products:", Array.from(categoryIds));
        console.log("Featured Categories:", featuredCategories);
        setCategoriesWithProducts(Array.from(categoryIds));
        setProductCounts(counts);
      } catch (error) {
        console.error('Error checking categories:', error);
      } finally {
        setCheckingProducts(false);
      }
    };

    checkCategoriesForProducts();
  }, []);

  // Filter categories to only show those with products
  const visibleCategories = featuredCategories.filter(
    category => categoriesWithProducts.includes(category._id.toString())
  );

  if (checkingProducts) {
    return (
      <section className="py-16 md:py-20 bg-orange-400" aria-label="Loading Products">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px]">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <p className={`${agbalumo.className} mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 animate-pulse px-4 text-center drop-shadow-md`}>
              Loading amazing products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (visibleCategories.length === 0 && totalProductCount === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-orange-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className={`${agbalumo.className} text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 px-4 drop-shadow-md`}>
              No Products Available
            </h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg px-4 drop-shadow">
              We're working on bringing you amazing products. Please check back later!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-orange-400 relative overflow-hidden" aria-label="Explore Our Products">
      {/* Decorative circles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-white/40"></div>
              <span className={`${agbalumo.className} text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/80 drop-shadow`}>
                Discover
              </span>
              <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-white/40"></div>
            </div>
          </div>

          <h2 className={`${agbalumo.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 drop-shadow-lg`}>
            Our Products
          </h2>

          <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed px-3 sm:px-4 drop-shadow">
            Discover our handpicked collection of premium quality cups and bags, 
            designed to complement your lifestyle
          </p>

          <div className="flex justify-center mt-4 sm:mt-5 md:mt-6">
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Single Products Section */}
        <div className="animate-fade-in-up">
          {/* Section Header with View All Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 gap-4">
            <div className="text-left">
              <h3
                className={`${agbalumo.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-3 px-3 sm:px-0 drop-shadow-lg`}
              >
                Our Products
              </h3>
           
            </div>
            
            {totalProductCount > 6 && (
              <Link href="/products" className="group px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl mx-3 sm:mx-0">
                <span className="text-sm sm:text-base font-medium">View All Products</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Product Grid - Shows up to 6 products */}
          <div className="backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8">
            <ProductGrid 
              limit={6}
              hideFilters={true}
              useCarousel={false}
            />
          </div>

          {/* Mobile View All Button (visible when screen is smaller and button not shown in header) */}
          {totalProductCount > 6 && (
            <div className="mt-8 sm:mt-10 md:mt-12 text-center sm:hidden">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 shadow-lg"
              >
                <span className="text-sm font-medium">Browse All Products</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}