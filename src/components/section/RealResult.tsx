import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronLeft,
  ChevronRight,
  Scissors,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Case {
  before: string;
  after: string;
}

interface Service {
  id: string;
  labelEn: string;
  labelAr: string;
  case: Case;
  link: string;
}

interface Specialty {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  mainLink: string;
  services: Service[];
}

const specialties: Specialty[] = [
  {
    id: "non-surgical",
    labelEn: "Non-Surgical",
    labelAr: "التجميل اللاجراحي",
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
    mainLink: "/services/dermatology-laser",
    services: [
      {
        id: "fillers unser eye",
        labelEn: "fillers unser eye",
        labelAr: "فيلر تحت العين",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb25.png",
          after: "/images/imageca25.png",
        },
      },
      {
        id: "liquid face lift",
        labelEn: "liquid face lift",
        labelAr: "شد الوجه السائل",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb20.png",
          after: "/images/imageca20.png",
        },
      },
      {
        id: "TEXAS",
        labelEn: "TEXAS",
        labelAr: "حقن تكساس",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb21.png",
          after: "/images/imageca21.png",
        },
      },
      {
        id: "Templa Erea Filler",
        labelEn: "Templa Erea Filler",
        labelAr: "فيلر منطقة الصدغين",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb22.png",
          after: "/images/imageca22.png",
        },
      },
      {
        id: "biostimulator (Poly-L-Lactic Acid)",
        labelEn: "Biostimulator (Poly-L-Lactic Acid)",
        labelAr: "المحفز الحيوي (حمض البولي-إي-لاكتيك)",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb23.png",
          after: "/images/imageca23.png",
        },
      },
      {
        id: "jawline",
        labelEn: "Jawline",
        labelAr: "خط الفك",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb24.png",
          after: "/images/imageca24.png",
        },
      },

      {
        id: "fillers",
        labelEn: "Fillers",
        labelAr: "الفيلر",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb26.png",
          after: "/images/imageca26.png",
        },
      },
      {
        id: "botox",
        labelEn: "Botox",
        labelAr: "البوتوكس",
        link: "/services/dermatology-laser",
        case: { before: "/images/imagecb5.png", after: "/images/imageca5.png" },
      },

      {
        id: "acne scars treatment",
        labelEn: "Acne Scars Treatment",
        labelAr: "علاج ندبات حب الشباب",
        link: "/services/dermatology-laser",
        case: {
          before: "/images/imagecb19.png",
          after: "/images/imageca19.png",
        },
      },
    ],
  },
  /*  {
    id: "surgical",
    labelEn: "Surgical Aesthetics",
    labelAr: "التجميل الجراحي",
    icon: <Scissors className="w-5 h-5 md:w-6 md:h-6" />,
    mainLink: "/services/plastic-surgery",
    services: [
      {
        id: "breast-red",
        labelEn: "Breast Reduction",
        labelAr: "تصغير الثدي",
        link: "/services/plastic-surgery",
        case: {
          before: "/images/imagecb12.png",
          after: "/images/imageca12.png",
        },
      },
      {
        id: "breast-aug",
        labelEn: "Breast Augmentation",
        labelAr: "تكبير الثدي",
        link: "/services/plastic-surgery",
        case: {
          before: "/images/imagecb13.png",
          after: "/images/imageca13.png",
        },
      },
     
    ],
  }, */
];

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  language,
}: {
  beforeImage: string;
  afterImage: string;
  language: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });

  const clipWidth = useTransform(springX, (val) => {
    if (containerWidth === 0) return 50;
    return ((val + containerWidth / 2) / containerWidth) * 100;
  });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] md:aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-ew-resize shadow-2xl border border-white/10 bg-black/10"
    >
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            "absolute top-4 md:top-6 px-3 py-1 md:px-4 md:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10",
            language === "ar" ? "right-4 md:right-6" : "left-4 md:left-6",
          )}
        >
          <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest">
            {language === "en" ? "Before" : "قبل"}
          </span>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 overflow-hidden bg-black/10"
        style={{
          clipPath: useTransform(clipWidth, (w) => `inset(0 0 0 ${w}%)`),
        }}
      >
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            "absolute top-4 md:top-6 px-3 py-1 md:px-4 md:py-2 rounded-full bg-[#D4AF37] shadow-lg",
            language === "ar" ? "left-4 md:left-6" : "right-4 md:right-6",
          )}
        >
          <span className="text-[8px] md:text-[10px] font-bold text-black uppercase tracking-widest">
            {language === "en" ? "After" : "بعد"}
          </span>
        </div>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{
          left: -containerWidth / 2,
          right: containerWidth / 2,
        }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x, left: "50%", translateX: "-50%" }}
        className="absolute inset-y-0 z-30 flex items-center justify-center touch-none"
      >
        <div className="w-[1px] h-full bg-white/30 backdrop-blur-md relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-gray-100">
            <div className="flex gap-0.5 text-[#D4AF37]">
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RealResults = () => {
  const { language, isRTL } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0]);
  const [activeService, setActiveService] = useState(
    specialties[0].services[0],
  );
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const header = {
    subtitle:
      language === "en" ? "Transformative Journeys" : "رحلات التحول الحقيقية",
    title1: language === "en" ? "REAL" : "نتائج",
    title2: language === "en" ? "RESULTS" : "حقيقية",
  };

  return (
    <section
      className="py-16 md:py-32 bg-[#F7F1E3] relative overflow-hidden"
      id="real-results"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(11,17,32,0.10),transparent_35%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* تم ضبط المسافات والتنسيق لضمان الفصل التام بين العنوان والبراجراف */}
        <div className="flex flex-col mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#D4AF37] text-lg md:text-2xl mb-2 md:mb-4 block font-bold font-serif">
              {header.subtitle}
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-[7.5rem] font-serif font-black tracking-tighter leading-[1] md:leading-[0.95] uppercase text-[#0B1120] pb-2">
              {header.title1}{" "}
              <span className="text-[#D4AF37] italic ms-2 md:ms-4 inline-block">
                {header.title2}
              </span>
            </h2>
          </motion.div>

          {/* فصلنا البراجراف بـ margin مناسب لحجم العنوان الكبير */}
          <p
            className={cn(
              "text-[#0B1120]/60 text-xs md:text-sm max-w-xl font-bold leading-relaxed mt-6 md:mt-10",
              language === "en"
                ? "uppercase tracking-[0.2em] md:tracking-[0.3em] text-left"
                : "text-right tracking-normal font-cairo text-sm md:text-base"
            )}
          >
            {language === "en"
              ? "Witness refined aesthetics through premium artistry and precise transformation."
              : "شاهدوا الجمال الراقي من خلال لمسة فاخرة وتحول دقيق بأعلى جودة."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* باقي الكود الخاص بالـ specialties */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6 overflow-x-auto sm:overflow-visible pb-4 md:pb-0">
            {specialties.map((specialty) => {
              const isActive = activeSpecialty.id === specialty.id;

              return (
                <div
                  key={specialty.id}
                  className="relative flex flex-col gap-3 flex-shrink-0 w-full sm:w-[48%] lg:w-full"
                >
                  <motion.button
                    onClick={() => {
                      setActiveSpecialty(specialty);
                      setActiveService(specialty.services[0]);
                    }}
                    className={cn(
                      "w-full p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 transition-all duration-500 border relative z-10 overflow-hidden",
                      isActive
                        ? "bg-white border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/10"
                        : "bg-white/40 border-transparent opacity-75 hover:opacity-100",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all flex-shrink-0",
                        isActive
                          ? "bg-[#D4AF37] text-[#0B1120] shadow-lg"
                          : "bg-[#0B1120]/5 text-[#0B1120]/60",
                      )}
                    >
                      {specialty.icon}
                    </div>

                    <div className="text-start flex-1">
                      <span className="text-sm md:text-xl font-serif font-bold tracking-tight block text-[#0B1120]">
                        {language === "en"
                          ? specialty.labelEn
                          : specialty.labelAr}
                      </span>
                      <span className="text-[10px] text-[#0B1120]/40 font-bold uppercase tracking-widest">
                        {specialty.services.length}{" "}
                        {language === "en" ? "Cases" : "حالات"}
                      </span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-center md:justify-start"
                      >
                        <Link
                          to={specialty.mainLink}
                          className="bg-[#0B1120] text-white text-[9px] md:text-[10px] px-6 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 hover:bg-[#D4AF37] hover:text-[#0B1120] transition-all shadow-lg active:scale-95"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {language === "en" ? "View Page" : "عرض الصفحة"}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="flex gap-2 mb-8 md:mb-12 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecialty.id}
                  className="flex gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {activeSpecialty.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service)}
                      className={cn(
                        "px-4 py-2 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeService.id === service.id
                          ? "bg-[#0B1120] text-white shadow-lg"
                          : "bg-white/60 text-[#0B1120]/45 hover:bg-white",
                      )}
                    >
                      {language === "en" ? service.labelEn : service.labelAr}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative">
              <BeforeAfterSlider
                beforeImage={activeService.case.before}
                afterImage={activeService.case.after}
                language={language}
              />

              <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-[#0B1120]/10 pt-8 md:pt-10">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-[#0B1120]">
                    {language === "en"
                      ? activeService.labelEn
                      : activeService.labelAr}
                  </h3>

                  <Link
                    to={activeService.link}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#0B1120]/40 group-hover:text-[#D4AF37] transition-colors">
                      {language === "en"
                        ? "Procedure Details"
                        : "تفاصيل الإجراء"}
                    </span>
                    <ArrowIcon className="w-3 h-3 text-[#0B1120]/40 group-hover:text-[#D4AF37]" />
                  </Link>
                </div>

                <Link to="/contact-us" className="w-full md:w-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-[#0B1120] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#D4AF37] hover:text-[#0B1120] transition-all"
                  >
                    {language === "en"
                      ? "Book Similar Result"
                      : "احجزي نتيجة مماثلة"}
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealResults;
