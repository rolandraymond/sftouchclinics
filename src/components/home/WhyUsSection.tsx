import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Stethoscope, Cpu, ClipboardList, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// 1. تعريف النوع
interface FeatureItem {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const WhyUsSection = () => {
  const { t, isRTL } = useLanguage();

  const features: FeatureItem[] = [
    {
      id: 1,
      icon: Stethoscope,
      title: t.whyUs.doctorsCare.title,
      description: t.whyUs.doctorsCare.description,
    },
    {
      id: 2,
      icon: Cpu,
      title: t.whyUs.technology.title,
      description: t.whyUs.technology.description,
    },
    {
      id: 3,
      icon: ClipboardList,
      title: t.whyUs.customized.title,
      description: t.whyUs.customized.description,
    },
    {
      id: 4,
      icon: Award,
      title: t.whyUs.results.title,
      description: t.whyUs.results.description,
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* Background Magic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-yellow-400 opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
             <CheckCircle2 className="w-4 h-4 text-green-500" />
             <span className="text-xs font-bold tracking-wide uppercase text-slate-600">
               {isRTL ? 'لماذا SF Touch؟' : 'Why Choose Us?'}
             </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-cairo">
            {isRTL ? 'خبرة تصنع الفرق' : 'Making a Difference in'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
              {isRTL ? 'فريق طبي متخصص' : 'Aesthetic World'}
            </span>
          </h2>
        </motion.div>

        {/* The Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <SpotlightCard key={i} feature={feature} index={i} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= SPOTLIGHT CARD COMPONENT =================
const SpotlightCard = ({ feature, index, isRTL }: { feature: FeatureItem, index: number, isRTL: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative border border-slate-200 bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(234, 179, 8, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. Spotlight Border Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(234, 179, 8, 0.4),
                transparent 40%
              )
            `,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: `exclude`,
            WebkitMaskComposite: `xor`,
            padding: `2px`,
        }}
      />

      {/* 3. Card Content */}
      <div className="relative h-full p-8 flex flex-col items-start z-10">
        
        {/* Icon */}
        <div className="relative mb-6">
           <div className="absolute inset-0 bg-yellow-500/20 rounded-2xl blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
           <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center group-hover:border-yellow-500/50 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-7 h-7 text-slate-700 group-hover:text-yellow-600 transition-colors" />
           </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors font-cairo">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
          {feature.description}
        </p>

        {/* Bottom Number/Arrow */}
        <div className="w-full flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
           <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-yellow-500 transition-colors">
             0{index + 1}
           </span>
           
           {/* السهم السفلي: تم تصحيح الخطأ هنا باستخدام كلاس واحد ديناميكي */}
           <div 
             className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${isRTL ? 'translate-x-4 group-hover:translate-x-0' : '-translate-x-4 group-hover:translate-x-0'}`}
           >
             <div className={isRTL ? 'rotate-180' : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
             </div>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default WhyUsSection;