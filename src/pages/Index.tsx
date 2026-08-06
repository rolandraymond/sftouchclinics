import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TechnologiesSection from '@/components/home/TechnologiesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
//import RealResults from '@/components/section/RealResult';
import OffersSection from '@/components/section/OffersSection';
import Cases3DCarousel from  '@/components/home/Carousel';
import AIGeneratorSection from '@/components/home/AIGeneratorSection';
const Index = () => {
  return (
    <>
      <HeroSection />
      <OffersSection />
      <ServicesSection />
      <Cases3DCarousel />
      <AIGeneratorSection />
      {/* <RealResults/> */}
      <TechnologiesSection />
      <WhyUsSection />
      {/* <CTASection /> */}
    </>
  );
};

export default Index;
