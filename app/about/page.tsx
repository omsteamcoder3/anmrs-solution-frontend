"use client";

import { motion } from "framer-motion"
import { useRef } from "react"
import PageHeader from "@/components/ui/PageHeader";
import MissionVisionSection from "@/components/home/MissionVisionSection";
import { 
  CheckCircle2, Trophy, Users, ShieldCheck, 
  CreditCard, Package, Truck, BadgePercent, 
  Settings, Image, Lock, FileText, BarChart,
  Smartphone, Wallet, Home, PenTool
} from "lucide-react"

export default function AboutPage() {
  const sectionRef = useRef(null)

  return (
    <motion.div 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col overflow-x-hidden"
    >
      <PageHeader title="ABOUT US" subtitle="Anmrs IT Solutions Story" />

      {/* Main About Section */}
      <section className="bg-white py-12 sm:py-16 md:py-24 text-black overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-20 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <motion.h2 
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-400"
              >
                SINCE 2010
              </motion.h2>

              <motion.h3 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight sm:leading-none tracking-tighter"
              >
                SECURING <br className="hidden xs:block" />
                <motion.span 
                  initial={{ color: "#000000" }}
                  whileInView={{ color: "#f97316" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-orange-400"
                >
                  IDENTITIES
                </motion.span>
              </motion.h3>

              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg  leading-relaxed text-gray-700"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Anmrs IT Solutions is a trusted leader in ID card manufacturing, RFID technology, and security systems, serving businesses across India with premium quality products and reliable service since 2010.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  With a deep understanding of security and identification needs, Anmrs IT Solutions offers a comprehensive range of PVC cards, RFID solutions, NFC technology, and access control systems designed for modern businesses. Our goal is not just to sell products, but to provide complete identification solutions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  We believe that secure identification is an investment in your business's safety and professionalism. Our experienced team takes the time to understand each customer's unique requirements.
                </motion.p>
              </motion.div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
              {[
                {
                  icon: <Trophy size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />,
                  title: "Service Excellence",
                  desc: "Recognized for quality products and customer satisfaction in ID solutions.",
                  color: "orange",
                  bg: "gray"
                },
                {
                  icon: <Users size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />,
                  title: "Skilled Team",
                  desc: "Trained technical expertise in card manufacturing and security systems.",
                  color: "orange",
                  bg: "black"
                },
                {
                  icon: <ShieldCheck size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />,
                  title: "Quality Materials",
                  desc: "Premium PVC, RFID components, and durable printing guaranteed.",
                  color: "white",
                  bg: "orange"
                },
                {
                  icon: <CheckCircle2 size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />,
                  title: "Trust Built",
                  desc: "Trust earned through consistent quality and on-time delivery.",
                  color: "red",
                  bg: "gray"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all ${
                    item.bg === "black" 
                      ? "bg-black text-white" 
                      : item.bg === "orange"
                      ? "bg-orange-400 text-black"
                      : "bg-gray-50"
                  } ${idx === 0 ? "border-b-4 sm:border-b-8 border-orange-400" : idx === 3 ? "border-b-4 sm:border-b-8 border-red-500" : ""}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-3 sm:mb-4 md:mb-6 ${
                      item.color === "orange" ? "text-orange-400" : 
                      item.color === "red" ? "text-red-500" : 
                      item.bg === "orange" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-2xl font-black uppercase leading-tight">{item.title}</h4>
                  <p className={`text-xs sm:text-sm md:text-base  ${
                    item.bg === "black" ? "text-gray-400" : 
                    item.bg === "orange" ? "opacity-80" : 
                    "text-gray-500"
                  }`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionVisionSection />

      {/* Special Features Section */}
      <section className="bg-black py-12 sm:py-16 md:py-24 text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-400 px-2">
              WHAT MAKES US SPECIAL
            </h2>
            <motion.h3 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 sm:mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter px-2"
            >
              BEYOND PRODUCTS
            </motion.h3>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { title: "Customer-First", text: "We take the time to understand every client's identification needs." },
              { title: "Quick Delivery", text: "Fast turnaround and on-time delivery for all orders." },
              { title: "Design Expertise", text: "Professional graphic design support for custom requirements." },
              { title: "Pan-India Service", text: "Serving clients across India with reliable shipping." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group p-3 sm:p-4 md:p-6 lg:p-8 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 cursor-default"
              >
                <motion.span 
                  whileHover={{ scale: 1.1, color: "#f97316" }}
                  className="text-orange-400 font-black text-2xl sm:text-3xl md:text-4xl block mb-2 sm:mb-3 md:mb-4 lg:mb-6"
                >
                  0{i + 1}
                </motion.span>
                <motion.h4 
                  whileHover={{ x: 3 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase mb-2 sm:mb-3 md:mb-4"
                >
                  {item.title}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs sm:text-sm md:text-base  opacity-60 group-hover:opacity-100"
                >
                  {item.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute left-0 top-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full bg-orange-500 blur-2xl sm:blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute right-0 bottom-0 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 rounded-full bg-blue-500 blur-2xl sm:blur-3xl -z-10"
        />
      </section>

      {/* Products & E-Commerce Capabilities Section - refined from provided spec */}
      <section className="bg-white py-12 sm:py-16 md:py-24 text-black overflow-hidden border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-orange-400 px-2">
              MANUFACTURING & SOLUTIONS
            </h2>
            <motion.h3 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 sm:mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter px-2"
            >
              PRODUCT RANGE
            </motion.h3>
          </motion.div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {[
              { name: "ID Cards", icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />, items: "RFID, PVC, Access, NFC" },
              { name: "Lanyards", icon: <Package className="w-6 h-6 sm:w-8 sm:h-8" />, items: "Multicolor, Sublimation, Screen" },
              { name: "Flex Printing", icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />, items: "Hoardings, Banners" },
              { name: "Systems", icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />, items: "Access Control, CCTV" },
              { name: "Design Services", icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />, items: "Graphics, Projects" },
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "#f3f4f6" }}
                className="p-4 sm:p-5 md:p-6 bg-gray-50 rounded-2xl flex flex-col items-center text-center border border-gray-100 transition-colors"
              >
                <div className="p-3 bg-orange-100 text-orange-500 rounded-full mb-3">
                  {cat.icon}
                </div>
                <h4 className="text-sm sm:text-base md:text-lg font-black uppercase">{cat.name}</h4>
                <p className="text-xs text-gray-500  mt-1">{cat.items}</p>
              </motion.div>
            ))}
          </div>

          {/* E‑Commerce Platform Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 sm:mt-16 md:mt-20"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-center uppercase tracking-tight mb-6 sm:mb-8 md:mb-10">
              <span className="bg-orange-400 text-white px-4 py-2 inline-block">E‑COMMERCE READY</span>
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {[
                { icon: <Package size={20} />, title: "Product management", desc: "Simple & variable products, categories, tags, attributes" },
                { icon: <BadgePercent size={20} />, title: "Offers & Discounts", desc: "Coupons, price control, stock management" },
                { icon: <Truck size={20} />, title: "Cart to Checkout", desc: "Full order management, invoices, email notifications" },
                { icon: <Image size={20} />, title: "Media Control", desc: "Banner slider, product gallery, category banners from admin" },
                { icon: <Users size={20} />, title: "Roles & Permissions", desc: "Super Admin, Shop Manager, Content Editor" },
                { icon: <FileText size={20} />, title: "Content Management", desc: "Edit pages, projects, blog/news updates" },
                { icon: <Lock size={20} />, title: "Security & Logs", desc: "Password reset, login protection, activity logs" },
                { icon: <Wallet size={20} />, title: "Payments (India)", desc: "Razorpay, UPI, Net Banking, COD, Stripe/PayPal" },
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, borderColor: "#f97316" }}
                  className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl flex flex-col items-start gap-2 hover:shadow-md transition-shadow"
                >
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                    {feat.icon}
                  </div>
                  <h4 className="text-sm sm:text-base font-black uppercase">{feat.title}</h4>
                  <p className="text-xs text-gray-600 font-medium">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Contact / Identity Block (spec footer) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h4 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
                <ShieldCheck className="text-orange-400" /> Anmrs IT Solutions
              </h4>
              <p className="text-sm sm:text-base  text-gray-300 mt-1 max-w-xl">
                No.4A 3rd Street, Sanjay Gandhi Nagar, Chromepet Chennai - 6000044
              </p>
              <p className="text-xs sm:text-sm text-orange-300 font-mono mt-2">
                9884496177  |  id@anmrs.com  |  www.anmrs.com
              </p>
            </div>
            <div className="flex gap-2 self-end sm:self-auto">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Smartphone className="w-5 h-5 text-orange-400" />
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Home className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}