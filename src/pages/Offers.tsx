import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Percent, Gift, Star, Clock, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Offer {
  id: string;
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  code: string;
  gradient: string;
}

const Offers = () => {
  const { language, isRTL } = useLanguage();

  const offers: Offer[] = [
    {
      id: '01',
      icon: Sparkles,
      title: language === 'ar' ? 'باقة النضارة الشاملة' : 'Full Glow Package',
      value: '20%',
      description: language === 'ar' ? 'خصم فوري عند حجز باقة الليزر للجسم بالكامل' : 'Instant 20% off on full body laser packages',
      code: 'GLOW20',
      gradient: 'from-rose-100 via-rose-50 to-white'
    },
    {
      id: '02',
      icon: Gift,
      title: language === 'ar' ? 'هدية الجمال' : 'Beauty Gift',
      value: 'FREE',
      description: language === 'ar' ? 'جلسة هيدرافيشل مجانية مع خدمات بقيمة 3000 جنيه' : 'Complimentary HydraFacial with services over 3000 EGP',
      code: 'HYDRA-GIFT',
      gradient: 'from-blue-100 via-blue-50 to-white'
    },
    {
      id: '03',
      icon: Star,
      title: language === 'ar' ? 'بكدج العروسة' : 'Bridal Queen',
      value: 'VIP',
      description: language === 'ar' ? 'تجهيزات متكاملة للبشرة والقوام قبل ليلة الزفاف' : 'Comprehensive skin & body prep before the big day',
      code: 'BRIDE2024',
      gradient: 'from-amber-100 via-amber-50 to-white'
    },
    {
      id: '04',
      icon: Clock,
      title: language === 'ar' ? 'استشارة مجانية' : 'Free Consult',
      value: '0 EGP',
      description: language === 'ar' ? 'جلسة تقييم حالة مجانية مع أخصائي التغذية' : 'Free initial assessment with our nutrition expert',
      code: 'CONSULT',
      gradient: 'from-emerald-100 via-emerald-50 to-white'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24 overflow-hidden selection:bg-amber-100">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="container px-6 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-[10px]">{language === 'ar' ? 'فرص استثنائية' : 'Exclusive Opportunities'}</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-4 mb-6 tracking-tight font-cairo">
            {language === 'ar' ? 'عروض صممت لجمالك' : 'Designed for your Beauty'}
          </h1>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= OFFER CARD =================
const OfferCard = ({ offer, index, isRTL }: { offer: Offer, index: number, isRTL: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={cn(
        "group relative p-8 rounded-[2.5rem] border border-black/5 overflow-hidden flex flex-col justify-between transition-all duration-700 hover:shadow-2xl",
        `bg-gradient-to-br ${offer.gradient}`,
        index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/80 transition-all duration-700" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center mb-6 shadow-sm">
          <offer.icon className="w-6 h-6 text-slate-900" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-cairo">{offer.title}</h3>
        <p className="text-slate-600 text-sm max-w-xs">{offer.description}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-8">
        <span className="text-4xl font-black text-slate-900">{offer.value}</span>
        
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all active:scale-95"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? (isRTL ? 'تم النسخ' : 'Copied') : offer.code}
        </button>
      </div>
    </motion.div>
  );
};

export default Offers;