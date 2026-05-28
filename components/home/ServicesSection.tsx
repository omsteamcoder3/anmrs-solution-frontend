"use client";

import { motion } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"

interface Service {
  title: string;
  desc: string;
  image: string;
  order: number;
}

interface SectionSettings {
  sectionTitle: string;
  sectionMainTitle: string;
  isActive: boolean;
}

interface ApiResponse {
  success: boolean;
  data: {
    services: Service[];
    sectionSettings: SectionSettings;
  };
}

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const [services, setServices] = useState<Service[]>([])
  const [sectionSettings, setSectionSettings] = useState<SectionSettings>({
    sectionTitle: "OUR SERVICES",
    sectionMainTitle: "WHAT WE OFFER",
    isActive: true
  })
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(3)
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const API_URL = process.env.NEXT_PUBLIC_API_URL 
      const response = await fetch(`${API_URL}/public/what-we-offer`)
      
      if (!response.ok) throw new Error('Failed to fetch services')
      
      const data: ApiResponse = await response.json()
      if (data.success && data.data) {
        setServices(data.data.services || [])
        setSectionSettings(data.data.sectionSettings || {
          sectionTitle: "OUR SERVICES",
          sectionMainTitle: "WHAT WE OFFER",
          isActive: true
        })
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return null

  // already full url
  if (imagePath.startsWith('http')) return imagePath

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  return `${BASE_URL}${imagePath}`
}

  // Create extended array for smooth infinite scroll (add extra cards at both ends)
  const getExtendedServices = useCallback(() => {
    if (services.length === 0) return []
    // Add extra sets for smooth infinite scrolling
    return [...services.slice(-itemsToShow), ...services, ...services.slice(0, itemsToShow)]
  }, [services, itemsToShow])

  const extendedServices = getExtendedServices()
  const extendedStartIndex = itemsToShow // Starting index in the extended array

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement?.parentElement
        if (container) {
          const containerWidth = container.clientWidth
          const gapSize = 12
          // Show items based on screen size
          let itemsToShowCount = 3
          if (window.innerWidth < 640) {
            itemsToShowCount = 2 // Changed from 1 to 2 for mobile
          } else if (window.innerWidth < 1024) {
            itemsToShowCount = 2
          } else {
            itemsToShowCount = 3
          }
          
          setItemsToShow(itemsToShowCount)
          const width = (containerWidth - (gapSize * (itemsToShowCount - 1))) / itemsToShowCount
          setCardWidth(width)
        }
      }
    }
    
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [services.length])

  // Handle infinite loop by resetting position without animation
  useEffect(() => {
    if (isLooping) return
    
    if (currentIndex >= services.length) {
      setIsLooping(true)
      setCurrentIndex(0)
      setTimeout(() => setIsLooping(false), 50)
    } else if (currentIndex < 0) {
      setIsLooping(true)
      setCurrentIndex(services.length - 1)
      setTimeout(() => setIsLooping(false), 50)
    }
  }, [currentIndex, services.length, isLooping])

  useEffect(() => {
    if (isHovered || services.length === 0 || isLooping) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isHovered, services.length, isLooping])

  const getTranslateValue = () => {
    if (cardWidth === 0 || services.length === 0) return 0
    const gapSize = 12
    const slideDistance = cardWidth + gapSize
    // Use the extended array index for smooth scrolling
    const extendedIndex = extendedStartIndex + currentIndex
    return -(extendedIndex * slideDistance)
  }

  if (loading || !sectionSettings.isActive) {
    return null
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="relative bg-black py-8 xs:py-10 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-3 sm:px-5 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 50 } }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <motion.span 
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            whileInView={{ letterSpacing: "0.5em", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[8px] xs:text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-orange-400"
          >
            {sectionSettings.sectionTitle}
          </motion.span>
          
          <motion.h3 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-1 xs:mt-2 sm:mt-3 md:mt-4 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black uppercase tracking-tighter break-words px-2 leading-tight"
          >
            {sectionSettings.sectionMainTitle}
          </motion.h3>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-2 sm:mt-3 md:mt-4 h-0.5 sm:h-1 md:h-1.5 bg-orange-400"
          />
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mt-4 sm:mt-6 md:mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 sm:w-8 md:w-10 bg-orange-400' 
                  : 'w-1.5 sm:w-2 md:w-2.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Services Carousel */}
        <div 
          className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-3"
              animate={{ x: getTranslateValue() }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ width: 'max-content' }}
            >
              {extendedServices.map((item, idx) => {
                // Get the actual index for numbering
                const actualIndex = ((idx - itemsToShow) % services.length + services.length) % services.length
                return (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    whileHover={{ 
                      backgroundColor: "#f97316",
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    className="group relative bg-orange-400 rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 cursor-pointer overflow-hidden flex-shrink-0"
                    style={{
                      width: cardWidth ? `${cardWidth}px` : '280px',
                    }}
                  >
                    {/* Icon/Image */}
                    <div className="relative mb-2 sm:mb-3 md:mb-4 lg:mb-6 inline-flex items-center justify-center">
                      {item.image && getImageUrl(item.image) ? (
                        <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-white rounded-full p-1.5 xs:p-2 sm:p-2.5 md:p-3">
                          <img
                            src={getImageUrl(item.image) || ""}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-black rounded-full flex items-center justify-center">
                          <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-orange-400 rounded-md" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="relative mb-1 sm:mb-2 md:mb-3 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black uppercase tracking-tight text-black break-words leading-tight">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="relative leading-snug text-black/80 font-medium text-[10px] xs:text-xs sm:text-sm md:text-base line-clamp-2 xs:line-clamp-3">
                      {item.desc}
                    </p>

                    {/* Number Badge */}
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-black/10">
                      {(actualIndex + 1).toString().padStart(2, '0')}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 xs:p-2 sm:p-3 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentIndex(prev => prev + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 xs:p-2 sm:p-3 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Background Animations */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-4 sm:left-10 w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-orange-400 rounded-full opacity-50"
        />
        
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-4 sm:right-10 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full opacity-50"
        />
      </div>
    </section>
  )
}