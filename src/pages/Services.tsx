import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Apple, Scissors, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const Services = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Parallax Effect for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const services = [
    {
      id: '01',
      title: isRTL 
        ? 'الجلدية والليزر' 
        : (t.services?.dermatology?.title || 'Dermatology & Laser'),
      description: isRTL 
        ? 'علاجات متقدمة للبشرة وإجراءات الليزر والحقن التجميلية، بإشراف أطباء جلدية متخصصين.' 
        : (t.services?.dermatology?.description || 'Advanced skin treatments, laser procedures, and cosmetic injections supervised by specialist dermatologists.'),
      buttonText: isRTL ? 'التفاصيل' : 'Discover Details',
      icon: Sparkles,
      image: '/images/64b91e60ee991bc3355749ae_laser.jpeg',
      href: '/services/dermatology-laser',
      accent: 'text-amber-500',
      bgAccent: 'bg-amber-500'
    },
    {
      id: '02',
      title: isRTL 
        ? 'التغذية العلاجية ونحت الجسم' 
        : (t.services?.nutrition?.title || 'Clinical Nutrition & Body Contouring'),
      description: isRTL 
        ? 'خطط غذائية مخصصة وتقنيات متقدمة لنحت الجسم، منها أجهزة نحت الجسم، حسب احتياجات كل حالة.' 
        : (t.services?.nutrition?.description || 'Customized nutrition plans and advanced body contouring technologies tailored to individual needs.'),
      buttonText: isRTL ? 'التفاصيل' : 'Discover Details',
      icon: Apple,
      image: '/images/images (5).jpg',
      href: '/services/nutrition-contouring',
      accent: 'text-emerald-500',
      bgAccent: 'bg-emerald-500'
    },
    {
      id: '03',
      title: isRTL 
        ? 'زراعة وعلاج الشعر' 
        : (t.services?.hair?.title || 'Hair Restoration & Treatment'),
      description: isRTL 
        ? 'زراعة الشعر وعلاجات متطورة لتحسين كثافة الشعر ومظهره، مع خطة تناسب كل حالة.' 
        : (t.services?.hair?.description || 'Hair transplantation and advanced treatments to restore density and appearance tailored to each case.'),
      buttonText: isRTL ? 'التفاصيل' : 'Discover Details',
      icon: Scissors,
      image: '/images/6485892b-1ae1-45e5-b3dc-6aa57ed65001-1.png',
      href: '/services/hair-restoration',
      accent: 'text-rose-500',
      bgAccent: 'bg-rose-500'
    },
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      dir={isRTL ? "rtl" : "ltr"}
      className="relative pt-32 pb-32 bg-[#FAFAFA] overflow-hidden selection:bg-slate-900 selection:text-white"
    >
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 text-start"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-amber-600"></span>
              <span className="text-amber-700 font-bold text-sm tracking-widest uppercase font-cairo">
                {isRTL ? 'صفحة خدماتنا' : 'Our Services'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[1.2] font-cairo mb-4">
              {isRTL ? 'تخصصات متكاملة لرعاية أفضل' : 'Integrated Specialties for Better Care'}
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium font-cairo">
              {isRTL 
                ? 'من الجلدية والليزر، للتغذية ونحت الجسم، وزراعة وعلاج الشعر.. كل الخدمات تحت سقف واحد، بخبرة طبية وتقنيات متطورة.' 
                : 'From dermatology and laser to nutrition, body contouring, and hair restoration... all services under one roof with medical expertise and advanced technologies.'}
            </p>
          </div>
          
          <div className="shrink-0">
             <Link 
               to="/services" 
               className="inline-flex items-center gap-2 pb-1 border-b-2 border-slate-900 text-slate-900 font-bold hover:text-amber-600 hover:border-amber-600 transition-colors duration-300 font-cairo"
             >
               <span>{isRTL ? 'عرض الخدمات' : 'View All Services'}</span>
               <ArrowUpRight className={cn("w-5 h-5 transition-transform", isRTL ? "-scale-x-100" : "")} />
             </Link>
          </div>
        </motion.div>

        {/* ================= INTERACTIVE EDITORIAL LAYOUT ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT/RIGHT SIDE: Dynamic Image Showcase (Sticky) */}
          <motion.div 
            style={{ y: yBg }}
            className="lg:col-span-6 sticky top-32 h-[450px] lg:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-100"
              >
                <img 
                  src={services[activeIndex].image} 
                  alt={services[activeIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Floating Icon Badge on Image */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-8 start-8 end-8 z-20 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0">
                    {React.createElement(services[activeIndex].icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-white font-bold text-xl md:text-2xl tracking-wide font-cairo shadow-black/50 drop-shadow-lg">
                    {services[activeIndex].title}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT/LEFT SIDE: Interactive Accordion List */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex flex-col border-t border-slate-200">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <div 
                    key={service.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative border-b border-slate-200 py-8 cursor-pointer transition-all duration-500 text-start",
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    )}
                  >
                    {/* Active Background Highlight */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeServiceBg" 
                        className="absolute inset-0 bg-white shadow-[0_0_40px_rgba(0,0,0,0.03)] -z-10 rounded-3xl -mx-6 px-6" 
                      />
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        {/* Service Number */}
                        <span className={cn(
                          "text-4xl md:text-6xl font-black font-serif transition-colors duration-500 shrink-0",
                          isActive ? service.accent : "text-slate-300"
                        )}>
                          {service.id}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-xl md:text-3xl font-bold text-slate-900 font-cairo">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Interactive Arrow Button */}
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0",
                        isActive ? `border-transparent ${service.bgAccent} text-white` : "border-slate-200 text-slate-400"
                      )}>
                        <ArrowRight className={cn(
                          "w-5 h-5 transition-transform duration-300",
                          isRTL ? "rotate-180" : "rotate-0",
                          isActive && (isRTL ? "-translate-x-1" : "translate-x-1")
                        )} />
                      </div>
                    </div>

                    {/* Expandable Description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          {/* ps-16 md:ps-24 تضمن محاذاة النص والزر بشكل دقيق تحت العنوان تماماً باللغتين */}
                          <div className="pt-6 pb-2 ps-16 md:ps-[88px]">
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-medium font-cairo">
                              {service.description}
                            </p>
                            <Link 
                              to={service.href}
                              className={cn(
                                "inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-colors font-cairo",
                                service.accent
                              )}
                            >
                              <span>{service.buttonText}</span>
                              <ArrowRight className={cn("w-4 h-4", isRTL ? "rotate-180" : "")} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;