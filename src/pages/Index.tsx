import Navbar from "@/components/restaurant/Navbar";
import HeroSection from "@/components/restaurant/HeroSection";
import AboutSection from "@/components/restaurant/AboutSection";
import MenuSection from "@/components/restaurant/MenuSection";
import GallerySection from "@/components/restaurant/GallerySection";
import WhyChooseSection from "@/components/restaurant/WhyChooseSection";
import TestimonialsSection from "@/components/restaurant/TestimonialsSection";
import ReviewForm from "@/components/restaurant/ReviewForm";
import ContactSection from "@/components/restaurant/ContactSection";
import Footer from "@/components/restaurant/Footer";
import StickyCTA from "@/components/restaurant/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ReviewForm />
      <ContactSection />
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
