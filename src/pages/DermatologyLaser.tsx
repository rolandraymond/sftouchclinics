import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Zap,
  Syringe,
  Sun,
  Target,
  Waves,
  CalendarCheck,
  Quote,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
const CONTACT_PATH = "/contact-us";

type LocaleKey = "en" | "ar";

interface TextPair {
  en: string;
  ar: string;
}

/* interface ServiceItem {
  icon: ComponentType<
    SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number }
  >;
  color: string;
  glow: string;
  image: string;
  title: TextPair;
  description: TextPair;
} */

const T: Record<string, TextPair> & { hover: TextPair } = {
  eyebrow: { en: "Our Services", ar: "خدماتنا" },
  title: { en: "Dermatology & Laser", ar: "الجلدية والليزر" },
  heroLine: {
    en: "Every treatment here is, quite literally, light meeting skin.",
    ar: "كل علاج هنا هو، حرفيًا، لقاء بين الضوء والبشرة.",
  },
  subtitle: { en: "", ar: "" },
  cta: { en: "Book a consultation", ar: "احجز استشارة" },
  hover: { en: "Book now", ar: "احجز الآن" },
};

const services: ServiceItem[] = [
  {
    icon: Sparkles,
    color: "#D97A3E",
    glow: "#F6C88A",
    image:
      "https://images.unsplash.com/photo-1731514771613-991a02407132?auto=format&fit=crop&w=600&q=75",
    title: { en: "Skin Treatment", ar: "علاج البشرة" },
    description: {
      en: "Advanced treatments for acne, pigmentation, and scars.",
      ar: "علاجات متقدمة لحب الشباب والتصبغات والندبات.",
    },
  },
  {
    icon: Zap,
    color: "#2F6F62",
    glow: "#8FCBB8",
    image:
      "https://images.unsplash.com/photo-1746806942799-b4db209e9a6b?auto=format&fit=crop&w=600&q=75",
    title: { en: "Laser Hair Removal", ar: "إزالة الشعر بالليزر" },
    description: {
      en: "Motus Pro technology for safe, permanent removal.",
      ar: "تقنية Motus Pro للإزالة الآمنة والدائمة.",
    },
  },
  {
    icon: Syringe,
    color: "#B85C6B",
    glow: "#F0AFBA",
    image:
      "https://images.unsplash.com/photo-1731355771317-b2ab72c79124?auto=format&fit=crop&w=600&q=75",
    title: { en: "Botox & Fillers", ar: "البوتوكس والفيلر" },
    description: {
      en: "Aesthetic injectables for facial rejuvenation.",
      ar: "حقن تجميلية لتجديد شباب الوجه.",
    },
  },
  {
    icon: Sun,
    color: "#C9972B",
    glow: "#F3D98B",
    image:
      "https://images.unsplash.com/photo-1730288951113-9cc087c14b83?auto=format&fit=crop&w=600&q=75",
    title: { en: "Pigmentation Treatment", ar: "علاج التصبغات" },
    description: {
      en: "Advanced techniques for even skin tone.",
      ar: "تقنيات متطورة لتوحيد لون البشرة.",
    },
  },
  {
    icon: Target,
    color: "#3D6E8F",
    glow: "#9AC6E0",
    image:
      "https://images.unsplash.com/photo-1761718209708-9ab9ba1c7252?auto=format&fit=crop&w=600&q=75",
    title: { en: "Acne Treatment", ar: "علاج حب الشباب" },
    description: {
      en: "Comprehensive programs for clear skin.",
      ar: "برامج علاجية شاملة للحصول على بشرة صافية.",
    },
  },
  {
    icon: Waves,
    color: "#5B7A3A",
    glow: "#B7D08A",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=75",
    title: { en: "Skin Tightening", ar: "شد البشرة" },
    description: {
      en: "RF techniques for non-surgical skin tightening.",
      ar: "تقنيات RF لشد البشرة بدون جراحة.",
    },
  },
];

/* interface LightOrbProps {
  color: string;
  Icon: ServiceItem["icon"];
  id: number;
  image: string;
  alt: string;
} */

const LightOrb = ({ color, Icon, id, image, alt }: LightOrbProps) => {
  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.92) contrast(1.02)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 32% 26%, transparent 30%, ${color}55 100%)`,
        }}
      />

      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`beam-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id={`blur-${id}`}>
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke={color}
          strokeOpacity="0.35"
          strokeWidth="2"
        />

        <rect
          x="6"
          y="58"
          width="188"
          height="12"
          fill={`url(#beam-${id})`}
          filter={`url(#blur-${id})`}
          transform="rotate(-18 100 100)"
        />

        <ellipse
          cx="72"
          cy="60"
          rx="22"
          ry="12"
          fill="#fff"
          opacity="0.35"
          filter={`url(#blur-${id})`}
        />
      </svg>

      <div
        className="absolute bottom-1.5 right-1.5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(4px)",
          border: `1px solid ${color}55`,
          boxShadow: `0 4px 14px -4px ${color}88`,
        }}
      >
        <Icon size={16} color={color} strokeWidth={2} />
      </div>
    </div>
  );
};

interface TiltCardProps {
  service: ServiceItem;
  index: number;
  dir: LocaleKey;
  onNavigate: () => void;
}

