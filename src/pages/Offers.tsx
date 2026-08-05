import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Gift, Star, Clock, Copy, Check, CalendarCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Offer {
  id: string;
  icon: React.ElementType;
  title: string;
  titleAr: string;
  value: string;
  description: string;
  descriptionAr: string;
  code: string;
  gradient: string;
}

const offers: Offer[] = [
  {
    id: '01',
    icon: Sparkles,
    title: 'Full Glow Package',
    titleAr: 'باكدج النعومة الكاملة',
    value: '20%',
    description: 'Instant 20% off on full body laser packages',
    descriptionAr: 'خصم 20% عند حجز جلسات الليزر للجسم بالكامل',
    code: 'GLOW20',
    gradient: 'from-rose-100/80 via-rose-50/50 to-white',
  },
  {
    id: '02',
    icon: Gift,
    title: 'HydraFacial Gift',
    titleAr: 'هيدرافيشل مجانًا',
    value: 'FREE',
    description: 'Complimentary HydraFacial with services over 3000 EGP',
    descriptionAr: 'جلسة Hydrafacial مجانية عند الحصول على خدمات بقيمة 3000 جنيه',
    code: 'HYDRA-GIFT',
    gradient: 'from-blue-100/80 via-blue-50/50 to-white',
  },
  {
    id: '03',
    icon: Star,
    title: 'Bridal Queen Package',
    titleAr: 'باكدج العروسة',
    value: 'VIP',
    description: 'Comprehensive skin rejuvenation with HydraFacial and advanced skincare technologies.',
    descriptionAr: 'تجهيز متكامل للبشرة والجسم والتغذية قبل مناسبتك',
    code: 'BRIDE2024',
    gradient: 'from-amber-100/80 via-amber-50/50 to-white',
  },
  {
    id: '04',
    icon: Clock,
    title: 'Free Nutrition Consult',
    titleAr: 'استشارة تغذية مجانية',
    value: '0 EGP',
    description: 'Free initial assessment with our nutrition expert',
    descriptionAr: 'جلسة تقييم مجانية مع أخصائي التغذية',
    code: 'CONSULT',
    gradient: 'from-emerald-100/80 via-emerald-50/50 to-white',
  },
];

const Offers = () => {
  const { isRTL } = useLanguage();

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FDFCF8] selection:bg-amber-100 selection:text-amber-900"
    >
      {/* ================= BACKGROUND NOISE & GLOW ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 pt-40 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-amber-600/30" />
              <span className="text-amber-700 text-xs font-bold tracking-[0.25em] uppercase">
                {isRTL ? 'فرص مميزة' : 'Exclusive Opportunities'}
              </span>
              <div className="h-px w-10 bg-amber-600/30" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black text-slate-900 leading-[1.15] font-cairo tracking-tight mb-6">
              {isRTL ? (
                <>
                  عروض <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-600">
                    تستاهل التجربة
                  </span>
                </>
              ) : (
                <>
                  Offers <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-amber-600">
                    Worth Trying
                  </span>
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              {isRTL
                ? 'عروض مختارة على مجموعة من خدمات SF Touch لفترة محدودة.'
                : 'Selected offers on a range of SF Touch services for a limited time.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OFFERS BENTO GRID ================= */}
      <section className="relative z-10 pb-32 px-4 md:px-8">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ================= OFFER CARD =================
const OfferCard = ({ offer, index, isRTL }: { offer: Offer; index: number; isRTL: boolean }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const Icon = offer.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Give a dynamic bento span layout feel if desired, e.g., first card wider
  const isFeatured = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(15,23,42,0.1)] flex flex-col justify-between overflow-hidden",
        isFeatured ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1"
      )}
    >
      {/* Decorative gradient overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-100", offer.gradient)} />
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200/80 text-amber-600 shadow-sm transition-transform duration-500 group-hover:scale-110 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <span className="text-3xl md:text-4xl font-black text-slate-900 font-cairo tracking-tight">
            {offer.value}
          </span>
        </div>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 mb-8">
        <h3 className="text-2xl font-black text-slate-900 mb-3 font-cairo">
          {isRTL ? offer.titleAr : offer.title}
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          {isRTL ? offer.descriptionAr : offer.description}
        </p>
      </div>

      {/* Bottom Action Row */}
      <div className="relative z-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4">
        {/* Promo Code & Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="group/btn inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-bold transition-all hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 active:scale-95"
          title={isRTL ? "اضغط لنسخ الكود" : "Click to copy code"}
        >
          <span className="tracking-wider">{offer.code}</span>
          <span className="text-slate-400 group-hover/btn:text-amber-600 transition-colors">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </span>
        </button>

        {/* Book Offer Button */}
        <button
          type="button"
          onClick={() => navigate('/contact-us')}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-amber-500 hover:shadow-amber-500/25 active:scale-95",
            isRTL ? "flex-row-reverse" : ""
          )}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>{isRTL ? 'احصل على العرض' : 'Claim Offer'}</span>
          <ArrowRight
            className={cn(
              "w-3.5 h-3.5 transition-transform group-hover:translate-x-1",
              isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
            )}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default Offers;