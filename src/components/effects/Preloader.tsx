"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// قللنا الوقت لـ 2.5 ثانية عشان اللوجو بيظهر على طول مفيش رسم
const LOADER_DURATION_MS = 2500; 

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          dir={isRTL ? "rtl" : "ltr"}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0B1120] text-white flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* الخلفية والإضاءة البسيطة */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_35%)]" />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
            
            {/* النصوص العلوية */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 text-center"
            >
              <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-white/45">
                SF Touch Clinic
              </p>
              <p className="mt-3 text-sm md:text-base font-medium text-[#D4AF37]">
                {language === "ar" ? "جمال • ثقة • رقي" : "Beauty • Confidence • Elegance"}
              </p>
            </motion.div>

            {/* ظهور اللوجو بشكل مباشر وناعم */}
            <motion.img
              src="/images/logo.png"
              alt="SF Touch Clinic"
              className="w-full max-w-[280px] md:max-w-[400px] h-auto object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />

            {/* شريط التحميل السفلي */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-sm md:text-base font-semibold tracking-[0.35em] text-white/75 uppercase">
                {language === "ar" ? "جارٍ التحميل" : "Loading"}
              </p>

              <div className="mx-auto mt-5 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full w-16 bg-[linear-gradient(90deg,transparent,#D4AF37,#F2D27C,transparent)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "340%" }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;