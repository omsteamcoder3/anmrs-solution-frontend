"use client";

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { 
  CreditCard, 
  Rss, 
  Printer, 
  Camera, 
  Palette,
  Smartphone,
  Fingerprint,
  ScanLine,
  BadgeCheck
} from "lucide-react"

const services = [
  {
    title: "ID Card Manufacturing",
    desc: "Premium quality PVC, RFID, and NFC cards with custom designs, durable printing, and fast turnaround for businesses of all sizes.",
    icon: <CreditCard size={40} />,
  },
  {
    title: "RFID Solutions",
    desc: "Advanced RFID cards and tags for access control, attendance tracking, and contactless identification with high security.",
    icon: <Rss size={40} />,
  },
  {
    title: "Lanyard Printing",
    desc: "Custom lanyards in multicolor, sublimation, and screen printing options with your logo, text, and branding elements.",
    icon: <Printer size={40} />,
  },
  {
    title: "Access Control Systems",
    desc: "Complete access control solutions including biometric systems, card readers, and software for secure entry management.",
    icon: <Fingerprint size={40} />,
  },
  {
    title: "CCTV Installation",
    desc: "Professional CCTV camera installation with high-resolution imaging, night vision, and remote monitoring capabilities.",
    icon: <Camera size={40} />,
  },
  {
    title: "Graphic Design",
    desc: "Expert graphic design services for card layouts, branding materials, and printing artwork with creative precision.",
    icon: <Palette size={40} />,
  },
  {
    title: "NFC Technology",
    desc: "NFC enabled cards for contactless data transfer, payments, and smart identification with mobile compatibility.",
    icon: <ScanLine size={40} />,
  },
  {
    title: "Flex & Hording",
    desc: "Large format flex printing and hoarding services for outdoor advertising, events, and business promotions.",
    icon: <Smartphone size={40} />,
  },
  {
    title: "PVC Cards",
    desc: "High-quality plain and printed PVC cards for membership, loyalty programs, identification, and business use.",
    icon: <BadgeCheck size={40} />,
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(0)

  // Triple the array for infinite scroll
  const loopServices = [...services, ...services, ...services]

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement?.parentElement
        if (container) {
          const containerWidth = container.clientWidth
          const gapSize = 24
          const width = (containerWidth - (gapSize * 2)) / 3
          setCardWidth(width)
        }
      }
    }
    
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [])

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const getTranslateValue = () => {
    if (cardWidth === 0) return 0
    const gapSize = 24
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

  return (
    <section ref={sectionRef} className="relative bg-black py-16 sm:py-20 md:py-24 text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
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
            className="text-[10px] xs:text-xs font-black uppercase tracking-[0.3em] xs:tracking-[0.4em] sm:tracking-[0.5em] text-orange-400"
          >
            OUR SERVICES
          </motion.span>
          
          <motion.h3 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 sm:mt-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter break-words px-2"
          >
            WHAT WE OFFER
          </motion.h3>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 sm:mt-6 h-1.5 sm:h-2 bg-orange-400"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 mt-8 sm:mt-10"
        >
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === (currentIndex % services.length)
                  ? 'w-6 sm:w-8 bg-orange-400' 
                  : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>

        <div 
          className="relative mt-8 sm:mt-10 md:mt-12 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-6"
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
                  className="group relative bg-orange-400 rounded-lg p-5 sm:p-6 md:p-8 cursor-pointer overflow-hidden flex-shrink-0"
                  style={{
                    width: cardWidth ? `${cardWidth}px` : '280px',
                  }}
                >
                  <motion.div 
                    variants={pulseAnimation}
                    initial="initial"
                    whileHover="whileHover"
                    className="relative mb-4 sm:mb-5 md:mb-6 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black rounded-xl sm:rounded-2xl text-orange-400"
                  >
                    <div className="scale-75 sm:scale-90 md:scale-100">
                      {item.icon}
                    </div>
                  </motion.div>

                  <motion.h4 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-black break-words"
                  >
                    {item.title}
                  </motion.h4>

                  <motion.p className="relative leading-relaxed text-black/80 font-medium text-xs sm:text-sm md:text-base">
                    {item.desc}
                  </motion.p>

                  <motion.div 
                    animate={{ y: [0, -5, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 text-3xl sm:text-4xl md:text-6xl font-black text-black/10"
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
          className="absolute top-20 left-4 sm:left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full opacity-50"
        />
        
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-4 sm:right-10 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full opacity-50"
        />
      </div>
    </section>
  )
}