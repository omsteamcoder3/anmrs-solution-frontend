'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, Tag, Package, Shield } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="w-full py-12 sm:py-14 md:py-16 lg:py-24 bg-black" aria-label="Our E-Commerce Store">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
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
                  className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-orange-400"
                >
                  ONLINE STORE
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight"
                >
                  Shop with <br />Confidence
                </motion.h2>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="h-1 bg-orange-400"
                />
              </div>

              {/* Store Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-orange-400/10 to-transparent p-5 md:p-6 rounded-lg border-l-4 border-orange-400"
              >
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  📍 No.4A 3rd Street, Sanjay Gandhi Nagar, Chromepet Chennai - 6000044
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-orange-400">
                  <span className="text-sm md:text-base">📞 9884496177</span>
                  <span className="text-sm md:text-base">✉️ id@anmrs.com</span>
                  <span className="text-sm md:text-base">🌐 www.anmrs.com</span>
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
                className="grid grid-cols-2 gap-4 pt-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Secure Payments</p>
                    <p className="text-xs text-gray-400">Razorpay • UPI • COD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Fast Shipping</p>
                    <p className="text-xs text-gray-400">PAN India Delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Offers & Discounts</p>
                    <p className="text-xs text-gray-400">Coupons • Bulk Deals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Track Orders</p>
                    <p className="text-xs text-gray-400">Real-time Updates</p>
                  </div>
                </div>
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
            <div className="relative rounded-lg overflow-hidden group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/h2.webp"
                  alt="ANMRS IT Solutions - Online Store for Security Products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
            </div>

 
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Bottom Product Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "ID Cards",
              "RFID Cards",
              "PVC Cards",
              "Access Cards",
              "NFC Cards",
              "Lanyards",
              "Flex Printing",
              "Hording Print",
              "Access Control",
              "CCTV Systems",
              "Graphic Design"
            ].map((category, index) => (
              <span 
                key={index}
                className="text-xs sm:text-sm px-3 py-1.5 bg-gray-900 text-gray-300 rounded-full hover:bg-orange-400 hover:text-black transition-colors duration-300 cursor-default"
              >
                {category}
              </span>
            ))}
          </div>
          {/* Payment Methods Row */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 pt-4 border-t border-gray-800/50">
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