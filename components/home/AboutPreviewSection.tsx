"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function AboutPreviewSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="bg-orange-400 py-16 sm:py-20 md:py-24 text-black overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.h2 
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-[10px] xs:text-xs font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] sm:tracking-[0.4em] text-white"
            >
              ANMRS IT SOLUTIONS E-COMMERCE
            </motion.h2>

            <motion.h3 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter break-words"
            >
              YOUR ONE-STOP <br />
              <span className="text-white">SECURITY & ID</span> <br />
              SOLUTIONS STORE
            </motion.h3>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg font-bold leading-relaxed opacity-90"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome to our comprehensive e-commerce platform for ID card manufacturing, RFID technology, and security systems. Browse our extensive catalog of PVC cards, RFID cards, NFC cards, access cards, and customizable lanyards - all available for online purchase with secure payment options.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our online store features simple and variable products with complete stock control, category management, special offers and discounts. From multi-color lanyards to flex printing services, from CCTV systems to graphic design - everything you need is just a few clicks away with Razorpay, UPI, Net Banking, and COD payment options.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 sm:gap-4 border-b-2 sm:border-b-4 border-black pb-1 sm:pb-2 text-base sm:text-lg md:text-xl font-black uppercase tracking-wider sm:tracking-widest transition-all hover:border-white hover:text-white group"
              >
                SHOP OUR PRODUCTS
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                >
                  <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Images */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative mt-4 sm:mt-0"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="aspect-video overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-2xl"
            >
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                src="/images/about.webp"
                alt="E-commerce Shopping Experience"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>

            {/* Template Style Floating Image */}
            <motion.div 
              initial={{ x: -50, y: 50, opacity: 0, rotate: -10 }}
              whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 -left-4 sm:-left-6 md:-left-8 h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48 overflow-hidden rounded-full border-4 sm:border-6 md:border-8 border-orange-400 bg-black p-1 sm:p-2 shadow-2xl"
            >
              <motion.img
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80"
                alt="PVC Cards & ID Cards"
                className="h-full w-full rounded-full object-cover"
              />
            </motion.div>

            {/* Additional floating badge */}
            <motion.div 
              initial={{ x: 50, y: -30, opacity: 0, rotate: 10 }}
              whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute -top-3 sm:-top-4 md:-top-5 -right-2 sm:-right-3 md:-right-4 bg-black text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-black text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider shadow-2xl whitespace-nowrap"
            >
              ⚡ Fast Shipping • Secure Payments
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute left-10 sm:left-20 top-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white blur-3xl -z-10"
        />
      </div>
    </section>
  )
}