"use client";

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

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
    if (imagePath.startsWith('http')) return imagePath
    if (imagePath.startsWith('/uploads')) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002"
      return `${API_URL}${imagePath}`
    }
    return imagePath
  }

  // Triple the array for infinite scroll
  const loopServices = [...services, ...services, ...services]

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement?.parentElement
        if (container) {
          const containerWidth = container.clientWidth
          const gapSize = window.innerWidth < 640 ? 12 : 24
          // For mobile: show 1 card, for tablet: 2 cards, for desktop: 3 cards
          let cardsToShow = 3
          if (window.innerWidth < 640) {
            cardsToShow = 1
          } else if (window.innerWidth < 1024) {
            cardsToShow = 2
          }
          const width = (containerWidth - (gapSize * (cardsToShow - 1))) / cardsToShow
          setCardWidth(width)
        }
      }
    }
    
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [])

  useEffect(() => {
    if (isHovered || services.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, services.length])

  const getTranslateValue = () => {
    if (cardWidth === 0 || services.length === 0) return 0
    const gapSize = window.innerWidth < 640 ? 12 : 24
    const slideDistance = cardWidth + gapSize
    return -(currentIndex * slideDistance)
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    whileHover: {
      scale: [1, 1.15, 1],
      transition: { duration: 0.5 }
    }
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

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mt-4 sm:mt-6 md:mt-8"
        >
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all ${
                index === (currentIndex % services.length)
                  ? 'w-3 sm:w-4 md:w-5 lg:w-6 bg-orange-400' 
                  : 'w-1 sm:w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        <div 
          className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              animate={{ x: getTranslateValue() }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ width: 'max-content' }}
            >
              {loopServices.map((item, idx) => (
                <motion.div
                  key={`${item.title}-${idx}`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="group relative bg-orange-400 rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 cursor-pointer overflow-hidden flex-shrink-0"
                  style={{
                    width: cardWidth ? `${cardWidth}px` : '280px',
                  }}
                >
                  {item.image && getImageUrl(item.image) ? (
                    <motion.div 
                      variants={pulseAnimation}
                      initial="initial"
                      whileHover="whileHover"
                      className="relative mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-orange-400 rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden"
                    >
                      <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full p-1 xs:p-1.5 sm:p-2">
                        <img
                          src={getImageUrl(item.image) || ""}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      variants={pulseAnimation}
                      initial="initial"
                      whileHover="whileHover"
                      className="relative mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-black rounded-lg xs:rounded-xl sm:rounded-2xl"
                    >
                      <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-orange-400 rounded-md xs:rounded-lg" />
                    </motion.div>
                  )}

                  <motion.h4 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight text-black break-words leading-tight"
                  >
                    {item.title}
                  </motion.h4>

                  <motion.p className="relative leading-snug xs:leading-relaxed text-black/80 font-medium text-[10px] xs:text-xs sm:text-sm md:text-base line-clamp-3 xs:line-clamp-none">
                    {item.desc}
                  </motion.p>

                  <motion.div 
                    animate={{ y: [0, -5, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1 xs:bottom-1.5 sm:bottom-2 md:bottom-3 lg:bottom-4 right-1 xs:right-1.5 sm:right-2 md:right-3 lg:right-4 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black/10"
                  >
                    {((idx % services.length) + 1).toString().padStart(2, '0')}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

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