import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, ChevronLeft, Sparkles, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// ================= REAL DATA (تم دمج مسارات الصور الجديدة وتصنيفها) =================
const casesData = [
  {
    id: 1,
    image: '/images/cases/Acne-scar-treatment.png',
    title: 'Acne Scar Treatment',
    titleAr: 'علاج ندبات حب الشباب',
    category: 'Skin Care',
    categoryAr: 'عناية بالبشرة',
  },
  {
    id: 2,
    image: '/images/cases/acne-scare.png',
    title: 'Acne Scar',
    titleAr: 'ندبات حب الشباب',
    category: 'Skin Care',
    categoryAr: 'عناية بالبشرة',
  },
  {
    id: 3,
    image: '/images/cases/Biostimulator(Poly-L-Lactic Acid).png',
    title: 'Biostimulator (PLLA)',
    titleAr: 'محفزات الكولاجين',
    category: 'Aesthetics',
    categoryAr: 'تجميل',
  },
  {
    id: 4,
    image: '/images/cases/Exosome-hair-treatment.png',
    title: 'Exosome Hair Treatment',
    titleAr: 'علاج الشعر بالإكسوسوم',
    category: 'Hair Care',
    categoryAr: 'عناية بالشعر',
  },
  {
    id: 5,
    image: '/images/cases/Filler-Chin.png',
    title: 'Chin Filler',
    titleAr: 'فيلر الذقن',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 6,
    image: '/images/cases/Filler-Chin1.png',
    title: 'Chin Filler',
    titleAr: 'فيلر الذقن',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 7,
    image: '/images/cases/Filler-Jawline.png',
    title: 'Jawline Filler',
    titleAr: 'تحديد الفك',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 8,
    image: '/images/cases/Filler-Jawline1.png',
    title: 'Jawline Filler',
    titleAr: 'تحديد الفك',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 9,
    image: '/images/cases/Filler-Jawline2.png',
    title: 'Jawline Filler',
    titleAr: 'تحديد الفك',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 10,
    image: '/images/cases/Filler-Lip-Booster.png',
    title: 'Lip Booster',
    titleAr: 'تورد الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 11,
    image: '/images/cases/Filler-Lip.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 12,
    image: '/images/cases/Filler-Lip1.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 13,
    image: '/images/cases/Filler-Lip2.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 14,
    image: '/images/cases/Filler-Lip3.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 15,
    image: '/images/cases/Filler-Lip4.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 16,
    image: '/images/cases/Filler-Lip5.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 17,
    image: '/images/cases/Filler-Lip6.png',
    title: 'Lip Filler',
    titleAr: 'فيلر الشفايف',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 18,
    image: '/images/cases/Filler-Under-Eye.png',
    title: 'Under Eye Filler',
    titleAr: 'فيلر تحت العين',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 19,
    image: '/images/cases/Filler-Under-Eye1.png',
    title: 'Under Eye Filler',
    titleAr: 'فيلر تحت العين',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 20,
    image: '/images/cases/Filler-Under-Eye2.png',
    title: 'Under Eye Filler',
    titleAr: 'فيلر تحت العين',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 21,
    image: '/images/cases/Hair-transplant.png',
    title: 'Hair Transplant',
    titleAr: 'زراعة الشعر',
    category: 'Hair Care',
    categoryAr: 'عناية بالشعر',
  },
  {
    id: 22,
    image: '/images/cases/Liquid-Face-Lift.png',
    title: 'Liquid Face Lift',
    titleAr: 'شد الوجه السائل',
    category: 'Aesthetics',
    categoryAr: 'تجميل',
  },
  {
    id: 23,
    image: '/images/cases/Liquid-Face-Lift1.png',
    title: 'Liquid Face Lift',
    titleAr: 'شد الوجه السائل',
    category: 'Aesthetics',
    categoryAr: 'تجميل',
  },
  {
    id: 24,
    image: '/images/cases/Plla.png',
    title: 'PLLA',
    titleAr: 'بلا',
    category: 'PLLA',
    categoryAr: 'بلا',
  },
  {
    id: 25,
    image: '/images/cases/Skin-Booster.jpg',
    title: 'Skin Booster',
    titleAr: 'إبر النضارة',
    category: 'Skin Care',
    categoryAr: 'عناية بالبشرة',
  },
  {
    id: 26,
    image: '/images/cases/Skin-Tag-Removal.png',
    title: 'Skin Tag Removal',
    titleAr: 'إزالة الزوائد الجلدية',
    category: 'Skin Care',
    categoryAr: 'عناية بالبشرة',
  },
  {
    id: 27,
    image: '/images/cases/Temple-area-filler.png',
    title: 'Temple Area Filler',
    titleAr: 'فيلر منطقة الصدغ',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
];

// استخراج الأقسام الفريدة من الداتا
const extractCategories = () => {
  const cats = [{ id: 'All', label: 'All', labelAr: 'الكل' }];
  const uniqueCats = Array.from(new Set(casesData.map((item) => item.category)));
  
  uniqueCats.forEach((cat) => {
    const item = casesData.find((c) => c.category === cat);
    if (item) {
      cats.push({ id: cat, label: cat, labelAr: item.categoryAr });
    }
  });
  return cats;
};

const filterCategories = extractCategories();

const Cases3DCarousel = () => {
  const { isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // فلترة الحالات بناءً على القسم النشط
  const filteredCases = useMemo(() => {
    if (activeCategory === 'All') return casesData;
    return casesData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // عند تغيير القسم، نعود لأول صورة
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const nextSlide = useCallback(() => {
    if (filteredCases.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
  }, [filteredCases.length]);

  const prevSlide = useCallback(() => {
    if (filteredCases.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCases.length) % filteredCases.length);
  }, [filteredCases.length]);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered || filteredCases.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, filteredCases.length]);

  // حساب موضع الـ 3D بناءً على الحالات المفلترة فقط
  const getOffset = (index: number) => {
    const diff = index - currentIndex;
    const half = Math.floor(filteredCases.length / 2);
    let offset = diff;
    
    if (offset > half) offset -= filteredCases.length;
    if (offset < -half) offset += filteredCases.length;
    
    return offset;
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative py-32 bg-[#FDFCF8] overflow-hidden selection:bg-amber-100 selection:text-amber-900"
    >
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-300/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></span>
            <span className="text-amber-700 font-bold text-sm tracking-[0.2em] uppercase font-cairo flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {isRTL ? 'معرض الحالات' : 'Cases Gallery'}
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.2] font-cairo mb-6">
            {isRTL ? (
              <>
                قصص نجاح <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-600">تتحدث عن نفسها</span>
              </>
            ) : (
              <>
                Success Stories <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-600">Speaking Volumes</span>
              </>
            )}
          </h2>
        </motion.div>

        {/* ================= CREATIVE FILTER BAR ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/60 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="hidden md:flex items-center justify-center px-4 text-slate-400">
              <Filter className="w-4 h-4" />
            </div>
            <div className="w-px h-6 bg-slate-200 hidden md:block mr-2" />
            
            {filterCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative px-6 py-2.5 text-sm md:text-base font-bold font-cairo rounded-full transition-colors duration-300",
                    isActive ? "text-white" : "text-slate-600 hover:text-amber-600"
                  )}
                >
                  {/* Sliding Highlight Effect */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {isRTL ? category.labelAr : category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ================= 3D CAROUSEL CONTAINER ================= */}
        <div 
          className="relative h-[450px] md:h-[600px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const dirMultiplier = isRTL ? -1 : 1;

              // 3D Math Logic
              const xOffset = offset * 25 * dirMultiplier; 
              const rotateY = offset * -35 * dirMultiplier; 
              const scale = 1 - Math.abs(offset) * 0.15;
              const zOffset = -Math.abs(offset) * 150;
              const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3;
              const zIndex = 50 - Math.abs(offset);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (offset !== 0) setCurrentIndex(index);
                  }}
                  layout // Makes the cards adjust smoothly when filtering
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    x: `${xOffset}%`,
                    rotateY: rotateY,
                    scale: scale,
                    z: zOffset,
                    opacity: opacity,
                    zIndex: zIndex,
                    y: 0
                  }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  className={cn(
                    "absolute top-0 w-[280px] md:w-[400px] h-full rounded-[2.5rem] overflow-hidden",
                    isCenter ? "shadow-[0_30px_60px_rgba(217,119,6,0.2)] cursor-default" : "shadow-xl cursor-pointer"
                  )}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-slate-950">
                    <img
                      src={item.image}
                      alt={isRTL ? item.titleAr : item.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512496015851-a1c8caac2126?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                  </div>

                  {/* Overlays */}
                  <div 
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      isCenter ? "bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" : "bg-slate-900/60"
                    )} 
                  />

                  {/* Content inside the Active Card */}
                  <div 
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transition-all duration-500 delay-100",
                      isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                  >
                    <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
                      {isRTL ? item.categoryAr : item.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-cairo leading-tight">
                      {isRTL ? item.titleAr : item.title}
                    </h3>
                  </div>

                  {/* Golden Border for Active Card */}
                  {isCenter && (
                    <motion.div 
                      layoutId="activeCardBorder"
                      className="absolute inset-0 rounded-[2.5rem] border-2 border-amber-400/50 pointer-events-none" 
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* رسالة حالة فارغة (لو القسم مفيهوش صور) */}
          {filteredCases.length === 0 && (
            <div className="absolute flex flex-col items-center justify-center text-slate-400">
              <Sparkles className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-cairo text-lg">
                {isRTL ? 'لا توجد حالات مسجلة في هذا القسم حالياً' : 'No cases available in this category currently'}
              </p>
            </div>
          )}
        </div>

        {/* ================= CONTROLS ================= */}
        {filteredCases.length > 1 && (
          <motion.div 
            layout
            className="flex items-center justify-center gap-6 mt-16 relative z-20"
          >
            <button
              onClick={isRTL ? nextSlide : prevSlide}
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-slate-200 text-slate-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 active:scale-90 bg-white/50 backdrop-blur-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2 bg-white/50 backdrop-blur-sm p-3 rounded-full border border-slate-100 shadow-sm">
              {filteredCases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    currentIndex === idx 
                      ? "w-8 bg-amber-500" 
                      : "w-2 bg-slate-300 hover:bg-amber-300"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={isRTL ? prevSlide : nextSlide}
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-slate-200 text-slate-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 active:scale-90 bg-white/50 backdrop-blur-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Cases3DCarousel;