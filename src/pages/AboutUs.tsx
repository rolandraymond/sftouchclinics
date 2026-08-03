import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Quote,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // تأثيرات Parallax هادئة جداً
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.7]);

  // حركات بطيئة وأنيقة (Elegant Easing)
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#FDFCF8] overflow-hidden selection:bg-amber-100 selection:text-amber-900"
    >
      {/* طبقة نسيج خفيفة جداً (Grainy Overlay) لكسر حدة الألوان */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ======================= HERO SECTION (Typography Led) ======================= */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={cn(
              "max-w-4xl",
              isRTL ? "ml-auto text-right" : "mr-auto text-left",
            )}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-amber-600/50" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700/80">
                {isRTL ? "جوهر عيادتنا" : "Our Essence"}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-cairo text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[1.1] text-slate-900 tracking-tight"
            >
              {isRTL ? (
                <>
                  ندمج{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-400 font-light">
                    الفن
                  </span>{" "}
                  مع <br />
                  الدقة الطبية .
                </>
              ) : (
                <>
                  Merging{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-400 font-light">
                    Art
                  </span>{" "}
                  with <br />
                  Clinical Precision.
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-light"
            >
              {isRTL
                ? "لسنا مجرد مركز تجميل تقليدي. نحن منشأة طبية متخصصة تتبنى أحدث البروتوكولات العالمية، حيث يتم تخصيص كل خطة علاجية لتلائم طبيعتك البيولوجية وأهدافك الجمالية بأمان تام."
                : "We are more than a traditional aesthetic center. We are a specialized medical facility adopting global protocols, where every treatment plan is biologically tailored to your aesthetic goals with absolute safety."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ======================= ASYMMETRICAL STORY BLOCK ======================= */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 items-center">
            {/* Image Block */}
            <motion.div
              style={{ y: ySlow }}
              className={cn(
                "lg:col-span-7 relative z-10",
                isRTL ? "lg:order-2" : "lg:order-1",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-bl-[4rem] rounded-tr-[4rem] bg-slate-100">
                <img
                  src="\images\IMG_9314 1.png"
                  alt="Clinic Atmosphere"
                  className="w-full h-full object-cover opacity-90 scale-105 hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Content Overlap Block */}
            <motion.div
              style={{ y: yFast }}
              className={cn(
                "lg:col-span-6 relative z-20 bg-white p-10 sm:p-14 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.04)] border border-slate-100",
                isRTL
                  ? "lg:order-1 lg:-mr-20 text-right"
                  : "lg:order-2 lg:-ml-20 text-left",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3 mb-6",
                  isRTL ? "flex-row-reverse justify-end" : "",
                )}
              >
                <ShieldCheck className="w-6 h-6 text-emerald-600 stroke-[1.5]" />
                <h3 className="text-xl font-bold text-slate-900">
                  {isRTL
                    ? "معايير طبية غير قابلة للمساومة"
                    : "Uncompromising Medical Standards"}
                </h3>
              </div>

              <p className="text-slate-600 leading-8 mb-6">
                {isRTL
                  ? "رؤيتنا لا تقتصر على التحسين المؤقت، بل بناء صحة مستدامة للبشرة والشعر. نستخدم حصرياً أجهزة معتمدة من هيئة الغذاء والدواء (FDA) ومواد طبية موثقة لضمان نتائج طبيعية تدوم طويلاً دون المساس بسلامتك."
                  : "Our vision isn't just temporary enhancement, but building sustainable skin and hair health. We exclusively use FDA-approved devices and certified medical materials to ensure long-lasting, natural results without compromising your safety."}
              </p>

              <ul
                className={cn(
                  "space-y-4 mb-8",
                  isRTL ? "text-right" : "text-left",
                )}
              >
                {[
                  isRTL
                    ? "بروتوكولات تعقيم صارمة بمقاييس المستشفيات"
                    : "Hospital-grade sterilization protocols",
                  isRTL
                    ? "تشخيص دقيق قبل أي تدخل تجميلي"
                    : "Precise diagnostics prior to any procedure",
                  isRTL
                    ? "متابعة طبية حثيثة بعد الجلسات"
                    : "Rigorous medical follow-up post-treatment",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-start gap-3",
                      isRTL ? "flex-row-reverse" : "",
                    )}
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================= MINIMALIST STATS / PILLARS ======================= */}
      <section className="py-24 px-6 border-y border-slate-200/60 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-12 divide-y sm:divide-y-0 sm:divide-x sm:divide-slate-200/60">
            {[
              {
                icon: Stethoscope,
                title: isRTL ? "خبرة طبية متخصصة" : "Specialized Expertise",
                desc: isRTL
                  ? "فريق طبي يحمل أعلى الشهادات في الجلدية والتجميل."
                  : "Medical team with top credentials in dermatology.",
              },
              {
                icon: Sparkles,
                title: isRTL ? "نتائج مصممة لكِ" : "Bespoke Results",
                desc: isRTL
                  ? "لا نؤمن بالحلول الجاهزة؛ كل وجه له هندسته الفريدة."
                  : "No cookie-cutter solutions; every face has its unique geometry.",
              },
              {
                icon: ShieldCheck,
                title: isRTL ? "تكنولوجيا آمنة" : "Safe Technology",
                desc: isRTL
                  ? "نستثمر في أحدث تقنيات الليزر وأجهزة النحت عالمياً."
                  : "Investing in the world's latest laser and contouring tech.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={cn(
                  "pt-8 sm:pt-0 sm:px-8 first:sm:pl-0 last:sm:pr-0",
                  isRTL ? "text-right" : "text-left",
                )}
              >
                <pillar.icon
                  className={cn(
                    "w-8 h-8 text-amber-600 mb-5 stroke-[1.5]",
                    isRTL ? "ml-auto" : "mr-auto",
                  )}
                />
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= EDITORIAL FOUNDER PROFILE ======================= */}
      {/* 
       */}
    </div>
  );
};

export default AboutUs;
