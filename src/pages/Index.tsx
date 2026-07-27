import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TechnologiesSection from '@/components/home/TechnologiesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
import RealResults from '@/components/section/RealResult';
import OffersSection from '@/components/section/OffersSection';
const Index = () => {
  return (
    <>
      <HeroSection />
      <OffersSection />
      <ServicesSection />
      <RealResults/>
      <TechnologiesSection />
      <WhyUsSection />
      {/* <CTASection /> */}
    </>
  );
};

export default Index;
