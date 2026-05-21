'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { quickSearchProducts } from '@/lib/productService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Roboto_Flex} from 'next/font/google';
import { ArrowRight, ShoppingCart, User, Search, Menu, X, Home, Info, Mail, Package, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const markoOne = Roboto_Flex({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface SearchProduct {
  _id: string;
  name: string;
  slug: string;
  basePrice: number;
  image: string | null;
  category: string;
  featured: boolean;
}

interface HeaderClientProps {
  initialCategories: Category[];
  initialSiteSettings: {
    siteNameMain: string;
    siteNameTagline: string;
  };
}

export default function HeaderClient({ initialCategories, initialSiteSettings }: HeaderClientProps) {
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const categoriesWithProducts = initialCategories;
  const [siteNameMain] = useState(initialSiteSettings.siteNameMain);
  const [siteNameTagline] = useState(initialSiteSettings.siteNameTagline);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Scroll behavior for footer
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shopDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll behavior for footer
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setIsFooterVisible(true);
      setIsHeaderVisible(false);
    }

    // scrolling up
    else {
      setIsFooterVisible(false);
      setIsHeaderVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  let ticking = false;

  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}, [lastScrollY]);
  // Search functionality
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await quickSearchProducts(searchQuery, 5);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleProductClick = (product: SearchProduct) => {
    router.push(`/products/${product.slug}`);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Get first 2 categories from filtered list to show in header
  const getFirstTwoCategories = () => {
    return categoriesWithProducts.slice(0, 2);
  };

  // Get remaining categories for shop dropdown (after first 2)
  const getRemainingCategories = () => {
    return categoriesWithProducts.slice(2);
  };

  const firstTwoCategories = getFirstTwoCategories();
  const remainingCategories = getRemainingCategories();
  
  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
      
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setShowShopDropdown(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showSearch) {
          setShowSearch(false);
          setSearchQuery('');
          setSearchResults([]);
        }
        if (showShopDropdown) {
          setShowShopDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showSearch, showShopDropdown, isMobileMenuOpen]);

  // Calculate cart items count safely
  const getCartItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const cartItemsCount = getCartItemCount();

  if (!mounted) return null;

  return (
    <>
      {/* Main Header - Black background with orange accents */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <header
  className={`
    bg-black shadow-lg shadow-black/50 border-b border-white/10 w-full
    transition-transform duration-300 ease-in-out
    ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
  `}
>
          <div className="container mx-auto px-2 sm:px-3 lg:px-4 max-w-full">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 w-full">
              {/* Logo - Left side */}
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
                <div className="relative flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    priority
                    className="w-30 h-30 sm:w-50 sm:h-50   object-contain"
                  />
                </div>
               
              </Link>

           {/* Desktop Navigation - Hidden on mobile/tablet */}
<nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
  <Link 
    href="/" 
    className={`text-white hover:text-orange-400 transition-all duration-300 font-black ${markoOne.className} px-3 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-orange-400/50 text-sm 2xl:text-base uppercase tracking-wider cursor-pointer whitespace-nowrap`}
  >
    Home
  </Link>
  
  {/* Single Categories Dropdown Button */}
  <div ref={shopDropdownRef} className="relative">
    <button
      onClick={() => setShowShopDropdown(!showShopDropdown)}
      className={`flex items-center space-x-1 text-white hover:text-orange-400 transition-all duration-300 font-black ${markoOne.className} px-3 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-orange-400/50 text-sm 2xl:text-base uppercase tracking-wider cursor-pointer whitespace-nowrap`}
    >
      <span>Categories</span>
      <svg
        className={`w-3 h-3 transition-transform duration-300 ${showShopDropdown ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {/* Categories Dropdown Menu */}
    {showShopDropdown && (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-2 w-56 bg-black rounded-lg shadow-2xl py-2 z-50 border border-white/10"
      >
        <div className="px-3 py-2 border-b border-white/10">
          <p className="text-orange-400 font-black text-xs uppercase tracking-wider">All Categories</p>
        </div>
        
        {/* All Categories */}
        {categoriesWithProducts.map((category) => (
          <Link
            key={category._id}
            href={`/products?category=${category.slug}`}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 cursor-pointer border-l-2 border-transparent hover:border-orange-400"
            onClick={() => setShowShopDropdown(false)}
          >
            <Package className="w-3 h-3 text-orange-400/70 flex-shrink-0" />
            <span className="font-medium truncate">{category.name}</span>
          </Link>
        ))}
        
        {/* Divider */}
        <div className="border-t border-white/10 my-1"></div>
        
        {/* View All Products Link */}
        <Link
          href="/products"
          className="flex items-center space-x-2 px-3 py-2 text-sm text-orange-400 hover:text-white hover:bg-orange-400 transition-all duration-300 cursor-pointer group"
          onClick={() => setShowShopDropdown(false)}
        >
          <Tag className="w-3 h-3 flex-shrink-0" />
          <span className="font-black uppercase tracking-wider truncate">All Products</span>
          <ArrowRight className="w-3 h-3 ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    )}
  </div>
  
  <Link 
    href="/about" 
    className={`text-white hover:text-orange-400 transition-all duration-300 font-black ${markoOne.className} px-3 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-orange-400/50 text-sm 2xl:text-base uppercase tracking-wider cursor-pointer whitespace-nowrap`}
  >
    About us
  </Link>
  
  <Link 
    href="/contact" 
    className={`text-white hover:text-orange-400 transition-all duration-300 font-black ${markoOne.className} px-3 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-orange-400/50 text-sm 2xl:text-base uppercase tracking-wider cursor-pointer whitespace-nowrap`}
  >
    Contact us
  </Link>
</nav>

              {/* Actions and Mobile Menu Button - Right side */}
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
                {/* Search Component */}
                <div ref={searchContainerRef} className="relative flex items-center">
                  {showSearch ? (
<div className="fixed inset-0 lg:relative lg:inset-auto z-50 flex items-start lg:items-center justify-center lg:block pt-16 lg:pt-0 px-3">                      {/* Mobile Full-Screen Search */}
                      <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-xl pt-16">
                        <div className="container mx-auto px-3">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex-1 flex items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10 focus-within:border-orange-400/50 transition-colors">
                              <Search className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="flex-1 bg-transparent text-white focus:outline-none text-sm placeholder-white/40 w-full min-w-0"
                                autoFocus
                              />
                              {searchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setSearchQuery('')}
                                  className="ml-1 p-1 text-white/60 hover:text-orange-400 rounded-full hover:bg-white/10 flex-shrink-0"
                                  aria-label="Clear search"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            
                            <button
                              type="submit"
                              onClick={handleSearchSubmit}
                              className="p-2 bg-orange-400 hover:bg-orange-500 text-black  rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-orange-400/25 flex-shrink-0"
                              aria-label="Search"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                                setSearchResults([]);
                              }}
                              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 flex-shrink-0"
                              aria-label="Close search"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Search Results Dropdown - MOBILE */}
                          {(searchResults.length > 0 || isSearching) && (
                            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl max-h-[50vh] overflow-y-auto">
                              {isSearching ? (
                                <div className="p-4 text-center">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400 mx-auto"></div>
                                  <p className="mt-2 text-xs text-white/60">Searching...</p>
                                </div>
                              ) : (
                                <>
                                  <div className="p-2">
                                    <p className="text-xs text-orange-400 font-black uppercase tracking-wider px-2 py-1">Results</p>
                                    {searchResults.map((product) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-orange-400/50"
                                        onClick={() => handleProductClick(product)}
                                      >
                                        <div className="w-10 h-10 bg-white/5 rounded flex-shrink-0 overflow-hidden border border-white/10 relative group-hover:border-orange-400/50 transition-colors">
                                          {product.image ? (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                                              className="w-full h-full object-cover"
                                              alt={product.name}
                                              fill
                                              sizes="40px"
                                            />
                                          ) : (
                                            <div className="w-full h-full bg-black flex items-center justify-center">
                                              <Package className="w-4 h-4 text-white/20" />
                                            </div>
                                          )}
                                        </div>
                                        <div className="ml-2 flex-1 min-w-0">
                                          <p className="text-sm font-black text-white group-hover:text-orange-400 truncate uppercase tracking-wider">{product.name}</p>
                                          <div className="flex items-center justify-between mt-0.5">
                                            <p className="text-xs text-white/40 truncate">{product.category}</p>
                                            <p className="text-orange-400 font-black text-xs flex-shrink-0 ml-1">₹{product.basePrice}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    className="border-t border-white/10 p-3 bg-white/5 hover:bg-orange-400 cursor-pointer text-center group transition-colors"
                                    onClick={handleViewAllResults}
                                  >
                                    <p className="text-xs font-black text-white group-hover:text-black uppercase tracking-wider flex items-center justify-center gap-1">
                                      <span className="truncate max-w-[150px]">"{searchQuery}"</span>
                                      <ArrowRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Desktop Search Container */}
<div className="hidden lg:block absolute top-0 lg:relative w-full max-w-[90vw] sm:max-w-[350px] md:max-w-[400px] lg:w-80 2xl:w-96 mx-auto lg:mx-0">                        <div className="bg-black/90 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 p-1.5">
                          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
                            <div className="flex-1 flex items-center bg-white/5 rounded-md px-3 py-1.5 border border-white/10 focus-within:border-orange-400/50 transition-colors">
                              <Search className="w-3.5 h-3.5 text-orange-400 mr-1.5 flex-shrink-0" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="flex-1 bg-transparent text-white focus:outline-none text-sm placeholder-white/40 w-full min-w-0"
                                autoFocus
                              />
                              {searchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setSearchQuery('')}
                                  className="ml-1 p-0.5 text-white/40 hover:text-orange-400 rounded-full hover:bg-white/10 flex-shrink-0"
                                  aria-label="Clear search"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          
                            <button
                              type="submit"
                              className="p-1.5 bg-orange-400 hover:bg-orange-500 text-black  rounded-md transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-orange-400/25 flex-shrink-0"
                              aria-label="Search"
                            >
                              <Search className="w-3.5 h-3.5" />
                            </button>
                          </form>

                          {/* Search Results Dropdown - DESKTOP */}
                          {(searchResults.length > 0 || isSearching) && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                              {isSearching ? (
                                <div className="p-3 text-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-400 mx-auto"></div>
                                  <p className="mt-1 text-xs text-white/60">Searching...</p>
                                </div>
                              ) : (
                                <>
                                  <div className="p-1">
                                    <p className="text-xs text-orange-400 font-black uppercase tracking-wider px-2 py-1">Results</p>
                                    {searchResults.map((product) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center p-1.5 hover:bg-white/10 rounded cursor-pointer transition-colors group border border-transparent hover:border-orange-400/50"
                                        onClick={() => handleProductClick(product)}
                                      >
                                        <div className="w-8 h-8 bg-white/5 rounded flex-shrink-0 overflow-hidden border border-white/10 relative group-hover:border-orange-400/50 transition-colors">
                                          {product.image ? (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                                              className="w-full h-full object-cover"
                                              alt={product.name}
                                              fill
                                              sizes="32px"
                                            />
                                          ) : (
                                            <div className="w-full h-full bg-black flex items-center justify-center">
                                              <Package className="w-4 h-4 text-white/20" />
                                            </div>
                                          )}
                                        </div>
                                        <div className="ml-2 flex-1 min-w-0">
                                          <p className="text-xs font-black text-white group-hover:text-orange-400 truncate uppercase tracking-wider">{product.name}</p>
                                          <div className="flex items-center justify-between mt-0.5">
                                            <p className="text-xs text-white/40 truncate">{product.category}</p>
                                            <p className="text-orange-400 font-black text-xs flex-shrink-0 ml-1">₹{product.basePrice}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    className="border-t border-white/10 p-2 bg-white/5 hover:bg-orange-400 cursor-pointer text-center group transition-colors"
                                    onClick={handleViewAllResults}
                                  >
                                    <p className="text-xs font-black text-white group-hover:text-black uppercase tracking-wider flex items-center justify-center gap-1">
                                      <span className="truncate max-w-[120px]">"{searchQuery}"</span>
                                      <ArrowRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSearchClick}
                      className="p-2 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 rounded-lg border border-transparent hover:border-orange-400/50 cursor-pointer"
                      aria-label="Open search"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
                
                {/* Cart Button */}
                <Link 
                  href="/cart"
                  className="p-2 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 rounded-lg border border-transparent hover:border-orange-400/50 relative group cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-black bg-orange-400 border border-black shadow-lg">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </Link>
                
                {/* User Section - Desktop only */}
                <div className="hidden md:block">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-orange-400 transition-all duration-300 hover:bg-white/10 rounded-lg p-1.5 border border-transparent hover:border-orange-400/50 cursor-pointer"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-400 rounded-full flex items-center justify-center text-black font-black text-xs sm:text-sm shadow-lg border border-white/20">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="hidden lg:block text-white font-black text-sm tracking-wider truncate max-w-[80px]">
                          {user.name || user.email?.split('@')[0]}
                        </span>
                        <svg
                          className={`hidden lg:block w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {showDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-2xl py-2 z-50 border border-white/10"
                        >
                          <div className="px-3 py-2 border-b border-white/10">
                            <p className="text-orange-400 font-black text-xs uppercase tracking-wider truncate">{user.name || user.email}</p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 cursor-pointer border-l-2 border-transparent hover:border-orange-400"
                            onClick={() => setShowDropdown(false)}
                          >
                            <User className="w-3.5 h-3.5 text-orange-400/70 flex-shrink-0" />
                            <span className="font-medium">My Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-white hover:text-red-400 hover:bg-white/10 transition-all duration-300 rounded-b-lg cursor-pointer border-l-2 border-transparent hover:border-red-400"
                          >
                            <svg className="w-3.5 h-3.5 text-red-400/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Link
                        href="/signup"
                        className="bg-orange-400 text-black px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-orange-500 transition-all duration-300 font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-orange-400/25 border border-orange-400/50 whitespace-nowrap cursor-pointer"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/login"
                        className="bg-white/10 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-black text-xs uppercase tracking-wider border border-white/10 hover:border-orange-400/50 whitespace-nowrap cursor-pointer"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile User Icon - Mobile only */}
                <div className="md:hidden">
                  {user ? (
                    <Link href="/profile" className="block">
                      <div className="w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center text-black font-black text-xs shadow-lg border border-white/20">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="p-1.5 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 rounded-lg border border-transparent hover:border-orange-400/50 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Burger Menu Button - Moved to far right */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-white hover:text-orange-400 transition-all duration-300 hover:bg-white/10 rounded-lg cursor-pointer border border-transparent hover:border-orange-400/50 ml-auto"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
          
          </div>
        </header>
          {isMobileMenuOpen && (
              <div ref={mobileMenuRef} className="lg:hidden fixed inset-0 z-50">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="absolute top-0 right-0 h-full w-72 bg-black border-l border-white/10 shadow-2xl"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <span className="text-lg font-black text-white">
                        Menu
                      </span>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 rounded-lg border border-transparent hover:border-orange-400/50 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 p-3 overflow-y-auto">
                      <div className="space-y-1">
                        <Link 
                          href="/" 
                          className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-black p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm uppercase tracking-wider cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Home className="w-4 h-4 text-orange-400/70 flex-shrink-0" />
                          <span>Home</span>
                        </Link>
                        
                        {/* Special Offers in Mobile Menu */}
                        <Link 
                          href="/offers" 
                          className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-black p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm uppercase tracking-wider cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Tag className="w-4 h-4 text-orange-400/70 flex-shrink-0" />
                          <span className="text-orange-400">Special Offers</span>
                        </Link>
                        
                        {/* All Categories in Mobile Menu */}
                        <div className="pl-2 mt-2">
                          <p className="text-xs text-orange-400 font-black uppercase tracking-wider px-3 py-2">Categories</p>
                          {categoriesWithProducts.map((category) => (
                            <Link
                              key={category._id}
                              href={`/products?category=${category.slug}`}
                              className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm ml-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Package className="w-3.5 h-3.5 text-orange-400/70 flex-shrink-0" />
                              <span className="truncate">{category.name}</span>
                            </Link>
                          ))}
                        </div>
                        
                        <Link 
                          href="/products" 
                          className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-black p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm uppercase tracking-wider cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 text-orange-400/70 flex-shrink-0" />
                          <span>All Products</span>
                        </Link>
                        
                        <Link 
                          href="/about" 
                          className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-black p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm uppercase tracking-wider cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Info className="w-4 h-4 text-orange-400/70 flex-shrink-0" />
                          <span>About us</span>
                        </Link>
                        
                        <Link 
                          href="/contact" 
                          className="flex items-center space-x-3 text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-300 font-black p-3 rounded-lg border border-transparent hover:border-orange-400/50 text-sm uppercase tracking-wider cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Mail className="w-4 h-4 text-orange-400/70 flex-shrink-0" />
                          <span>Contact us</span>
                        </Link>
                      </div>
                    </nav>

                    {/* Mobile Footer Actions */}
                    <div className="p-4 border-t border-white/10">
                      {user ? (
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center text-black font-black text-base border border-white/20 shadow-lg flex-shrink-0">
                            {user.email?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-black text-sm uppercase tracking-wider truncate">{user.name || user.email}</p>
                            <p className="text-orange-400/70 text-xs mt-0.5">View Profile</p>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex space-x-2">
                          <Link
                            href="/login"
                            className="flex-1 text-center bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 text-xs font-black uppercase tracking-wider border border-white/10 hover:border-orange-400/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            href="/signup"
                            className="flex-1 text-center bg-orange-400 text-black py-2.5 rounded-lg hover:bg-orange-500 transition-all duration-300 text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-orange-400/25 border border-orange-400/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
      </div>

      {/* Bottom Navigation Footer */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-40
        transition-transform duration-300 ease-in-out
        ${isFooterVisible ? 'translate-y-0' : 'translate-y-full'}
        lg:hidden
      `}>
        <div className="container mx-auto px-1">
          <div className="flex items-center justify-between h-14">
            {/* Home */}
            <Link 
              href="/" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-orange-400 transition-all duration-300 cursor-pointer min-w-0 group"
              onClick={() => setIsFooterVisible(false)}
            >
              <Home className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center">Home</span>
            </Link>

            {/* Search */}
            <button 
              onClick={handleSearchClick}
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-orange-400 transition-all duration-300 cursor-pointer min-w-0 group"
            >
              <Search className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center">Search</span>
            </button>

            {/* Special Offers */}
            <Link 
              href="/offers" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-orange-400 transition-all duration-300 cursor-pointer min-w-0 relative group"
              onClick={() => setIsFooterVisible(false)}
            >
              <div className="relative">
                <Tag className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center text-orange-400">Offers</span>
            </Link>

            {/* Products */}
            <Link 
              href="/products" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-orange-400 transition-all duration-300 cursor-pointer min-w-0 group"
              onClick={() => setIsFooterVisible(false)}
            >
              <Package className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center">Products</span>
            </Link>

            {/* Cart */}
            <Link 
              href="/cart"
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-orange-400 transition-all duration-300 relative cursor-pointer min-w-0 group"
              onClick={() => setIsFooterVisible(false)}
            >
              <ShoppingCart className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 right-3 bg-orange-400 text-black text-[7px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-black border border-black">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
              <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}