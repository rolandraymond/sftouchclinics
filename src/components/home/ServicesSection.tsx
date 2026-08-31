import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Apple,
  Sprout,
  Activity,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  href: string;
  gridClass: string;
  accent: string;
};

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // تأثيرات بارالاكس متطورة للخلفية
  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const services: ServiceItem[] = [
    {
      id: "01",
      title:
        t.services?.dermatology?.title ||
        (isRTL ? "الجلدية والليزر" : "Dermatology & Laser"),
      description:
        t.services?.dermatology?.description ||
        (isRTL
          ? "تقنيات ليزر متطورة وبروتوكولات علاجية لبشرة نقية ومشرقة."
          : "Advanced laser tech and protocols for flawless, radiant skin."),
      icon: Sparkles,
      image: "/images/64b91e60ee991bc3355749ae_laser.jpeg",
      href: "/services/dermatology-laser",
      gridClass: "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[500px]",
      accent: "from-amber-500/40 via-orange-500/20 to-transparent",
    },
    {
      id: "02",
      title:
        t.services?.nutrition?.title ||
        (isRTL ? "التغذية ونحت القوام" : "Nutrition & Contouring"),
      description:
        t.services?.nutrition?.description ||
        (isRTL
          ? "خطط طبية متكاملة للوصول إلى الوزن المثالي والقوام المتناسق."
          : "Comprehensive medical plans for your ideal weight and shape."),
      icon: Activity,
      image: "/images/images (5).jpg",
      href: "/services/nutrition-contouring",
      gridClass: "md:col-span-1 min-h-[300px]",
      accent: "from-emerald-500/40 via-teal-500/20 to-transparent",
    },
    {
      id: "03",
      title:
        t.services?.hair?.title ||
        (isRTL ? "زراعة وعلاج الشعر" : "Hair Restoration"),
      description:
        t.services?.hair?.description ||
        (isRTL
          ? "أحدث التقنيات لاستعادة كثافة الشعر وحيويته بأسلوب طبيعي."
          : "Latest technologies to restore hair density and natural vitality."),
      icon: Sprout,
      image: "/images/6485892b-1ae1-45e5-b3dc-6aa57ed65001-1.png",
      href: "/services/hair-restoration",
      gridClass: "md:col-span-1 min-h-[300px]",
      accent: "from-blue-500/40 via-indigo-500/20 to-transparent",
    },
  ];

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const clinicHighlights = [
    {
      icon: Stethoscope,
      label: isRTL ? "إشراف طبي متخصص" : "Expert Medical Care",
    },
    //{ icon: ShieldCheck, label: isRTL ? 'أجهزة معتمدة عالمياً' : 'FDA Approved Tech' },
    {
      icon: Award,
      label: isRTL ? "نتائج طبيعية " : "Natural & Proven Results",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#fafafa] py-24 sm:py-32"
    >
      {/* Background Aesthetics */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <motion.div
          style={{ y: y1, rotate }}
          className="absolute -right-64 -top-64 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-amber-200/40 to-orange-100/20 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-slate-300/40 to-zinc-200/20 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Clinic Intro / Copywriting */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.15 }}
            className={`lg:col-span-4 ${isRTL ? "text-right" : "text-left"}`}
          >
            <motion.div variants={fadeUpVariants} className="mb-6 inline-flex">
              <div
                className={`flex items-center gap-2 rounded-full border border-amber-200/50 bg-amber-50/50 px-5 py-2.5 shadow-sm backdrop-blur-sm ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  {isRTL ? "تميُّز طبي  لمسة فنية" : "Medical Excellence"}
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="font-cairo text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              {isRTL ? (
                <>
                  جمال بثقة أعلى{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-400">
                    برعاية{" "}
                  </span>
                   متخصصة
                </>
              ) : (
                <>
                  Elevate your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-400">
                    Beauty
                  </span>
                  <br /> with expert care
                </>
              )}
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {isRTL
                ? "في SF Touch بنجمع بين الخبرة الطبية وأحدث التقنيات التجميلية علشان نقدم رعاية آمنة ومخصصة، تناسب احتياجات كل حالة وتوصل لنتائج طبيعية."
                : "At our clinic, we merge the latest medical advancements with an aesthetic vision to provide a safe, personalized journey designed to give you the confidence you deserve."}
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col gap-4"
            >
              {clinicHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex w-full items-start gap-4 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                      <Icon className="h-5 w-5 text-amber-500" />
                    </div>

                    <span
                      className={`w-full font-semibold leading-7 text-slate-700 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-10">
              <Link
                to="/services"
                className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="relative z-10">
                  {isRTL ? "ابدأ رحلتك" : "Book Consultation"}
                </span>
                <ArrowRight
                  className={`relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Creative Bento Grid for Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1 }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {services.map((service) => {
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className={service.gridClass}
                >
                  <Link
                    to={service.href}
                    className="group relative block h-full w-full overflow-hidden rounded-[2.5rem] bg-slate-900"
                  >
                    {/* Image with Parallax Hover */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                    />

                    {/* Medical Premium Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent transition-opacity duration-500" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    {/* Content Layer */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
                      {/* Top Header */}
                      
                      <div className="flex items-start justify-end">
                        <span className="text-4xl font-black text-white/20 sm:text-5xl">
                          {service.id}
                        </span>
                      </div>

                      {/* Bottom Info (Animates up on hover) */}
                      <div
                        className={`transform transition-all duration-500 ${isRTL ? "text-right" : "text-left"} group-hover:-translate-y-2`}
                      >
                        <h3 className="font-cairo text-2xl font-bold text-white sm:text-3xl mb-3">
                          {service.title}
                        </h3>
                        <p className="max-w-md text-sm leading-relaxed text-slate-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:text-base">
                          {service.description}
                        </p>

                        <div
                          className={`mt-6 flex items-center gap-2 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 ${isRTL ? "flex-row-reverse justify-start" : ""}`}
                        >
                          <span className="text-sm font-bold text-amber-400">
                            {isRTL ? "التفاصيل" : "Discover Details"}
                          </span>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                            <ChevronRight
                              className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
