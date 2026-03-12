"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CreditCard, Rss, Printer, Fingerprint, Camera, Palette, ScanLine, Smartphone, BadgeCheck, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function HeroSection() {
  const sectionRef = useRef(null)

  const services = [
    {
      title: "ID Card Manufacturing",
      icon: <CreditCard size={24} />,
    },
    {
      title: "RFID Solutions",
      icon: <Rss size={24} />,
    },
    {
      title: "Lanyard Printing",
      icon: <Printer size={24} />,
    },
    {
      title: "Access Control Systems",
      icon: <Fingerprint size={24} />,
    },
    {
      title: "CCTV Installation",
      icon: <Camera size={24} />,
    },
    {
      title: "Graphic Design",
      icon: <Palette size={24} />,
    },
    {
      title: "NFC Technology",
      icon: <ScanLine size={24} />,
    },
    {
      title: "Flex & Hording",
      icon: <Smartphone size={24} />,
    },
    {
      title: "PVC Cards",
      icon: <BadgeCheck size={24} />,
    },
  ]

  // Duplicate services array to create seamless infinite scroll
  const scrollingItems = [...services, ...services, ...services]

  return (
    <section ref={sectionRef} className="relative h-[350px]  w-full overflow-hidden bg-black text-white sm:h-[900px]">
      {/* Large Template Style Number "ANMRS" */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute right-10 bottom-32 hidden font-black text-white/10 lg:block lg:text-[18rem] leading-none select-none "
      >
        ANMRS
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4  -mt-60 sm:mt-30">
        {/* Mobile: grid-cols-2 for side-by-side, lg: revert to grid-cols-1 for original layout? Wait, original had lg:grid-cols-2. We keep grid-cols-2 always but control widths */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
          {/* Left Content - takes appropriate width */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 max-w-full col-span-1 -mt-10">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="inline-block bg-orange-400 px-2 -py-2 sm:px-3 sm:py-1.5 md:px-6 md:py-2"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.1em] text-black xs:text-[9px] sm:text-xs md:text-sm md:tracking-[0.3em]">
                ID CARDS & RFID
              </span>
            </motion.div>

            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-[8rem] font-black uppercase leading-[1.1] tracking-tighter"
            >
              SECURE <br />
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-orange-400 inline-block"
              >
                IDENTITY
              </motion.span> <br />
              SOLUTIONS
            </motion.h1>

            <motion.p 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="max-w-xl text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-relaxed text-gray-300"
            >
              Premium ID Cards, RFID Technology, Access Control Systems, and Professional Printing Services.
            </motion.p>

     <motion.div 
  initial={{ y: 50, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
  className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-4 pt-3 sm:pt-5"
>
  <Link
    href="/contact"
    className="group flex items-center justify-center gap-2 bg-white
    px-3 py-1.5
    sm:px-6 sm:py-3
    md:px-7 md:py-3.5
    lg:px-8 lg:py-4
    text-xs sm:text-base md:text-lg
    font-black uppercase tracking-wider text-black
    transition-all hover:bg-orange-400 hover:text-white whitespace-nowrap"
  >
    GET QUOTE

    <motion.div
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
    </motion.div>
  </Link>

  <Link
    href="/products"
    className="flex items-center justify-center gap-2 border border-white/30
    px-3 py-1.5
    sm:px-6 sm:py-3
    md:px-7 md:py-3.5
    lg:px-8 lg:py-4
    text-xs sm:text-base md:text-lg
    font-black uppercase tracking-wider text-white
    backdrop-blur-sm transition-all hover:bg-white/10 whitespace-nowrap"
  >
    VIEW PRODUCTS
  </Link>
</motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
 
            className="relative h-[220px] xs:h-[150px] sm:h-[200px] md:h-[300px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] w-full col-span-1">
            <div className="absolute inset-0">
              <Image
                src="/images/hero.webp"
                alt="Hero Image"
                fill
                className="object-cover object-left scale-140 sm:scale-150 -mt-5"
                priority
              />
            </div>
      
          </motion.div>
        </div>

        {/* Animated decorative elements - moved inside container but positioned absolutely */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute bottom-40 right-20 h-64 w-64 rounded-full bg-orange-400 blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute left-20 top-40 h-96 w-96 rounded-full bg-blue-500 blur-3xl -z-10"
        />
      </div>

      <div className="absolute w-full bottom-0 left-0 right-0 overflow-hidden border-t border-white/10 bg-orange-400 py-2 sm:py-10">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className="flex whitespace-nowrap"
        >
          {scrollingItems.map((service, index) => (
            <div key={index} className="flex items-center mx-4">
              <span className="flex items-center gap-2 text-md sm:text-3xl font-extrabold uppercase tracking-wider text-black">
                {service.icon}
                {service.title}
              </span>
              <Star className="ml-4 h-6 w-6 fill-black text-black" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}