'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShoppingBag, CreditCard, Truck, Tag, Package, Shield, 
  Smartphone, Clock, FileText, CircleCheck, Store, 
  MapPin, Phone, Mail, Globe 
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function PhilosophySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  
  const categories = [
    { name: "ID Cards", image: "/images/j1.webp" },
    { name: "RFID Cards", image: "/images/j2.webp" },
    { name: "PVC Cards", image: "/images/j3.webp" },
    { name: "Access Cards", image: "/images/j4.webp" },
    { name: "NFC Cards", image: "/images/j5.webp" },
    { name: "Lanyards", image: "/images/j6.webp" },
    { name: "Flex Printing", image: "/images/j7.webp" },
    { name: "Hording Print", image: "/images/j8.webp" },
    { name: "Access Control", image: "/images/j9.webp" },
    { name: "CCTV Systems", image: "/images/j10.webp" },
    { name: "Graphic Design", image: "/images/j11.webp" },
  ];

  // Triple the array for infinite scroll
  const loopCategories = [...categories, ...categories, ...categories];

  // Store features for the grid
  const storeFeatures = [
    { icon: CreditCard, title: "Secure Payments", subtitle: "Razorpay • UPI • COD", color: "orange" },
    { icon: Truck, title: "Fast Shipping", subtitle: "PAN India Delivery", color: "orange" },
    { icon: Tag, title: "Offers & Discounts", subtitle: "Coupons • Bulk Deals", color: "orange" },
    { icon: Package, title: "Track Orders", subtitle: "Real-time Updates", color: "orange" },
    { icon: Shield, title: "Secure Checkout", subtitle: "SSL Encrypted", color: "orange" },
    { icon: Clock, title: "24/7 Support", subtitle: "Customer Service", color: "orange" },
  ];

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement?.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const gapSize = 12;
          // Show 2-5 items based on screen size
          let itemsToShow = 5;
          if (window.innerWidth < 640) itemsToShow = 2;
          else if (window.innerWidth < 768) itemsToShow = 3;
          else if (window.innerWidth < 1024) itemsToShow = 4;
          else itemsToShow = 5;
          
          const width = (containerWidth - (gapSize * (itemsToShow - 1))) / itemsToShow;
          setCardWidth(width);
        }
      }
    };
    
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const getTranslateValue = () => {
    if (cardWidth === 0) return 0;
    const gapSize = 12;
    const slideDistance = cardWidth + gapSize;
    return -(currentIndex * slideDistance);
  };

  return (
    <section className="relative w-full py-12 sm:py-14 md:py-16 lg:py-24 bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/h3.webp"
          alt="Background"
          fill
          className="object-cover "
          priority
        />
    
      </div>

      <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6 md:space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-orange-400"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ONLINE STORE
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                >
                  Shop with <br />
                  <span className="text-orange-400">Confidence</span>
                </motion.h2>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="h-1 bg-orange-400 rounded-full"
                />
              </div>

              {/* Store Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm p-5 md:p-6 rounded-xl border border-orange-500/20 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm md:text-base text-gray-200">
                                      No.4A 3rd Street, Sanjay Gandhi Nagar, Chromepet Chennai - 6000044
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm text-gray-200">9884496177</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm text-gray-200">id@anmrs.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm text-gray-200">www.anmrs.com</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4 text-gray-300"
              >
                <p className="text-base md:text-lg leading-relaxed">
                  Welcome to our comprehensive e-commerce platform for security and identification solutions. 
                  Browse our extensive catalog featuring simple and variable products with real-time stock 
                  control, category management, and exclusive offers.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Shop securely with multiple payment options including Razorpay, UPI, Net Banking, and COD. 
                  Track your orders in real-time, download invoices, and enjoy fast shipping across India. 
                  From ID cards to CCTV systems, everything you need is just a click away.
                </p>
              </motion.div>

              {/* E-Commerce Features Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4"
              >
                {storeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{feature.title}</p>
                      <p className="text-xs text-gray-400 truncate">{feature.subtitle}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Image with Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <div className="relative h-[550px] sm:h-[500px] md:h-[600px] lg:h-[900px] w-full">
                <Image
                  src="/images/h2.webp"
                  alt="ANMRS IT Solutions - Online Store for Security Products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
           </div>
              {/* Trust Badge */}
      
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Bottom Product Categories Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex justify-between items-center mb-4">
     

          </div>

          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden">
              <motion.div
                ref={containerRef}
                className="flex gap-3"
                animate={{ x: getTranslateValue() }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ width: 'max-content' }}
              >
     {loopCategories.map((category, idx) => (
  <motion.div
    key={`${category.name}-${idx}`}
    whileHover={{
      scale: 1.05,
      backgroundColor: "#f97316",
      color: "#000000",
    }}
    className="flex flex-col items-center justify-center gap-2 px-3 py-3 bg-gray-900 text-gray-300 rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-300 cursor-pointer"
    style={{
      width: cardWidth ? `${cardWidth}px` : "auto",
    }}
  >
    <div className="relative w-10 h-10">
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-contain invert"
      />
    </div>

    <span className="text-xs text-center">
      {category.name}
    </span>
  </motion.div>
))}
              </motion.div>
            </div>
          </div>


          {/* Payment Methods Row */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 pt-4 border-t border-gray-800/50">
            <span className="text-xs text-gray-500">Payment Methods:</span>
            <span className="text-xs text-orange-400">Razorpay</span>
            <span className="text-xs text-orange-400">UPI</span>
            <span className="text-xs text-orange-400">Net Banking</span>
            <span className="text-xs text-orange-400">COD</span>
            <span className="text-xs text-orange-400">Stripe</span>
            <span className="text-xs text-orange-400">PayPal</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}