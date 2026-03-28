"use client";

import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"

const reasons = [
  "Secure Online Payments via Razorpay, UPI, Net Banking & COD",
  "Real-Time Order Tracking & Instant Invoice Generation",
  "Bulk Order Discounts & Exclusive Coupon Offers",
  "Fast Pan-India Shipping with Secure Packaging",
  "Easy Returns & Refund Policy for Customer Satisfaction",
  "24/7 Customer Support & Order Assistance",
]

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null)

  // List item animation variants
  const listItemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  }

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 md:py-24 text-black overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 w-full">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20 lg:grid-cols-2 w-full">
          {/* Left Column - Image */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative order-2 lg:order-1 w-full"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border-4 sm:border-6 md:border-8 border-orange-400 shadow-2xl"
            >
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                src="/images/h1.webp"
                alt="Online Shopping Experience"
                className="aspect-square w-full object-cover"
              />
            </motion.div>

            {/* Decorative animated circle */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              className="absolute -right-5 sm:-right-6 md:-right-8 lg:-right-10 -top-5 sm:-top-6 md:-top-8 lg:-top-10 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-64 lg:w-64 rounded-full border-[8px] sm:border-[10px] md:border-[12px] lg:border-[20px] border-black/5"
            />
          </motion.div>

          {/* Right Column - Content */}
          <div className="order-1 space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 lg:order-2 w-full">
            <motion.h2 
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-orange-400"
            >
              THE ANMRS E-COMMERCE ADVANTAGE
            </motion.h2>

            <motion.h3 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter break-words"
            >
              WHY SHOP <br />
              <motion.span 
                initial={{ color: "#000000" }}
                whileInView={{ color: "#f97316" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-orange-400 inline-block"
              >
                WITH US
              </motion.span>
            </motion.h3>

            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-base sm:text-lg md:text-lg lg:text-xl  leading-relaxed text-gray-600 break-words"
            >
              Experience seamless online shopping for all your security and identification needs. Our e-commerce platform offers secure payments, real-time tracking, and exceptional customer service.
            </motion.p>

            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-1 w-full"
            >
              {reasons.map((reason, idx) => (
                <motion.li 
                  key={idx} 
                  custom={idx}
                
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 sm:gap-3 md:gap-4 group cursor-default w-full"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-400 transition-colors group-hover:bg-orange-400 group-hover:text-white"
                  >
                    <CheckCircle2 size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9" />
                  </motion.div>
                  <span className="text-sm sm:text-base md:text-base lg:text-lg  text-gray-800 break-words flex-1">{reason}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              whileHover={{ scale: 1.02 }}
              className="bg-orange-400 p-4 sm:p-5 md:p-6 lg:p-8 text-black rounded-xl sm:rounded-xl md:rounded-2xl shadow-xl w-full"
            >
              <motion.p 
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="text-lg sm:text-xl md:text-2xl font-black italic break-words"
              >
                "Shop securely, track easily, and enjoy exclusive online discounts!"
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Decorative background elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute left-10 sm:left-20 top-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-orange-500 blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute right-10 sm:right-20 bottom-20 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-blue-500 blur-3xl -z-10"
        />
      </div>
    </section>
  )
}