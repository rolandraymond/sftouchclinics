import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, ChevronLeft, Sparkles, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ================= DUMMY DATA =================
const casesData = [
  {
    id: 1,
    image: '/images/cases/tungsten-dr.sally-cases-chinpng.png',
    title: 'Chin Defination',
    titleAr: 'نضارة وتوحيد لون البشرة',
    category: 'Filler',
    categoryAr: 'فيلر',
  },
  {
    id: 2,
    image: '/images/cases/tungsten-dr.sally-cases-jawline..png',
    title: 'Jaw Line',
    titleAr: 'نحت وتنسيق القوام',
    category: 'Filler',
    categoryAr: 'التغذية العلاجية',
  },
  {
    id: 3,
    image: '/images/cases/tungsten-dr.sally-cases-lipfiller.png',
    title: 'Lip Filler',
    titleAr: 'نتائج إزالة الشعر بالليزر',
    category: 'Laser',
    categoryAr: 'الليزر',
  },
  {
    id: 4,
    image: '/images/cases/tungsten-dr.sally-cases-july-plla.png',
    title: 'Plla',
    titleAr: 'استعادة كثافة الشعر',
    category: 'Hair Care',
    categoryAr: 'عناية الشعر',
  },
  {
    id: 5,
    image: '/images/cases/tungsten-dr.sally-cases-july-temple-area-filler.png',
    title: 'Temple Area Filler',
    titleAr: 'علاج آثار حب الشباب',
    category: 'Aesthetics',
    categoryAr: 'التجميل',
  },
  {
    id: 6,
    image: '/images/cases/farihan cace 3 july.png',
    title: 'Filler Under Eyes',
    titleAr: 'علاج آثار حب الشباب',
    category: 'Aesthetics',
    categoryAr: 'التجميل',
  },
  {
    id: 7,
    image: '/images/cases/farihan cace 7 july.png',
    title: 'Lip Filler',
    titleAr: 'علاج آثار حب الشباب',
    category: 'Aesthetics',
    categoryAr: 'التجميل',
  },
  {
    id: 8,
    image: '/images/cases/feerhan aug case 2.png',
    title: 'Lip Filler',
    titleAr: 'علاج آثار حب الشباب',
    category: 'Aesthetics',
    categoryAr: 'التجميل',
  },
  {
    id: 9,
    image: '/images/cases/tungsten-dr.sally-biostimulator (Poly-L-Lactic Acid)-new-layout.jpg',
    title: 'Biostimulator Poly-L-Lactic Acid',
    titleAr: 'علاج آثار حب الشباب',
    category: 'Aesthetics',
    categoryAr: 'التجميل',
  },
];

const Cases3DCarousel = () => {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % casesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + casesData.length) % casesData.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2000); // تغيير الصورة كل 2 ثواني
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  // دالة لحساب موضع كل كارت بالنسبة للمنتصف
  const getOffset = (index: number) => {
    const diff = index - currentIndex;
    const half = Math.floor(casesData.length / 2);
    let offset = diff;
    
    // لعمل حركة دائرية (Infinite Loop)
    if (offset > half) offset -= casesData.length;
    if (offset < -half) offset += casesData.length;
    
    return offset;
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative py-32 bg-[#FDFCF8] overflow-hidden selection:bg-amber-100 selection:text-amber-900"
    >
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
        {/* Glow behind the carousel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-300/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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

        {/* ================= 3D CAROUSEL CONTAINER ================= */}
        <div 
          className="relative h-[450px] md:h-[600px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {casesData.map((item, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const dirMultiplier = isRTL ? -1 : 1;

            // 3D Math Logic
            const xOffset = offset * 25 * dirMultiplier; // percentage translation
            const rotateY = offset * -35 * dirMultiplier; // degrees
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
                initial={false}
                animate={{
                  x: `${xOffset}%`,
                  rotateY: rotateY,
                  scale: scale,
                  z: zOffset,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1], // Smooth elegant easing
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className={cn(
                  "absolute top-0 w-[280px] md:w-[400px] h-full rounded-[2.5rem] overflow-hidden cursor-pointer",
                  isCenter ? "shadow-[0_30px_60px_rgba(217,119,6,0.2)]" : "shadow-xl"
                )}
              >
                {/* Card Background / Image Placeholder - تم تغيير الخلفية إلى داكنة لتناسب object-contain */}
                <div className="absolute inset-0 bg-slate-950">
                  <img
                    src={item.image}
                    alt={isRTL ? item.titleAr : item.title}
                    // تم تغيير object-cover إلى object-contain لمنع الاقتصاص
                    className="w-full h-full object-contain"
                    // في حال عدم وجود الصورة بعد، يمكنك استخدام هذا كبديل مؤقت:
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512496015851-a1c8caac2126?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                </div>

                {/* Overlays */}
                <div 
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    isCenter ? "bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" : "bg-slate-900/40"
                  )} 
                />

                {/* Content inside the Active Card */}
                <div 
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transition-all duration-500",
                    isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                >
                  <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
                    {isRTL ? item.categoryAr : item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-cairo leading-tight">
                    {isRTL ? item.titleAr : item.title}
                  </h3>
                </div>

                {/* Golden Border for Active Card */}
                {isCenter && (
                  <div className="absolute inset-0 rounded-[2.5rem] border border-amber-400/30 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="flex items-center justify-center gap-6 mt-16 relative z-20">
          <button
            onClick={isRTL ? nextSlide : prevSlide}
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-slate-200 text-slate-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 active:scale-90"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {casesData.map((_, idx) => (
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
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-slate-200 text-slate-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 active:scale-90"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Cases3DCarousel;