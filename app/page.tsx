import { fetchActiveCategories } from '@/lib/categoryService';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import AboutPreviewSection from '@/components/home/AboutPreviewSection';
import EnquirySection from '@/components/home/EnquirySection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsCounter from '@/components/home/StatsCounter';
import DesignUploadSection from '@/components/home/DesignUploadSection';

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
      
      {/* Stats Counter Section with Animation */}
      <StatsCounter />
      
      {/* Product Section */}
      <ProductSection featuredCategories={featuredCategories} />
      
      <AboutPreviewSection/>
      

      <ServicesSection/>
   
      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
         <DesignUploadSection/>
      <TestimonialsSection/>
      
      <EnquirySection/>
    </div>
  );
}