const TiltCard = ({ service, index, dir, onNavigate }: TiltCardProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const isRtl = dir === "ar";

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py, active: true });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onNavigate}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x * 12}deg) rotateX(${
          -tilt.y * 12
        }deg) translateZ(${tilt.active ? 8 : 0}px)`,
        transition: "transform 0.25s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative w-full rounded-[28px] p-7 bg-white/80 backdrop-blur-sm border border-black/[0.04] shadow-[0_18px_45px_-20px_rgba(40,30,20,0.25)] overflow-hidden cursor-pointer",
        isRtl ? "text-right" : "text-left"
      )}
      aria-label={`${service.title[dir]} - ${T.hover[dir]}`}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-30"
        style={{ background: service.glow }}
      />

      <div
        className="relative w-24 h-24 mb-6"
        style={{ transform: "translateZ(30px)" }}
      >
        <LightOrb
          color={service.color}
          Icon={service.icon}
          id={index}
          image={service.image}
          alt={service.title[dir]}
        />
      </div>

      <h3
        className="text-xl font-semibold mb-2 relative"
        style={{ color: "#2B2620", transform: "translateZ(20px)" }}
      >
        {service.title[dir]}
      </h3>

      <p
        className="text-sm leading-relaxed relative"
        style={{ color: "#6B6154", transform: "translateZ(15px)" }}
      >
        {service.description[dir]}
      </p>

      <div
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide relative",
          isRtl ? "flex-row-reverse" : ""
        )}
        style={{ color: service.color, transform: "translateZ(20px)" }}
      >
        <span>{T.hover[dir]}</span>
        <span className="inline-block transition-transform group-hover:translate-x-1">
          {isRtl ? "←" : "→"}
        </span>
      </div>
    </motion.button>
  );
};

const DermatologyLaser = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const dir: LocaleKey = language === "ar" ? "ar" : "en";
  const isRtl = dir === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen" style={{ background: "#FAF6F1" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,380;9..144,560&family=Cairo:wght@400;600;800&family=Inter:wght@400;500&display=swap');

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(14px, -18px) scale(1.05); }
        }

        @keyframes rise {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translateY(-140px); opacity: 0; }
        }

        @keyframes beamSweep {
          0% { transform: translateX(-30%) rotate(-20deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateX(130%) rotate(-20deg); opacity: 0; }
        }

        .df-serif { font-family: 'Fraunces', serif; }
        .df-arabic { font-family: 'Cairo', sans-serif; }
        .df-body { font-family: 'Inter', sans-serif; }

        @media (prefers-reduced-motion: reduce) {
          .df-particle, .df-beam, .df-orb-float { animation: none !important; }
        }
      `}</style>

      <section className="relative pt-32 pb-24 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className="df-particle absolute rounded-full pointer-events-none"
            style={{
              left: `${8 + i * 12}%`,
              bottom: "8%",
              width: 5 + (i % 3) * 3,
              height: 5 + (i % 3) * 3,
              background: i % 2 === 0 ? "#F0AF7A" : "#8FCBB8",
              opacity: 0.5,
              animation: `rise ${6 + i}s ease-in-out ${i * 0.7}s infinite`,
              filter: "blur(0.5px)",
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={cn(isRtl ? "text-right" : "text-left", isRtl ? "df-arabic" : "df-body")}
            >
              <span
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5"
                style={{ color: "#B85C2E", background: "#F6E4D2" }}
              >
                {T.eyebrow[dir]}
              </span>

              <h1
                className={`text-5xl md:text-6xl font-medium leading-[1.05] mb-6 ${isRtl ? "df-arabic" : "df-serif"}`}
                style={{ color: "#2B2620" }}
              >
                {T.title[dir]}
              </h1>

              <p
                className={`text-lg mb-3 ${isRtl ? "df-arabic" : "df-body"}`}
                style={{ color: "#5B7A3A" }}
              >
                {T.heroLine[dir]}
              </p>

              <p
                className={`text-base leading-relaxed max-w-md mb-8 ${isRtl ? "df-arabic" : "df-body"}`}
                style={{ color: "#6B6154" }}
              >
                {T.subtitle[dir]}
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 16px 32px -12px rgba(217,122,62,0.45)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(CONTACT_PATH)}
                className={`px-7 py-3.5 rounded-full text-white text-sm font-semibold ${
                  isRtl ? "df-arabic" : "df-body"
                }`}
                style={{
                  background: "linear-gradient(135deg, #D97A3E, #C9972B)",
                }}
              >
                {T.cta[dir]}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative aspect-square max-w-md mx-auto"
              style={{ perspective: "1200px" }}
            >
              <div
                className="df-orb-float absolute inset-0 rounded-full"
                style={{
                  animation: "drift 7s ease-in-out infinite",
                  background:
                    "radial-gradient(circle at 35% 28%, #FBEAD4 0%, #F0AF7A 38%, rgba(240,175,122,0.05) 72%)",
                  boxShadow:
                    "0 40px 90px -30px rgba(217,122,62,0.4), inset 0 0 60px rgba(255,255,255,0.4)",
                  transform: "rotateX(8deg) rotateY(-10deg)",
                }}
              />

              <div
                className="df-beam absolute inset-0 rounded-full overflow-hidden"
                style={{ transform: "rotateX(8deg) rotateY(-10deg)" }}
              >
                <div
                  className="df-beam absolute w-[60%] h-[16%] top-[38%]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                    animation: "beamSweep 3.4s ease-in-out infinite",
                  }}
                />
              </div>

              <div
                className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                <Zap size={64} color="#2F6F62" strokeWidth={1.3} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, index) => (
              <TiltCard
                key={service.title.en}
                service={service}
                index={index}
                dir={dir}
                onNavigate={() => navigate(CONTACT_PATH)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DermatologyLaser;
