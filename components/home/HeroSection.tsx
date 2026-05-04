"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

// Define Category type matching your database structure
interface Category {
  name: string;
  slug: string;
  description: string;
}

export default function HeroSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const sectionRef = useRef(null);

  // Welcome slide content
  const welcomeContent = {
    title: "Welcome to ANMRS",
    subtitle: "IT Solutions",
    description: "Your trusted partner for innovative IT solutions, custom software development, and digital transformation services."
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use environment variable with fallback
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL 
        const url = `${API_URL}/api/categories`;
        
        console.log('Fetching from:', url); // Debug log
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Check if response is OK
        if (!response.ok) {
          console.error('Response not OK:', response.status, response.statusText);
          setCategories([]);
          return;
        }

        // Check content type to ensure it's JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Invalid content type:', contentType);
          setCategories([]);
          return;
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const formattedCategories = result.data.map((cat: any) => ({
            name: cat.name,
            slug: cat.slug,
            description: cat.description
          }));

          setCategories(formattedCategories);
        } else {
          console.error('Invalid API response:', result);
          setCategories([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show welcome slide for 10 seconds, then start category rotation
  useEffect(() => {
    if (categories.length === 0) return;
    
    // Show welcome slide for 10 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => clearTimeout(welcomeTimer);
  }, [categories.length]);

  // Auto-rotate categories - only after welcome slide ends
  useEffect(() => {
    if (categories.length === 0) return;
    if (showWelcome) return; // Don't rotate during welcome slide
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length, showWelcome]);

  const currentCategory = categories[currentIndex];

  return (
    <section ref={sectionRef} className="relative min-h-[300px] lg:min-h-[900px] xl:min-h-[900px] w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover opacity-80"
          priority
          quality={100}
        />
      </div>

      {/* Large Template Style Number "ANMRS" */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-10 bottom-32 hidden lg:block font-black text-white/10 lg:text-[18rem] leading-none select-none z-10"
      >
        ANMRS
      </motion.div>

      {/* Main Content - Perfectly Centered */}
      <div className="relative h-full w-full mx-auto max-w-7xl px-4 z-20">
        {/* Grid container that takes full height */}
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left Content - Vertically centered automatically by grid items-center */}
          <div className="py-12 md:py-16 lg:py-20">
            {/* Welcome Slide */}
            {!loading && showWelcome && (
              <div className="space-y-4 sm:space-y-5 md:space-y-7 lg:space-y-9">
                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] font-black uppercase leading-[1.1] tracking-tighter text-white"
                >
                  Welcome to <br />
                  <motion.span 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-orange-400 inline-block"
                  >
                    ANMRS
                  </motion.span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
<p className="text-left max-w-[70%] sm:max-w-xl text-[8px] xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed text-gray-200">
  {welcomeContent.description}
</p>
                  
                  {/* Progress bar for welcome slide */}
                  <div className="flex gap-2 mt-6 md:mt-8">
                    <div className="h-1.5 md:h-2 rounded-full bg-orange-400 w-full max-w-[200px] relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-white/50"
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 10, ease: "linear" }}
                        style={{ originX: 0 }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-4 pt-2 sm:pt-5 mb-4"
                >
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center gap-1.5 bg-white
                    px-2 py-1
                    sm:px-6 sm:py-3
                    md:px-7 md:py-3.5
                    lg:px-8 lg:py-4
                    text-[10px] sm:text-base md:text-lg
                    font-black uppercase tracking-wider text-black
                    transition-all hover:bg-orange-400 hover:text-white whitespace-nowrap"
                  >
                    GET QUOTE

                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </motion.div>
                  </Link>

                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-1.5 border border-white/30
                    px-2 py-1
                    sm:px-6 sm:py-3
                    md:px-7 md:py-3.5
                    lg:px-8 lg:py-4
                    text-[10px] sm:text-base md:text-lg
                    font-black uppercase tracking-wider text-white
                    backdrop-blur-sm transition-all hover:bg-white/10 whitespace-nowrap"
                  >
                    VIEW PRODUCTS
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Category Slides - Only show after welcome slide ends */}
            {!loading && !showWelcome && categories.length > 0 && currentCategory && (
              <div className="space-y-4 sm:space-y-5 md:space-y-7 lg:space-y-9">
                <motion.h1 
                  key={`title-${currentCategory.slug}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] font-black uppercase leading-[1.1] tracking-tighter text-white"
                >
                  {currentCategory.name.split(' ')[0]} <br />
                  <motion.span 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-orange-400 inline-block"
                  >
                    {currentCategory.name.split(' ').slice(1).join(' ') || currentCategory.name}
                  </motion.span>
                </motion.h1>

                <motion.div
                  key={`desc-${currentCategory.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
<p className="text-left max-w-[70%] sm:max-w-xl text-[8px] xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed text-gray-200">
                    {currentCategory.description}
                  </p>
                  
                  {/* Carousel Indicators */}
                  {categories.length > 1 && (
                    <div className="flex gap-2 mt-6 md:mt-8">
                      {categories.map((category, index) => (
                        <button
                          key={category.slug}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-1.5 md:h-2 rounded-full transition-all ${
                            index === currentIndex 
                              ? 'w-8 md:w-12 bg-orange-400' 
                              : 'w-4 md:w-6 bg-white/30 hover:bg-white/50'
                          }`}
                          aria-label={`Go to ${category.name}`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-4 pt-2 sm:pt-5 mb-4"
                >
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center gap-1.5 bg-white
                    px-2 py-1
                    sm:px-6 sm:py-3
                    md:px-7 md:py-3.5
                    lg:px-8 lg:py-4
                    text-[10px] sm:text-base md:text-lg
                    font-black uppercase tracking-wider text-black
                    transition-all hover:bg-orange-400 hover:text-white whitespace-nowrap"
                  >
                    GET QUOTE

                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </motion.div>
                  </Link>

                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-1.5 border border-white/30
                    px-2 py-1
                    sm:px-6 sm:py-3
                    md:px-7 md:py-3.5
                    lg:px-8 lg:py-4
                    text-[10px] sm:text-base md:text-lg
                    font-black uppercase tracking-wider text-white
                    backdrop-blur-sm transition-all hover:bg-white/10 whitespace-nowrap"
                  >
                    VIEW PRODUCTS
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Right Content - Empty but maintains grid structure */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Animated decorative elements with glass morphism */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-40 right-20 h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full bg-orange-500/30 backdrop-blur-xl -z-10"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute left-20 top-40 h-96 w-96 md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem] rounded-full bg-orange-600/25 backdrop-blur-xl -z-10"
      />

  {/* Bottom Ticker with Categories - Only show if categories exist */}
{categories.length > 0 && !showWelcome && (
  <div className="absolute w-full bottom-0 left-0 right-0 overflow-hidden border-t border-orange-400/30 bg-orange-500/20 backdrop-blur-md py-3 sm:py-4 md:py-5 z-30">
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex whitespace-nowrap"
    >
      {[...categories, ...categories, ...categories].map((category, index) => (
        <Link 
          key={`${category.slug}-${index}`} 
          href={`/categories/${category.slug}`}
          className="flex items-center mx-4 sm:mx-6 md:mx-8 hover:opacity-80 transition-opacity group"
        >
          <span className="flex items-center gap-2 text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg">
            {category.name}
          </span>
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ml-4">
            <Image
              src="/images/user.webp"
              alt="User"
              fill
              className="object-contain "
            />
          </div>
        </Link>
      ))}
    </motion.div>
  </div>
)}
    </section>
  );
}