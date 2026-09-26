import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Offers from "./pages/Offers";
import ContactUs from "./pages/ContactUs";
import DermatologyLaser from "./pages/DermatologyLaser";
import NutritionContouring from "./pages/NutritionContouring";
import HairRestoration from "./pages/HairRestoration";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Preloader from "@/components/effects/Preloader";
import BookingSection from "./pages/BookingSection";
import Booking from './pages/Booking';



const queryClient = new QueryClient();


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
         
          <ScrollToTop />
          
          <Layout>
            <Preloader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/dermatology-laser" element={<DermatologyLaser />} />
              <Route path="/services/nutrition-contouring" element={<NutritionContouring />} />
              <Route path="/services/hair-restoration" element={<HairRestoration />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="*" element={<NotFound />} />
              
            </Routes>
            
                    <WhatsAppButton />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App; 