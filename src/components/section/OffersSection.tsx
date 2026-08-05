"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  ArrowUpRight,
  Star,
  TicketPercent,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface PerspectiveCardProps {
  offer: Offer;
  index: number;
  language: string;
  isRTL: boolean;
}

const gold = "#D4AF37";
const goldLight = "#F2D27C";
const goldDark = "#9A7B2F";

const PerspectiveCard = ({
  offer,
  index,
  language,
  isRTL,
}: PerspectiveCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: index * 0.14,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-[500px] w-full cursor-pointer group"
      dir={isRTL ? "rtl" : "ltr"}
      lang={language}
    >
      <div
        style={{ transform: "translateZ(-50px)" }}
        className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/15 shadow-2xl shadow-black/20"
      >
        {" "}
        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />{" "}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,17,32,0.92)_0%,rgba(11,17,32,0.55)_40%,rgba(11,17,32,0.05)_100%)]" />{" "}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />{" "}
      </div>

      <motion.div
        style={{ transform: "translateZ(90px)" }}
        className={cn(
          "absolute top-6 text-[7rem] md:text-[9rem] font-serif font-black select-none leading-none text-white/10",
          isRTL ? "right-6" : "left-6",
        )}
      >
        {offer.number}
      </motion.div>

      <div
        style={{ transform: "translateZ(50px)" }}
        className={cn(
          "absolute bottom-6 md:bottom-8 p-5 md:p-8 rounded-[2rem] border shadow-2xl backdrop-blur-2xl",
          "bg-white/8 border-white/15",
          isRTL
            ? "left-4 right-4 md:left-8 md:right-8"
            : "left-4 right-4 md:left-8 md:right-8",
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF37,#F2D27C)] text-[#0B1120] shadow-lg shadow-[#D4AF37]/30">
            <Sparkles className="w-5 h-5" />
          </div>

          <ArrowUpRight className="w-6 h-6 text-white/45 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
        </div>

        <h3 className="mb-2 text-2xl md:text-3xl font-serif font-bold text-white italic leading-tight">
          {offer.title}
        </h3>

        <p className="max-w-[92%] text-sm md:text-[15px] leading-7 text-[#FFF7E6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          {offer.description}
        </p>

        <div
          className={cn(
            "mt-6 flex items-center gap-2",
            isRTL ? "justify-end" : "justify-start",
          )}
        >
          <span className="h-px w-10 bg-[#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-[0.32em] text-[#D4AF37]">
            {language === "en" ? "Limited Time" : "لفترة محدودة"}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.20)]" />
    </motion.div>
  );
};

const OffersSection = () => {
  const { language, isRTL } = useLanguage();

  const offers: Offer[] = [
    {
      number: "01",
      title: language === "en" ? "Summer Glow Package" : "باقة تجديد البشرة",
      description:
        language === "en"
          ? "Complete skin rejuvenation with Hydrafacial + LED therapy."
          : "جديد متكامل للبشرة مع الهيدرا فيشل وتقنيات متقدمة للعناية بالبشرة.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    },
    {
      number: "02",
      title: language === "en" ? "Body Contouring" : "نحت القوام",
      description:
        language === "en"
          ? "Advanced non-surgical body contouring treatments for a slimmer, more sculpted appearance."
          : "تقنيات متطورة لنحت القوام بدون جراحة، لمظهر أكثر تناسقًا",
      image: "/images/image123.png",
    },
  ];

  const marqueeText =
    language === "en"
      ? ["BOOK NOW", "LIMITED SLOTS", "SPECIAL OFFER", "RADIANCE"]
      : ["احجز الآن", "استشارة طبية", " تقنيات متطورة"];

  const marqueeItems = [...Array(6)].flatMap(() => marqueeText);

  return (
    <section
      className="relative overflow-hidden bg-[#F7F1E3] py-24 md:py-32"
      dir={isRTL ? "rtl" : "ltr"}
      lang={language}
    >
      {" "}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(11,17,32,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(212,175,55,0.08),transparent_36%)]" />{" "}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* تم تعديل هذا الجزء لتوسيط العنوان والبراجراف في منتصف الشاشة */}
        <div className="mb-16 md:mb-24 flex flex-col items-center justify-center text-center gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-center"
          >
            <span
              className="mb-3 block text-2xl md:text-3xl font-serif text-[#D4AF37]"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {language === "en" ? "Exclusive Offers" : "عروض حصرية"}
            </span>

            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-[0.9] text-[#0B1120]">
              {language === "en" ? "CURATED" : "عروض"}{" "}
              <span className="text-[#D4AF37] italic block md:inline">
                {language === "en" ? "EXPERIENCES" : "مختارة"}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="max-w-md text-center text-sm md:text-base uppercase tracking-[0.22em] font-bold leading-relaxed text-[#0B1120]/45"
          >
            {language === "en"
              ? "Your Destination for Beauty, Wellness & Confidence"
              : "باقات موسمية مختارة بعناية للجمال والصحة"}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 perspective-1000 relative z-10">
          {offers.map((offer, index) => (
            <PerspectiveCard
              key={offer.number}
              offer={offer}
              index={index}
              language={language}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
      <div className="relative mt-20 w-full overflow-hidden border-y border-[#D4AF37]/15 bg-white/35 py-6 md:py-8 backdrop-blur-md">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-r from-[#F7F1E3] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-l from-[#F7F1E3] to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center whitespace-nowrap"
          >
            <motion.div
              animate={{
                x: isRTL ? ["0%", "50%"] : ["0%", "-50%"],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex min-w-full items-center gap-10 md:gap-14"
            >
              {marqueeItems.map((text, i) => (
                <div
                  key={`${text}-${i}`}
                  className="group flex items-center gap-5 md:gap-6 cursor-default"
                >
                  <TicketPercent className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

                  <span
                    className="text-4xl md:text-6xl font-serif font-black tracking-tighter text-[#0B1120] transition-all duration-300 group-hover:text-[#D4AF37] group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.85)]"
                    style={{
                      WebkitTextStroke:
                        i % 2 === 0 ? "0px" : "1px rgba(11,17,32,0.18)",
                    }}
                  >
                    {text}
                  </span>

                  <Star className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]/30 fill-[#D4AF37]/30 transition-all duration-300 group-hover:text-[#D4AF37] group-hover:fill-[#D4AF37] group-hover:scale-110" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OffersSection;
