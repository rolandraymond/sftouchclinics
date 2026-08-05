import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Star, Stethoscope, BadgeCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease },
    },
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease },
    },
  };

  const stats = [
    {
      value: '5k+',
      label: isRTL ? 'عميل يثقوا فينا' : 'Clients trust us',
    },
    {
      value: '24/7',
      label: isRTL ? 'استجابة سريعة' : 'Fast response',
    },
    {
      value: '99%',
      label: isRTL ? 'رضا وتجربة مميزة' : 'Premium satisfaction',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: isRTL ? 'أمان واحترافية' : 'Safe & professional',
    },
    {
      icon: Stethoscope,
      title: isRTL ? 'خبرة طبية متقدمة' : 'Advanced medical expertise',
    },
    {
      icon: BadgeCheck,
      title: isRTL ? 'نتائج طبيعية' : 'Natural results',
    },
  ];

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#fcfbf8] pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_28%),linear-gradient(to_bottom,#fffdf8,rgba(255,255,255,0.96))]" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-[28rem] w-[28rem] rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`flex flex-col ${isRTL ? 'items-start text-right' : 'items-start text-left'} max-w-2xl`}
          >
            <motion.div variants={fadeUp} className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-600">
                  {isRTL ? 'عيادة التجميل الأولى' : 'Premier aesthetic clinic'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-xl font-cairo text-5xl font-black leading-[1.06] tracking-tight text-slate-950 md:text-6xl lg:text-7xl"
            >
              {isRTL ? (
                <>
                خطوتك لنسخة أفضل 
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                    تبدأ من هنا
                    </span>
                    <span className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-yellow-300/40 blur-md" />
                  </span>
                </>
              ) : (
                <>
                  Beauty begins
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                      here
                    </span>
                    <span className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-yellow-300/40 blur-md" />
                  </span>
                </>
              )}
            </motion.h1>

            {/* <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg"
            >
              {isRTL
                ? 'تجربة فاخرة تمزج بين الرعاية الطبية الدقيقة، الذوق الراقي، وأحدث التقنيات لتظهري بأجمل نسخة من نفسك بثقة وهدوء.'
                : 'A refined experience blending medical precision, elevated taste, and modern technology so you can feel like the best version of yourself with confidence and calm.'}
            </motion.p> */}

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="tel:01503656589" className="group">
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
                  <PhoneCall className="h-4 w-4" />
                  <span>{t.hero.cta || (isRTL ? 'احجزي موعدك' : 'Book Appointment')}</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                      isRTL ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''
                    }`}
                  />
                </button>
              </a>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-7 py-4 text-sm font-bold text-slate-700 backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:bg-white hover:text-slate-950"
              >
                {t.hero.secondaryCta || (isRTL ? 'استكشفي الخدمات' : 'Explore services')}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid w-full gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.05)] backdrop-blur-md"
                >
                  <div className="text-2xl font-black text-slate-950">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm"
                    >
                      <img
                        src={`https://i.pravatar.cc/120?img=${10 + i}`}
                        alt="Client"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {isRTL ? 'ثقة أكثر من 5000 عميل' : 'Trusted by 5k+ clients'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-[680px]"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
              {/* main frame */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_30px_90px_rgba(15,23,42,0.12)]" />
              <div className="absolute inset-3 overflow-hidden rounded-[2.15rem]">
                <img
                  src="\images\OES02680.jpg"
                  alt="Clinic hero"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-slate-950/8 to-transparent" />
              </div>

              {/* top badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-[0_12px_36px_rgba(15,23,42,0.12)] backdrop-blur-md`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      {isRTL ? 'رعاية متكاملة' : 'Complete care'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isRTL ? 'طابع فاخر ونتائج دقيقة' : 'Luxury feel, precise results'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* bottom badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} rounded-3xl border border-white/55 bg-white/85 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.14)] backdrop-blur-md`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-yellow-400/15 p-3 text-yellow-600">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-950">100%</p>
                    <p className="text-xs text-slate-500">
                      {isRTL ? 'رضا وتجربة راقية' : 'Premium satisfaction'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute ${isRTL ? '-left-2 md:-left-8' : '-right-2 md:-right-8'} top-24 hidden w-44 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_14px_45px_rgba(15,23,42,0.12)] backdrop-blur-md md:block`}
              >
                <div className="flex items-center gap-2 text-slate-950">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold">{isRTL ? 'فريق واحد .. خبرات متعدده' : 'Artful touch'}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {isRTL ? 'لأن كل تحتياج له التخصص المناسب' : 'A design that balances elegance and calm.'}
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute ${isRTL ? '-right-2 md:-right-10' : '-left-2 md:-left-10'} bottom-28 hidden w-52 rounded-3xl border border-white/70 bg-slate-950/90 p-4 text-white shadow-[0_18px_50px_rgba(15,23,42,0.22)] backdrop-blur-md md:block`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                      {isRTL ? 'خبرة' : 'Expertise'}
                    </p>
                    <p className="mt-1 text-lg font-black">15+ {isRTL ? 'سنة' : 'years'}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-yellow-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/70">
                  {isRTL ? 'فريق يهتم بالتفاصيل من أول استشارة لحد النتيجة النهائية.' : 'A team that cares about every detail from consultation to final result.'}
                </p>
              </motion.div>
            </div>

            {/* mobile feature cards */}
            <div className="mt-6 grid gap-3 md:hidden sm:grid-cols-3">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-md"
                  >
                    <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-900">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
