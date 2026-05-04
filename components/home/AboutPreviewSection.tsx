"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useEffect, useState, Fragment } from "react"

// Define the TypeScript interface for the about data
interface AboutData {
  _id?: string
  mainTitle: string
  badgeText: string
  paragraph1: string
  paragraph2: string
  buttonText: string
  buttonLink: string
  mainImage: string
  floatingImage: string
  floatingBadgeText: string
  metaTitle?: string
  metaDescription?: string
  isActive?: boolean
  version?: number
  createdAt?: string
  updatedAt?: string
}

interface ApiResponse {
  success: boolean
  data: AboutData
  message?: string
}

export default function AboutPreviewSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const API_URL = process.env.NEXT_PUBLIC_BASE_URL
      const response = await fetch(`${API_URL}/api/public/about`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const data: ApiResponse = await response.json()
      
      if (data.success && data.data) {
        setAboutData(data.data)
      } else {
        throw new Error('No data received from server')
      }
    } catch (error) {
      console.error('Error fetching about content:', error)
      setError(error instanceof Error ? error.message : 'Failed to load content')
      setAboutData(null)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string | undefined | null): string | null => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    if (imagePath.startsWith('/uploads')) {
      const API_URL = process.env.NEXT_PUBLIC_BASE_URL 
      return `${API_URL}${imagePath}`
    }
    return imagePath
  }

  // Helper function to render main title with line breaks
  const renderMainTitle = (title: string | undefined) => {
    if (!title) return null
    const lines = title.split('<br />')
    return lines.map((line, index) => (
      <Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ))
  }

  if (loading) {
    return (
      <section className="bg-orange-400 py-16 sm:py-20 md:py-24 text-black min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading about content...</p>
        </div>
      </section>
    )
  }

  if (error || !aboutData) {
    return (
      <section className="bg-orange-400 py-16 sm:py-20 md:py-24 text-black min-h-[600px] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg mb-2">Content unavailable</p>
          <p className="text-sm opacity-80">Please check back later</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="bg-orange-400 py-16 sm:py-20 md:py-24 text-black overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge Text */}
            {aboutData.badgeText && (
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <h2 className="text-[10px] xs:text-xs font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] sm:tracking-[0.4em] text-white">
                  {aboutData.badgeText}
                </h2>
              </motion.div>
            )}

            {/* Main Title */}
            {aboutData.mainTitle && (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter break-words">
                  {renderMainTitle(aboutData.mainTitle)}
                </h3>
              </motion.div>
            )}

            {/* Paragraphs */}
            {(aboutData.paragraph1 || aboutData.paragraph2) && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed opacity-90"
              >
                {aboutData.paragraph1 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {aboutData.paragraph1}
                  </motion.p>
                )}
                {aboutData.paragraph2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {aboutData.paragraph2}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Button */}
            {aboutData.buttonText && aboutData.buttonLink && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <Link
                  href={aboutData.buttonLink}
                  className="inline-flex items-center gap-2 sm:gap-4 border-b-2 sm:border-b-4 border-black pb-1 sm:pb-2 text-base sm:text-lg md:text-xl font-black uppercase tracking-wider sm:tracking-widest transition-all hover:border-white hover:text-white group"
                >
                  {aboutData.buttonText}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right Content - Images */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative mt-4 sm:mt-0"
          >
            {/* Main Image */}
            {aboutData.mainImage && getImageUrl(aboutData.mainImage) && (
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
                  src={getImageUrl(aboutData.mainImage) || ""}
                  alt={aboutData.badgeText}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            )}

            {/* Floating Image */}
            {aboutData.floatingImage && getImageUrl(aboutData.floatingImage) && (
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
                  src={getImageUrl(aboutData.floatingImage) || ""}
                  alt="PVC Cards & ID Cards"
                  className="h-full w-full rounded-full object-cover"
                />
              </motion.div>
            )}

            {/* Floating Badge Text */}
            {aboutData.floatingBadgeText && (
              <motion.div
                initial={{ x: 50, y: -30, opacity: 0, rotate: 10 }}
                whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="absolute -top-3 sm:-top-4 md:-top-5 -right-2 sm:-right-3 md:-right-4 bg-black text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-black text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider shadow-2xl whitespace-nowrap"
              >
                {aboutData.floatingBadgeText}
              </motion.div>
            )}
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