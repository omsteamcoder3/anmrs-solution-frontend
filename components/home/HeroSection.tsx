"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Define Category type matching your database structure
interface Category {
  name: string;
  slug: string;
  description: string;
}

// Define Client type matching your database structure
interface Client {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageSize: number;
}

export default function HeroSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const sectionRef = useRef(null);
  
  // For infinite seamless ticker - EXACT same logic as HowItWorksSection
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Welcome slide content
  const welcomeContent = {
    title: "Welcome to ANMRS",
    subtitle: "IT Solutions",
    description: "Your trusted partner for innovative IT solutions, custom software development, and digital transformation services."
  };

  // Get client item width for consistent scrolling
  const getClientItemWidth = useCallback(() => {
    if (typeof window === 'undefined') return 200;
    const width = window.innerWidth;
    // Responsive widths for client items
    if (width < 480) return 140;
    if (width < 640) return 160;
    if (width < 768) return 180;
    if (width < 1024) return 200;
    return 220;
  }, []);

  const [itemWidth, setItemWidth] = useState(200);
  const gap = 0; // No gap, smooth continuous flow
  const speed = 0.08; // Smooth elegant scroll speed

  // Fetch categories and clients from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
        
        // Fetch categories
        const categoriesUrl = `${API_URL}/api/categories`;
        const categoriesResponse = await fetch(categoriesUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (categoriesResponse.ok) {
          const contentType = categoriesResponse.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const result = await categoriesResponse.json();
            if (result.success && Array.isArray(result.data)) {
              const formattedCategories = result.data.map((cat: any) => ({
                name: cat.name,
                slug: cat.slug,
                description: cat.description
              }));
              setCategories(formattedCategories);
            }
          }
        }
        
        // Fetch clients for ticker
        const clientsUrl = `${API_URL}/api/clients`;
        const clientsResponse = await fetch(clientsUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (clientsResponse.ok) {
          const contentType = clientsResponse.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const result = await clientsResponse.json();
            if (result.success && Array.isArray(result.clients)) {
              setClients(result.clients);
            } else if (Array.isArray(result)) {
              setClients(result);
            }
          }
        } else {
          setClients([]);
        }
        
      } catch (error) {
        console.error("Fetch error:", error);
        setCategories([]);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update item width on resize
  useEffect(() => {
    const updateItemWidth = () => {
      setItemWidth(getClientItemWidth());
    };
    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [getClientItemWidth]);

  // Show welcome slide for 10 seconds, then start category rotation
  useEffect(() => {
    if (categories.length === 0) return;
    
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => clearTimeout(welcomeTimer);
  }, [categories.length]);

  // Auto-rotate categories - only after welcome slide ends
  useEffect(() => {
    if (categories.length === 0) return;
    if (showWelcome) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length, showWelcome]);

  const currentCategory = categories[currentIndex];

  // EXACT SAME ANIMATION LOGIC AS HowItWorksSection
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setPosition((prev) => {
      const totalContentWidth = clients.length * (itemWidth + gap);
      let newPos = prev + speed * delta;
      if (newPos >= totalContentWidth) newPos = 0;
      return newPos;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [clients.length, itemWidth, gap, speed]);

  // Start animation when clients are loaded and welcome slide is done
  useEffect(() => {
    if (clients.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        lastTimeRef.current = 0;
      };
    }
  }, [clients.length, showWelcome, animate]);

  // Duplicate clients multiple times for seamless infinite scrolling (like HowItWorksSection)
  const infiniteClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section ref={sectionRef} className="relative min-h-[320px] lg:min-h-[900px] xl:min-h-[900px] w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover opacity-80"
          priority
          quality={75}
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
      <div className="relative h-full w-full mx-auto max-w-7xl mt-8 sm:mt-15 px-4 z-20">
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
  className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] font-semibold uppercase leading-[1.1] tracking-tighter text-white"
>
  {currentCategory.name.split(' ')[0]} <br />
  <motion.span 
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.15 }}
    className="text-orange-400 inline-block font-medium"
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
 <p className="text-left max-w-[70%] sm:max-w-xl text-[8px] xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-gray-200">
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

{/* Dynamic Bottom Ticker - Mobile Responsive Updated */}
{clients.length > 0 && (
  <div className="absolute w-full bottom-0 left-0 right-0 overflow-hidden border-t border-orange-400/20 bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-500/20 backdrop-blur-md py-0.5 sm:py-1.5 md:py-2 lg:py-3 z-30">
    
    {/* Main Viewport Container */}
    <div
      ref={parentRef}
      className="relative w-full flex items-center overflow-hidden"
    >
      
      {/* Ticker Track */}
      <div
        ref={containerRef}
        className="flex will-change-transform items-center"
        style={{
          transform: `translate3d(-${position}px, 0, 0)`,
        }}
      >
        {infiniteClients.map((client, index) => (
          <Link
            key={`${client.slug}-${index}`}
            href={`/clients/${client.slug}`}
            className="flex-shrink-0"
           style={{
  width: `${itemWidth - 50}px`,
              marginLeft: index === 0 ? "0" : `${window.innerWidth < 768 ? 0 : 1}px`,
            }}
          >
            <div className="flex items-center justify-center px-0.5 sm:px-1 md:px-1.5 lg:px-2 py-0 transition-all duration-300 hover:scale-105">
              
              {/* Client Image */}
              <div className="relative w-5 h-5 min-[250px]:w-6 min-[250px]:h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 shadow-md flex-shrink-0">
                
                {client.imageUrl ? (
                  <Image
                    src={
                      client.imageUrl.startsWith("http")
                        ? client.imageUrl
                        : `${process.env.NEXT_PUBLIC_BASE_URL}${client.imageUrl}`
                    }
                    alt={client.name}
                    fill
                    className="object-contain transition-transform duration-300 scale-200"
                        style={{
      filter: `
        drop-shadow(-0.5px 0 white)
        drop-shadow(0.5px 0 white)
        drop-shadow(0 -0.5px white)
        drop-shadow(0 0.5px white)
      `,
    }}
                    sizes="(max-width: 250px) 20px,
                           (max-width: 640px) 24px,
                           (max-width: 768px) 36px,
                           (max-width: 1024px) 44px,
                           48px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-[7px] min-[250px]:text-[9px] sm:text-xs md:text-sm lg:text-base font-bold bg-gradient-to-br from-orange-500/30 to-orange-600/30">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)}
      {/* Loading or Empty State */}
      {clients.length === 0 && !loading && !showWelcome && (
        <div className="absolute w-full bottom-0 left-0 right-0 border-t border-orange-400/30 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 backdrop-blur-md py-3 sm:py-4 md:py-5 z-30">
          <div className="text-center text-white/50 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-orange-400/50"></span>
              No clients to display
              <span className="w-1 h-1 rounded-full bg-orange-400/50"></span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}