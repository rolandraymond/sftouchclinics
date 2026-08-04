import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
// قمت باستيراد أيقونات إضافية لتناسب تنوع الأجهزة
import { Sparkles, Zap, Activity, ScanFace, Waves, Snowflake, Droplets, Syringe, Eraser, Microscope } from 'lucide-react';

interface Technology {
  id: number;
  name: string;
  description: string;
  arabicDescription: string;
  image: string;
  icon: React.ElementType;
}

const TechnologiesSection = () => {
  const { isRTL } = useLanguage();

  const technologies: Technology[] = [
    // --- أجهزة الليزر ---
    {
      id: 1,
      name: 'Deka Again 2024',
      description: 'Fastest Full Body Laser Hair Removal',
      arabicDescription: 'الأسرع والأقوى لإزالة الشعر (جلسة كاملة في 30 دقيقة)',
      image: '/images/dev1.png',
      icon: Zap,
    },
    {
      id: 2,
      name: 'Motus Pro',
      description: 'Pain-free Alexandrite Laser',
      arabicDescription: 'ليزر ألكسندريت بدون ألم لجميع أنواع البشرة',
      image: '/images/dev2.png',
      icon: Sparkles,
    },

    // --- أجهزة الجلدية والتجميل ---
    {
      id: 3,
      name: 'Fractional Laser',
      description: 'Skin Resurfacing & Scar Removal',
      arabicDescription: 'علاج آثار الحبوب، الجروح، والزوائد الجلدية',
      image: '/images/dev3.png',
      icon: ScanFace,
    },
    {
      id: 4,
      name: 'Observ 520x',
      description: 'Advanced Skin Analysis',
      arabicDescription: 'كشف مشاكل البشرة العميقة والتصبغات المخفية',
      image: '/images/dev4.png',
      icon: Microscope, // أيقونة ميكروسكوب للفحص
    },
  /*   {
      id: 5,
      name: 'Aquapure',
      description: 'Hydro-Facial & Pore Cleansing',
      arabicDescription: 'تنظيف عميق، شد البشرة، وعلاج المسام الواسعة',
      image: '/images/dev5.png',
      icon: Droplets, // أيقونة قطرات للماء/التنظيف
    }, */
    {
      id: 6,
      name: 'Q-Switched Laser',
      description: 'Tattoo & Pigmentation Removal',
      arabicDescription: 'إزالة التاتو، النمش، الوحمات، والتقشير الكربوني',
      image: '/images/dev6.png',
      icon: Eraser, // أيقونة ممحاة للإزالة
    },
    /* {
      id: 7,
      name: 'Dermapen',
      description: 'Microneedling for Scars',
      arabicDescription: 'علاج آثار الحبوب وتفتيح التصبغات',
      image: '/images/dev7.png',
      icon: Syringe, // أيقونة قريبة للإبر
    }, */
    {
      id: 8,
      name: 'Vivace',
      description: 'RF Microneedling',
      arabicDescription: 'نضارة وشد البشرة وعلاج المسام بدون فترة نقاهة',
      image: '/images/dev8.png',
      icon: Activity,
    },
    {
      id: 9,
      name: 'Hydrafacial',
      description: 'Deep Skin Cleansing',
      arabicDescription: 'تنظيف عميق وإزالة الرؤوس السوداء والدهون',
      image: '/images/dev9.png',
      icon: Droplets,
    },

    // --- أجهزة التخسيس ونحت القوام ---
    
    {
      id: 11,
      name: 'Schwarzy',
      description: 'Muscle Building & Toning',
      arabicDescription: 'بناء العضلات وشد الجسم بالموجات المغناطيسية',
      image: '/images/dev11.png',
      icon: Zap,
    },
    {
      id: 12,
      name: 'Onda ',
      description: 'Body Contouring & Fat Melting',
      arabicDescription: 'نحت الجسم وإذابة الدهون بنسبة 80% بالموجات الباردة',
      image: '/images/dev12.png',
      icon: Waves,
    },
    {
      id: 13,
      name: 'Cryolipolysis',
      description: 'Fat Freezing',
      arabicDescription: 'تجميد الدهون (يعمل على 4 مناطق في وقت واحد)',
      image: '/images/dev13.png',
      icon: Snowflake, // أيقونة ندفة الثلج للتجميد
    },
    {
      id: 14,
      name: 'Cavitation',
      description: 'Non-Surgical Fat Reduction',
      arabicDescription: 'تفتيت الدهون الموضعية بالموجات فوق الصوتية',
      image: '/images/dev14.png',
      icon: Activity,
    },
  ];

  // تكرار القائمة لضمان استمرار الحركة في الشريط (Marquee)
  // بما أن القائمة أصبحت طويلة (14 جهاز)، التكرار مرتين كافٍ جداً
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="relative py-24 bg-[#05151F] overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase border border-yellow-500/20 py-1 px-3 rounded-full bg-yellow-500/5 backdrop-blur-sm">
            {isRTL ? 'تكنولوجيا عالمية' : 'World Class Tech'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 leading-tight font-cairo">
            {isRTL ? 'أحدث الأجهزة' : 'Our Advanced'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {isRTL ? ' الطبية' : ' Technologies'}
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            {isRTL 
              ? 'نستخدم أحدث ما توصلت إليه التكنولوجيا لضمان أفضل النتائج' 
              : 'Utilizing state-of-the-art equipment for guaranteed results.'}
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full" dir="ltr">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#05151F] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#05151F] to-transparent z-20 pointer-events-none" />

        <div 
            className="flex overflow-hidden py-4"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
        >
          <motion.div
            className="flex gap-6 px-4"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 80, // قمت بزيادة الوقت لأن عدد الكروت زاد، لكي لا تكون الحركة سريعة جداً
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: 'paused' }} 
            style={{ width: 'max-content' }}
          >
            {duplicatedTech.map((tech, index) => (
              <TechCard key={`${tech.id}-${index}`} tech={tech} isRTL={isRTL} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechCard = ({ tech, isRTL }: { tech: Technology, isRTL: boolean }) => {
  const Icon = tech.icon;

  return (
    <div 
      className="group relative w-[280px] h-[380px] flex-shrink-0 cursor-pointer"
      style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-yellow-500/50 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] group-hover:-translate-y-2 overflow-hidden">
        
        <div className="h-full flex flex-col p-6 relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-yellow-500 text-slate-300 group-hover:text-black transition-colors duration-300">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-slate-600 group-hover:text-yellow-500 transition-colors">
              DEV-{String(tech.id).padStart(2, '0')}
            </span>
          </div>

          {/* Image Area */}
          <div className="relative h-[160px] w-full flex items-center justify-center my-4 p-1">
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                <img 
                  src={tech.image} 
                  alt={tech.name}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-contain drop-shadow-md grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 transform-gpu"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('fallback-icon');
                  }}
                />
                <Icon className="hidden fallback-icon:block w-16 h-16 text-white/5 absolute z-0" />
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-auto border-t border-white/5 pt-4">
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors font-cairo truncate">
              {tech.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium group-hover:text-white/80 transition-colors line-clamp-2">
              {isRTL ? tech.arabicDescription : tech.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechnologiesSection;