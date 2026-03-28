"use client"

import { User, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const testimonials = [
  {
    name: "Suresh Kumar",
    loc: "Tech Corp, Chennai",
    text: "Ordered RFID cards through their online store. The checkout was smooth with Razorpay, and I received real-time updates. Products arrived well-packaged within 3 days. Excellent e-commerce experience!",
  },
  {
    name: "Priya Venkatesh",
    loc: "Grand Mall Management",
    text: "Bulk ordered custom lanyards and PVC cards online. Loved the easy category navigation, secure UPI payment, and instant invoice generation. Great discounts and fast delivery. Will definitely reorder.",
  },
  {
    name: "Rajan M.",
    loc: "Sunrise School",
    text: "The online ordering process for student ID cards was seamless. Got design support via chat, order tracking updates via email, and COD option made payment easy. Trustworthy online store!",
  },
  {
    name: "Meena Krishnan",
    loc: "HealthFirst Hospital",
    text: "Ordered RFID wristbands for patient identification. The quality is exceptional and the customization options were perfect. Real-time order tracking kept me updated throughout. Highly recommended!",
  },
  {
    name: "Arjun Reddy",
    loc: "Elite Gym & Fitness",
    text: "Perfect solution for our membership cards. The online store made bulk ordering simple, and the NFC integration works flawlessly. Members love the modern design. Great value for money!",
  },
  {
    name: "Lakshmi Narayan",
    loc: "Event Management Co.",
    text: "Urgently needed custom badges for a conference. The team delivered within 48 hours with express shipping. Online ordering was hassle-free and the quality exceeded expectations.",
  },
  {
    name: "Vikram Seth",
    loc: "Corporate Security Ltd",
    text: "Implementing access control cards for 500+ employees seemed daunting, but the online store made it easy. Bulk ordering portal, design templates, and quick delivery. Outstanding service!",
  },
  {
    name: "Deepa Rajesh",
    loc: "Luxury Hotel Group",
    text: "The RFID key cards for our hotel rooms are top-notch. Online customization tool was intuitive, and the sample approval process was quick. Guests appreciate the premium quality.",
  },
  {
    name: "Karthik Subramaniam",
    loc: "StartUp Hub",
    text: "Ordered custom lanyards and ID cards for our team of 50. The design support was excellent, and the prices were competitive. Fast shipping and great communication throughout.",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isHovered])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Get current visible testimonials
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  return (
    <section ref={sectionRef} className="overflow-hidden bg-black py-12 sm:py-16 md:py-24 text-black relative">
      {/* Decorative background elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute top-4 sm:top-10 md:top-20 left-4 sm:left-10 md:left-20 w-32 sm:w-48 md:w-64 lg:w-96 h-32 sm:h-48 md:h-64 lg:h-96 rounded-full bg-orange-500 blur-xl sm:blur-2xl md:blur-3xl -z-10"
      />
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute bottom-4 sm:bottom-10 md:bottom-20 right-4 sm:right-10 md:right-20 w-24 sm:w-40 md:w-64 lg:w-80 h-24 sm:h-40 md:h-64 lg:h-80 rounded-full bg-blue-500 blur-xl sm:blur-2xl md:blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 flex flex-col items-center text-center"
        >
          <motion.h2 
            whileHover={{ scale: 1.1, color: "#f97316" }}
            transition={{ duration: 0.2 }}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-400"
          >
            CUSTOMER REVIEWS
          </motion.h2>
          <motion.h3 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="mt-2 sm:mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter px-2"
          >
            SHOPPER <motion.span 
              animate={{ 
                color: ["#000000", "#f97316", "#000000"],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="text-orange-400"
            >
              STORIES
            </motion.span>
          </motion.h3>
          
          {/* Animated underline */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 h-0.5 sm:h-1 bg-orange-400"
          />
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-400 rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors"
            aria-label="Previous testimonials"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-400 rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors"
            aria-label="Next testimonials"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Grid - Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3"
              >
                {visibleTestimonials.map((t, idx) => (
                  <motion.div
                    key={`${currentIndex}-${t.name}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(249,115,22,0.2)",
                      transition: { duration: 0.3 }
                    }}
                    className="relative flex flex-col justify-between bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_15px_30px_rgba(249,115,22,0.1)] rounded-xl sm:rounded-2xl md:rounded-3xl border-t-4 sm:border-t-8 border-orange-400 group cursor-default"
                  >
                    {/* Quote icon with animation */}
                    <motion.div 
                      whileHover={{ 
                        rotate: 360,
                        backgroundColor: "#f97316",
                        color: "#ffffff",
                        scale: 1.2
                      }}
                      className="absolute -top-3 sm:-top-4 md:-top-5 lg:-top-6 left-3 sm:left-4 md:left-6 lg:left-10 flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-black text-white shadow-xl"
                    >
                      <Quote size={12} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </motion.div>

                    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                      {/* Testimonial text */}
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg  italic leading-relaxed text-gray-700">
                        "{t.text}"
                      </p>

                      {/* Author section */}
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 border-t border-gray-100 pt-3 sm:pt-4 md:pt-5 lg:pt-6">
                        {/* Avatar with animation */}
                        <motion.div 
                          whileHover={{ 
                            scale: 1.2,
                            backgroundColor: "#f97316",
                            color: "#ffffff",
                            rotate: 10
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-gray-100 text-orange-400"
                        >
                          <User size={14} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                        </motion.div>
                        
                        <div>
                          <motion.h5 
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase tracking-tight"
                          >
                            {t.name}
                          </motion.h5>
                          <motion.p 
                            animate={{ 
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut"
                            }}
                            className="text-[10px] sm:text-xs md:text-sm  text-orange-400"
                          >
                            {t.loc}
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 right-1 sm:right-2 md:right-3 lg:right-4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-orange-200 select-none">
                      ”
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 space-x-2">
            {Array.from({ length: testimonials.length - 2 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-orange-400 scale-125 w-4 sm:w-5" 
                    : "bg-orange-400/30 hover:bg-orange-400/50"
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
        />
      </div>
    </section>
  )
}