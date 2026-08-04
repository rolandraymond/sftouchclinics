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
      title: t.services?.dermatology?.title || (isRTL ? 'الجلدية والليزر' : 'Dermatology & Laser'),
      description: t.services?.dermatology?.description || (isRTL ? 'بروتوكولات متقدمة لتوحيد لون البشرة وإزالة التصبغات، مع أحدث تقنيات الليزر الآمنة لإزالة الشعر بدون ألم.' : 'Advanced protocols for skin tone evening and pigmentation removal, with the latest safe laser tech.'),
      icon: Sparkles,
      image: '/images/64b91e60ee991bc3355749ae_laser.jpeg',
      href: '/services/dermatology-laser',
      accent: 'text-amber-500',
      bgAccent: 'bg-amber-500'
    },
    {
      id: '02',
      title: t.services?.nutrition?.title || (isRTL ? 'نحت القوام' : 'Nutrition & Contouring'),
      description: t.services?.nutrition?.description || (isRTL ? 'برامج طبية مخصصة للوصول للوزن المثالي، مقترنة بأحدث أجهزة تفتيت الدهون ونحت الجسم غير الجراحي.' : 'Customized medical programs for ideal weight, paired with non-surgical fat freezing and contouring.'),
      icon: Apple,
      image: '/images/images (5).jpg',
      href: '/services/nutrition-contouring',
      accent: 'text-emerald-500',
      bgAccent: 'bg-emerald-500'
    },
    {
      id: '03',
      title: t.services?.hair?.title || (isRTL ? 'علاج وتجميل الشعر' : 'Hair Restoration'),
      description: t.services?.hair?.description || (isRTL ? 'علاجات مبتكرة لتساقط الشعر، حقن البلازما، وتقنيات حديثة لاستعادة كثافة وحيوية الشعر بشكل طبيعي.' : 'Innovative treatments for hair loss, PRP injections, and modern tech to restore density and vitality naturally.'),
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
          className={cn("mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8", isRTL ? "md:flex-row-reverse" : "")}
        >
          <div className={isRTL ? "text-right" : "text-left"}>
            <div className={cn("flex items-center gap-3 mb-4", isRTL ? "justify-end" : "justify-start")}>
              <span className="h-px w-10 bg-amber-600"></span>
              <span className="text-amber-700 font-bold text-sm tracking-widest uppercase">
                {isRTL ? 'فن العناية والتجميل' : 'The Art of Care'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[1.1] font-cairo">
              {isRTL ? (
                <>رحلتك نحو <span className="italic font-light text-slate-500">الكمال</span> <br /> تبدأ من هنا.</>
              ) : (
                <>Your journey to <span className="italic font-light text-slate-500">Perfection</span> <br /> begins here.</>
              )}
            </h2>
          </div>
          
          <div className={isRTL ? "text-right md:text-left" : "text-left md:text-right"}>
             <Link 
               to="/services" 
               className={cn(
                 "inline-flex items-center gap-2 pb-1 border-b-2 border-slate-900 text-slate-900 font-bold hover:text-amber-600 hover:border-amber-600 transition-colors duration-300",
                 isRTL ? "flex-row-reverse" : ""
               )}
             >
               {isRTL ? 'عرض كل الخدمات' : 'View All Services'}
               <ArrowUpRight className={cn("w-5 h-5", isRTL ? "-scale-x-100" : "")} />
             </Link>
          </div>
        </motion.div>

        {/* ================= INTERACTIVE EDITORIAL LAYOUT ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: Dynamic Image Showcase (Sticky) */}
          <motion.div 
            style={{ y: yBg }}
            className={cn(
              "lg:col-span-6 sticky top-32 h-[450px] lg:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 order-2",
              isRTL ? "lg:order-1" : "lg:order-1"
            )}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Floating Icon Badge on Image */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={cn("absolute bottom-8 z-20 flex items-center gap-4", isRTL ? "right-8 flex-row-reverse" : "left-8")}
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    {React.createElement(services[activeIndex].icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-white font-bold text-xl tracking-wide font-cairo shadow-black/50 drop-shadow-lg">
                    {services[activeIndex].title}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT SIDE: Interactive Accordion List */}
          <div className={cn("lg:col-span-6 flex flex-col justify-center order-1", isRTL ? "lg:order-2" : "lg:order-2")}>
            <div className="flex flex-col border-t border-slate-200">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <div 
                    key={service.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)} // For Mobile
                    className={cn(
                      "group relative border-b border-slate-200 py-8 cursor-pointer transition-all duration-500",
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    )}
                  >
                    {/* Active Background Highlight (Subtle) */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeServiceBg" 
                        className="absolute inset-0 bg-white shadow-[0_0_40px_rgba(0,0,0,0.03)] -z-10 rounded-3xl -mx-6 px-6" 
                      />
                    )}

                    <div className={cn("flex items-center justify-between", isRTL ? "flex-row-reverse" : "")}>
                      <div className={cn("flex items-center gap-6", isRTL ? "flex-row-reverse" : "")}>
                        {/* Huge Number */}
                        <span className={cn(
                          "text-5xl md:text-6xl font-black font-serif transition-colors duration-500",
                          isActive ? service.accent : "text-slate-300"
                        )}>
                          {service.id}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-cairo">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Arrow Icon */}
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                        isActive ? `border-transparent ${service.bgAccent} text-white` : "border-slate-200 text-slate-400",
                        isRTL ? (isActive ? "-rotate-45" : "rotate-180") : (isActive ? "rotate-45" : "rotate-0")
                      )}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Expandable Description (Accordion) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className={cn("pt-6 pb-2", isRTL ? "pl-0 pr-[88px] text-right" : "pr-0 pl-[88px] text-left")}>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                              {service.description}
                            </p>
                            <Link 
                              to={service.href}
                              className={cn(
                                "inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-colors",
                                service.accent,
                                isRTL ? "flex-row-reverse" : ""
                              )}
                            >
                              <span>{isRTL ? 'التفاصيل' : 'Discover Details'}</span>
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