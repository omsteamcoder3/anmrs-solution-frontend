"use client";

import { motion } from "framer-motion"
import { useRef } from "react"
import { 
  CreditCard, 
  Rss, 
  Printer, 
  Shield, 
  Camera, 
  Palette,
  Wifi,
  Smartphone,
  FileText,
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

  // Floating animation for cards
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Pulse animation for icons
  const pulseAnimation = {
    initial: { scale: 1 },
    whileHover: {
      scale: [1, 1.2, 1.1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 0.6, 1]
      }
    }
  }

  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      rotateY: -30
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={sectionRef} className="relative bg-black py-16 sm:py-20 md:py-24 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(249, 115, 22, 0.2) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        {/* Header Section with new animations */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }
          }}
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

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              className="group relative bg-gradient-to-br from-orange-400 via-orange-400 to-orange-600 rounded-xs p-5 sm:p-6 md:p-8 cursor-pointer overflow-hidden"
            >
              {/* Animated background pattern */}
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                whileHover={{ 
                  rotate: 180,
                  scale: 1.5,
                  opacity: 0.2
                }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 right-0 rotate-45 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-gradient-to-r from-gray-600 to-gray-950 rounded-xs -mr-12 sm:-mr-14 md:-mr-16 -mt-12 sm:-mt-14 md:-mt-16"
              />

              {/* Icon container with new animations */}
              <motion.div 
                variants={pulseAnimation}
                initial="initial"
                whileHover="whileHover"
                className="relative mb-4 sm:mb-5 md:mb-6 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black rounded-xl sm:rounded-2xl text-orange-400"
              >
                <div className="scale-75 sm:scale-90 md:scale-100">
                  {item.icon}
                </div>
                
                {/* Ring animation around icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-black"
                />
              </motion.div>

              {/* Title with hover effect */}
              <motion.h4 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-black break-words"
              >
                {item.title}
              </motion.h4>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0.8 }}
                whileInView={{ opacity: 1 }}
                className="relative leading-relaxed text-black/80 font-medium text-xs sm:text-sm md:text-base"
              >
                {item.desc}
              </motion.p>

              {/* Floating number effect */}
              <motion.div 
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, 0],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 text-3xl sm:text-4xl md:text-6xl font-black text-black/10"
              >
                {(idx + 1).toString().padStart(2, '0')}
              </motion.div>

              {/* Animated corner accents */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-8 sm:w-10 md:w-12 h-0.5 bg-black"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-0 left-0 w-0.5 h-8 sm:h-10 md:h-12 bg-black"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute bottom-0 right-0 w-8 sm:w-10 md:w-12 h-0.5 bg-black"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute bottom-0 right-0 w-0.5 h-8 sm:h-10 md:h-12 bg-black"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative floating elements */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-4 sm:left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full opacity-50"
        />
        
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 right-4 sm:right-10 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full opacity-50"
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-1/4 bottom-20 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 bg-orange-500 rounded-full blur-3xl -z-10"
        />

        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute right-1/4 top-40 w-30 h-30 sm:w-40 sm:h-40 md:w-60 md:h-60 bg-orange-600 rounded-full blur-3xl -z-10"
        />
      </div>
    </section>
  )
}