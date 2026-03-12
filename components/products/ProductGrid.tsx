'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { getAllProducts } from '@/lib/productService';
import { fetchActiveCategories } from '@/lib/categoryService';
import ProductCard from '../ui/ProductCard';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';

interface ProductGridProps {
  category?: string;
  search?: string;
  limit?: number;
  hideFilters?: boolean;
}

// Define the filter state interface
interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
}

// Define the query parameters interface
interface QueryParams {
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export default function ProductGrid({ category, search, limit, hideFilters = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const mobileFiltersRef = useRef<HTMLDivElement>(null);
  
  // Determine if this is the home page (hideFilters is true and limit is not specified)
  const isHomePage = hideFilters && limit === undefined;
  
  // Filter state with proper typing
  const [filters, setFilters] = useState<FilterState>({
    category: category || '',
    priceRange: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: search || ''
  });

  // Sticky filter bar effect - only if filters are visible
  useEffect(() => {
    if (hideFilters) return;

    const handleScroll = () => {
      if (filterBarRef.current) {
        const filterBarTop = filterBarRef.current.getBoundingClientRect().top;
        setIsSticky(filterBarTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideFilters]);

  // Close mobile filters when clicking outside - only if filters are visible
  useEffect(() => {
    if (hideFilters) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileFiltersRef.current && !mobileFiltersRef.current.contains(event.target as Node)) {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideFilters]);

  // Wrap loadFilteredProducts in useCallback to memoize it
  const loadFilteredProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      let productsData;

      console.log('🔄 Current filters:', filters);
      console.log('📦 Loading products with category:', filters.category);
      
      const hasPriceFilter = filters.priceRange;
      
      // Use properly typed query parameters
      const queryParams: QueryParams = {};
      
      // Only add category to query if it's not empty
      if (filters.category) {
        queryParams.category = filters.category;
        console.log('🎯 Filtering by category:', filters.category);
      } else {
        console.log('🎯 Showing ALL products (no category filter)');
      }
      
      if (filters.search) queryParams.search = filters.search;
      if (filters.sortBy) queryParams.sortBy = filters.sortBy;
      if (filters.sortOrder) queryParams.sortOrder = filters.sortOrder;
      
      console.log('🚀 Sending to API:', queryParams);
      
      const response = await getAllProducts(queryParams);
      productsData = response.data;
      
      console.log('📦 API Response count:', productsData?.length);

      // Apply price filtering on frontend
      if (hasPriceFilter && productsData) {
        console.log('💰 Applying price filter on frontend:', filters.priceRange);
        const filtered = productsData.filter(product => {
          // ✅ CHANGED: Use product.basePrice instead of product.price
          const price = product.basePrice;
          switch (filters.priceRange) {
            case '100-200':
              return price >= 100 && price <= 200;
            case '200-300':
              return price >= 200 && price <= 300;
            case '300-400':
              return price >= 300 && price <= 400;
            case '400-500':
              return price >= 400 && price <= 500;
            case '500-600':
              return price >= 500 && price <= 600;
            case 'above-600':
              return price > 600;
            default:
              return true;
          }
        });
        console.log('💰 After price filtering:', filtered.length);
        productsData = filtered;
      }

      // APPLY LIMIT - Always 12 for home page, otherwise use limit prop
      const finalLimit = isHomePage ? 8 : limit;
      if (finalLimit && productsData) {
        console.log(`🎯 Applying limit: ${finalLimit} products`);
        productsData = productsData.slice(0, finalLimit);
      }

      console.log('✅ Final products:', productsData?.length);
      setProducts(productsData || []);
    } catch (err) {
      console.error('❌ Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [filters, limit, isHomePage]); // Add dependencies for useCallback

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load categories
        const categoriesData = await fetchActiveCategories();
        setCategories(categoriesData);

        // Load products based on filters
        await loadFilteredProducts();
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [loadFilteredProducts]); // Add loadFilteredProducts as dependency

  // Update filters when category prop changes
useEffect(() => {
  console.log('🔄 Category prop changed:', category);

  setFilters(prev => {
    const updated = {
      ...prev,
      category: category || ''
    };

    return updated;
  });

}, [category]);
  // Update filters when search prop changes
  useEffect(() => {
    if (search !== undefined) {
      setFilters(prev => ({
        ...prev,
        search: search || ''
      }));
    }
  }, [search]);

  // Reload products when filters change
useEffect(() => {
  if (categories.length === 0) return;

  console.log('🔄 Filters changed, reloading products:', filters);

  loadFilteredProducts();

}, [filters.category, filters.priceRange, filters.search, filters.sortBy, filters.sortOrder]);
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder
    }));
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: ''
    });
  };

  // Count active filters for badge - only if filters are visible
  const activeFilterCount = hideFilters ? 0 : [
    filters.category ? 1 : 0,
    filters.priceRange ? 1 : 0,
    filters.search ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12 font-sans bg-orange-400/10 rounded-2xl">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12 px-4 font-sans bg-orange-400/10 rounded-2xl">
        <p className="text-red-600 text-base sm:text-lg bg-white/90 backdrop-blur-sm inline-block px-4 py-2 rounded-lg shadow-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 sm:mt-4 bg-white text-orange-500 px-4 sm:px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors text-sm sm:text-base font-medium shadow-lg hover:shadow-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-orange-400/10 rounded-3xl backdrop-blur-sm">
      {/* Container with increased width - removed side margins on larger screens */}
      <div className="mx-3 xs:mx-4 sm:mx-6 md:mx-8 lg:mx-8 xl:mx-12 2xl:mx-16 py-6 sm:py-8">
        
        {/* CONDITIONAL RENDERING: Only show filters if hideFilters is false */}
        {/* removed section filter*/}

        {/* Products Grid - Fixed 2 columns on mobile */}
        {products.length === 0 ? (
          <div className="text-center py-8 sm:py-12 font-sans">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 max-w-md mx-auto">
              <svg className="w-16 h-16 text-orange-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Try adjusting your filters to see more results.
              </p>
              <button 
                onClick={clearAllFilters}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all duration-200 text-sm shadow-lg hover:shadow-orange-500/25"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
            {products.map((product) => (
              <div key={product._id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}