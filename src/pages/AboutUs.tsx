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

  // حركات بطيئة وأنيقة (Elegant Easing)
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div
      ref={containerRef}
      // إضافة dir هنا تحل معظم مشاكل الـ RTL بشكل جذري
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-[#FDFCF8] overflow-hidden selection:bg-amber-100 selection:text-amber-900"
    >
      {/* طبقة نسيج خفيفة جداً (Grainy Overlay) لكسر حدة الألوان */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ======================= HERO SECTION (Typography Led) ======================= */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-amber-600/50" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700/80">
                {isRTL ? "جوهر SF Touch" : "Our Essence"}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              // تم تعديل الـ leading لتوفير مساحة كافية للخط
              className="font-cairo text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[1.25] text-slate-900 tracking-tight"
            >
              {isRTL ? (
                <>
                  خبرة{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 font-bold">
                      طبية
                    </span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-amber-100 -z-10 -rotate-2" />
                  </span>{" "}
                  {/* استخدام block للتحكم الكامل في المسافة الرأسية وتجنب تلاصق الكلمات */}
                  <span className="block mt-2 text-slate-800">
                    ودقة في كل تفصيلة
                  </span>
                </>
              ) : (
                <>
                  Medical{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 font-bold">
                      Expertise
                    </span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-amber-100 -z-10 -rotate-2" />
                  </span>{" "}
                  Precision
                  <span className="block mt-2 text-slate-800">
                    in Every Detail
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium"
            >
              {isRTL
                ? " مش مجرد عيادة تجميل SF Touch، لكن مركز متخصص بيجمع بين الخبرة الطبية، أحدث التقنيات، والرعاية المتكاملة في الجلدية والليزر والتجميل والتغذية وزراعة الشعر. كل خطة علاج بتتحدد حسب احتياجات كل حالة، مع اهتمام بالتفاصيل من أول التقييم وحتى المتابعة"
                : "We are more than a traditional aesthetic center. We are a specialized medical facility adopting global protocols, where every treatment plan is biologically tailored to your aesthetic goals with absolute safety."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ======================= ASYMMETRICAL STORY BLOCK ======================= */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Block */}
            <motion.div
              style={{ y: ySlow }}
              className={cn(
                "lg:col-span-6 relative",
                isRTL ? "lg:order-2" : "lg:order-1"
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl">
                <img
                  src="/images/IMG_9314 1.png"
                  alt="Clinic Atmosphere"
                  className="w-full h-full object-cover opacity-95 scale-105 hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Content Block */}
            <motion.div
              style={{ y: yFast }}
              className={cn(
                "lg:col-span-6 relative",
                isRTL ? "lg:order-1" : "lg:order-2"
              )}
            >
              <div className="bg-white/85 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {isRTL
                      ? " الجودة الطبية أولويتنا اولا"
                      : "Uncompromising Standards"}
                  </h3>
                </div>

                <p className="text-slate-600 text-lg leading-8 mb-8 font-medium">
                  {isRTL
                    ? "هدفنا مش مجرد تغيير مؤقت، لكن الوصول لنتائج طبيعية والحفاظ على صحة البشرة والشعر على المدى الطويل. بنستخدم أجهزة وتقنيات معتمدة ومواد طبية موثوقة، مع الالتزام بمعايير السلامة والجودة في كل خطوة."
                    : "Our vision isn't just temporary enhancement, but building sustainable skin health. We exclusively use FDA-approved devices to ensure long-lasting, natural results."}
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: isRTL ? "تعقيم صارم" : "Strict Sterilization",
                      desc: isRTL
                        ? "بروتوكولات تعقيم دقيقة لضمان بيئة آمنة"
                        : "Hospital-grade sterilization protocols",
                    },
                    {
                      title: isRTL
                        ? "تقييم دقيق قبل أي إجراء"
                        : "Precise Diagnostics",
                      desc: isRTL
                        ? "كل حالة بتبدأ بتقييم مناسب قبل تحديد الإجراء أو الخطة العلاجية."
                        : "Precise diagnostics prior to any procedure",
                    },
                    {
                      title: isRTL
                        ? "متابعة طبية مستمرة"
                        : "Continuous Follow-Up",
                      desc: isRTL
                        ? "المتابعة جزء أساسي من رحلة العلاج، من أول جلسة وحتى ما بعد الإجراء."
                        : "Rigorous medical follow-up post-treatment",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-bold text-base leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-sm font-normal mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================= CREATIVE STATS / PILLARS ======================= */}
      <section className="py-24 px-6 mt-10 relative">
        <div className="absolute inset-0 bg-slate-900 rounded-t-[3rem] sm:rounded-t-[5rem]" />

        <div className="container mx-auto max-w-6xl relative z-10 pt-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: isRTL ? "خبرة طبية متخصصة" : "Specialized Expertise",
                desc: isRTL
                  ? "فريق طبي متخصص بخبرات وشهادات معتمدة في مجالات الجلدية والتجميل والتخصصات المرتبطة بها."
                  : "Medical team with top credentials in dermatology.",
              },
              {
                icon: Sparkles,
                title: isRTL ? " خطط علاج مخصصة" : "Bespoke Results",
                desc: isRTL
                  ? "مفيش حل واحد يناسب كل الحالات. كل خطة بتتحدد حسب احتياجات الحالة وأهدافها."
                  : "No cookie-cutter solutions; every face has its unique geometry.",
              },
              {
                icon: ShieldCheck,
                title: isRTL ? "تكنولوجيا متطورة" : "Safe Technology",
                desc: isRTL
                  ? "بنستثمر في أحدث تقنيات الليزر وأجهزة نحت الجسم والتقنيات الطبية المتطورة، مع اختيار ما يناسب كل حالة."
                  : "Investing in the world's latest laser and contouring tech.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-7 h-7 text-amber-400 stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h4>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;