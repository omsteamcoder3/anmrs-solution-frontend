"use client";

import { motion } from "framer-motion"
import { useRef } from "react"
import PageHeader from "@/components/ui/PageHeader";
import EnquirySection from "@/components/home/EnquirySection";
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export default function ContactPage() {
  const sectionRef = useRef(null)

  return (
    <motion.div 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col overflow-x-hidden"
    >
      <PageHeader title="CONTACT US" subtitle="Visit Anmrs IT Solutions" />

      <section className="bg-white py-12 sm:py-16 md:py-24 text-black overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-3">
            {/* Info Cards */}
            <div className="space-y-6 sm:space-y-8">
              {/* Location Card */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ 
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  x: 10,
                  transition: { duration: 0.3 }
                }}
                className="group border-l-4 sm:border-l-8 border-orange-400 bg-gray-50 p-6 sm:p-8 md:p-10 transition-all cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <MapPin className="mb-4 sm:mb-6 text-orange-400" size={32} />
                </motion.div>
                <h4 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black uppercase">Our Location</h4>
                <p className="text-sm sm:text-base  text-gray-500 group-hover:text-gray-400">
                  No.4A 3rd Street, Sanjay Gandhi Nagar, <br className="hidden xs:block" />
                  Chromepet, Chennai, <br className="hidden xs:block" />
                  Tamil Nadu - 600044
                </p>
              </motion.div>

              {/* Phone Card */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ 
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  x: 10,
                  transition: { duration: 0.3 }
                }}
                className="group border-l-4 sm:border-l-8 border-orange-400 bg-gray-50 p-6 sm:p-8 md:p-10 transition-all cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Phone className="mb-4 sm:mb-6 text-orange-400" size={32} />
                </motion.div>
                <h4 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black uppercase">Call / WhatsApp</h4>
                <motion.p 
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-orange-400 break-words"
                >
                  98844 96177
                </motion.p>
                <p className="mt-2 text-sm sm:text-base  text-gray-500 group-hover:text-gray-400">Mon-Sat, 9am - 7pm</p>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ 
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  x: 10,
                  transition: { duration: 0.3 }
                }}
                className="group border-l-4 sm:border-l-8 border-orange-400 bg-gray-50 p-6 sm:p-8 md:p-10 transition-all cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Mail className="mb-4 sm:mb-6 text-orange-400" size={32} />
                </motion.div>
                <h4 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black uppercase">Email Us</h4>
                <p className="text-lg sm:text-xl  text-orange-400 break-all">id@anmrs.com</p>
                <p className="mt-2 text-sm sm:text-base  text-gray-500 group-hover:text-gray-400 break-all">www.anmrs.com</p>
              </motion.div>

              {/* Hours Card */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ 
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  x: 10,
                  transition: { duration: 0.3 }
                }}
                className="group border-l-4 sm:border-l-8 border-orange-400 bg-gray-50 p-6 sm:p-8 md:p-10 transition-all cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Clock className="mb-4 sm:mb-6 text-orange-400" size={32} />
                </motion.div>
                <h4 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black uppercase">Opening Hours</h4>
                <div className="space-y-2 sm:space-y-1  text-gray-500 group-hover:text-gray-400">
                  <motion.p 
                    whileHover={{ x: 5 }}
                    className="flex flex-col xs:flex-row justify-between gap-1 text-sm sm:text-base"
                  >
                    <span>Mon - Sat:</span> 
                    <span className="text-orange-400">9:00 AM - 7:00 PM</span>
                  </motion.p>
                  <motion.p 
                    whileHover={{ x: 5 }}
                    className="flex flex-col xs:flex-row justify-between gap-1 text-sm sm:text-base"
                  >
                    <span>Sunday:</span> 
                    <span className="text-gray-400">Closed</span>
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="lg:col-span-2"
            >
              <motion.div 
                whileHover={{ scale: 1.02}}
                transition={{ duration: 0.5 }}
                className="h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] border-4 sm:border-8 border-black shadow-2xl grayscale hover:grayscale-0"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.234567891234!2d80.1394!3d12.9455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f123456789%3A0x123456789abcdef!2sSanjay%20Gandhi%20Nagar%2C%20Chromepet%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1625484839282!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="w-full h-full"
                  title="Google Maps - Anmrs IT Solutions Location"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute left-10 sm:left-20 top-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full bg-orange-500 blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute right-10 sm:right-20 bottom-10 sm:bottom-20 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full bg-blue-500 blur-3xl -z-10"
        />
      </section>

      <EnquirySection />
    </motion.div>
  )
}