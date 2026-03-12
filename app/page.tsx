import { fetchActiveCategories } from '@/lib/categoryService';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';

import AboutPreviewSection from '@/components/home/AboutPreviewSection';
import EnquirySection from '@/components/home/EnquirySection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
// ✅ SERVER COMPONENT - Home Page
export default async function HomePage() {
  const categories = await fetchActiveCategories();
  const featuredCategories = categories.slice(0, 4);

  return (
    <div className="min-h-screen bg-[rgb(255,150,81)] overflow-hidden">
   
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#008080]/10 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#008080]/10 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />
            {/* Stats Counter Section Inspired by Template */}
      <section className="bg-black py-8 text-white border-y border-white/10 sm:py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6">
          <div className="grid grid-cols-4 gap-4 text-center xs:gap-6 sm:gap-8 md:gap-12 md:grid-cols-4">
            <div className="space-y-1 xs:space-y-2">
              <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-400">15+</p>
              <p className="text-[10px] xs:text-xs font-black uppercase tracking-widest text-gray-500">Years<br className="hidden xs:inline" /> Experience</p>
            </div>
            <div className="space-y-1 xs:space-y-2">
              <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-400">2K+</p>
              <p className="text-[10px] xs:text-xs font-black uppercase tracking-widest text-gray-500">Happy<br className="hidden xs:inline" /> Farmers</p>
            </div>
            <div className="space-y-1 xs:space-y-2">
              <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-400">50+</p>
              <p className="text-[10px] xs:text-xs font-black uppercase tracking-widest text-gray-500">Expert<br className="hidden xs:inline" /> Team</p>
            </div>
            <div className="space-y-1 xs:space-y-2">
              <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-400">100%</p>
              <p className="text-[10px] xs:text-xs font-black uppercase tracking-widest text-gray-500">Genuine<br className="hidden xs:inline" /> Spares</p>
            </div>
          </div>
        </div>
      </section>
       {/* Product Section */}
      <ProductSection featuredCategories={featuredCategories} />
<AboutPreviewSection/>
 {/* Visual Break with Featured Image Box like Template */}
      <div className="relative h-40 w-full bg-black xs:h-48 sm:h-64 md:h-80 lg:h-96">
        <div className="absolute inset-0 flex items-center justify-center px-2 xs:px-4">
          <div className="bg-orange-400 p-4 text-black xs:p-6 sm:p-8 md:p-12 lg:p-16 text-center w-full max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none">
            <h4 className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter break-words">
              QUALITY YOU<br className="xs:hidden" /> CAN TRUST
            </h4>
          </div>
        </div>
      </div>

     
<ServicesSection/>
      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      <TestimonialsSection/>
<EnquirySection/>

 
    </div>
  );
}
