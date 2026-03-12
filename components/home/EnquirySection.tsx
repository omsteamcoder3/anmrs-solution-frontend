"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Send, CreditCard, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function EnquirySection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `E-Commerce Order Enquiry - Anmrs IT Solutions:%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Product Interested:* ${formData.product}%0A*Requirements:* ${formData.message}`
    window.open(`https://wa.me/919884496177?text=${text}`, "_blank")
  }

  return (
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] bg-black text-white shadow-[0_25px_50px_rgba(0,0,0,0.3)] md:shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-12 xl:p-20"
            >
              <div className="absolute right-0 top-0 h-full w-px bg-white/10 hidden lg:block" />

              <motion.h2 
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-400"
              >
                ORDER SUPPORT
              </motion.h2>

              <motion.h3 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-3 sm:mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight sm:leading-none tracking-tighter"
              >
                NEED HELP WITH <br className="hidden xs:block" />
                <motion.span 
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="text-orange-400 inline-block"
                >
                  YOUR ORDER?
                </motion.span>{" "}
                <br />
                WE'RE HERE
              </motion.h3>

              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400"
              >
                Questions about bulk orders, custom designs, or shipping? Fill the form or message us directly on WhatsApp for instant support and order assistance.
              </motion.p>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full border-2 border-orange-400 text-orange-400"
                >
                  <Phone size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9" />
                </motion.div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Order Support</p>
                  <motion.p 
                    animate={{ 
                      color: ["#ffffff", "#f97316", "#ffffff"],
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black"
                  >
                    98844 96177
                  </motion.p>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-4 sm:left-6 md:left-8 lg:left-10 w-16 sm:w-20 md:w-24 lg:w-40 h-16 sm:h-20 md:h-24 lg:h-40 rounded-full bg-orange-500 blur-xl sm:blur-2xl md:blur-3xl -z-10"
              />
            </motion.div>

            {/* Right Form */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="bg-white/5 p-4 sm:p-6 md:p-10 lg:p-12 xl:p-20 backdrop-blur-md"
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Name Field */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-1 sm:space-y-2"
                >
                  <label className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-orange-400">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#f97316" }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full border-b-2 border-white/20 bg-transparent py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold transition-colors focus:border-orange-400 focus:outline-none placeholder:text-gray-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>

                {/* Phone and Product Fields */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1 sm:space-y-2"
                  >
                    <label className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-orange-400">
                      Phone Number
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: "#f97316" }}
                      transition={{ duration: 0.2 }}
                      type="tel"
                      required
                      placeholder="+91 98844 96177"
                      className="w-full border-b-2 border-white/20 bg-transparent py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold transition-colors focus:border-orange-400 focus:outline-none placeholder:text-gray-600"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-1 sm:space-y-2"
                  >
                    <label className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-orange-400">
                      Select Product
                    </label>
                    <motion.select
                      whileFocus={{ scale: 1.02, borderColor: "#f97316" }}
                      transition={{ duration: 0.2 }}
                      className="w-full border-b-2 border-white/20 bg-black py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold transition-colors focus:border-orange-400 focus:outline-none text-white"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    >
                      <option className="bg-black text-gray-400" value="">
                        Select Product
                      </option>
                      <option className="bg-black" value="ID Cards">ID Cards</option>
                      <option className="bg-black" value="RFID Cards">RFID Cards</option>
                      <option className="bg-black" value="PVC Cards">PVC Cards</option>
                      <option className="bg-black" value="Access Cards">Access Cards</option>
                      <option className="bg-black" value="NFC Cards">NFC Cards</option>
                      <option className="bg-black" value="Multicolor Lanyard">Multicolor Lanyard</option>
                      <option className="bg-black" value="Sublimation Lanyard">Sublimation Lanyard</option>
                      <option className="bg-black" value="Screen Printing Lanyard">Screen Printing Lanyard</option>
                      <option className="bg-black" value="Flex Printing">Flex Printing</option>
                      <option className="bg-black" value="Hording Print">Hording Print</option>
                      <option className="bg-black" value="Access Control System">Access Control System</option>
                      <option className="bg-black" value="CCTV">CCTV</option>
                      <option className="bg-black" value="Graphic Design">Graphic Design Services</option>
                    </motion.select>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-1 sm:space-y-2"
                >
                  <label className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-orange-400">
                    Order Details
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02, borderColor: "#f97316" }}
                    transition={{ duration: 0.2 }}
                    rows={3}
                    placeholder="Tell us about your requirements - quantity, design specifications, timeline, or any questions about bulk orders"
                    className="w-full border-b-2 border-white/20 bg-transparent py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold transition-colors focus:border-orange-400 focus:outline-none placeholder:text-gray-600 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-orange-400 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-black transition-all"
                >
                  SEND ORDER ENQUIRY
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <Send size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>

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