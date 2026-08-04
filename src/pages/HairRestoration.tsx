import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Scissors, Droplets, Syringe, Sparkles, Activity, HeartPulse } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Advanced Hair Restoration Page Design
 * Features warm ivory light mode, 3D "light capsule" cards, 
 * sweeping particle animations, and glassmorphism.
 */

const CONTACT_PATH = "/contact-us";

const T = {
  eyebrow: { en: 'Our Services', ar: 'خدماتنا' },
  title: { en: 'Hair Restoration', ar: 'استعادة الشعر' },
  heroLine: {
    en: 'Revive your confidence — advanced solutions for natural, lasting growth.',
    ar: 'استعد ثقتك — حلول متقدمة لنمو طبيعي ودائم.',
  },
  subtitle: {
    en: '',
    ar: '',
  },
  cta: { en: 'Book a consultation', ar: 'احجز استشارة' },
  hover: { en: 'Explore', ar: 'اكتشف' },
};

const services = [
  {
    icon: Scissors,
    color: '#8A5A44',
    glow: '#D4A373',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=75',
    title: { en: 'Hair Transplant', ar: 'زراعة الشعر' },
    description: {
      en: 'FUE & DHI techniques for natural results.',
      ar: 'تقنيات FUE و DHI للحصول على نتائج طبيعية.',
    },
  },
  {
    icon: Droplets,
    color: '#B55A5A',
    glow: '#E59F9F',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=75',
    title: { en: 'Hair PRP', ar: 'بي آر بي للشعر' },
    description: {
      en: 'Platelet-rich plasma injections to boost hair growth.',
      ar: 'حقن البلازما الغنية بالصفائح الدموية لتعزيز نمو الشعر.',
    },
  },
  {
    icon: Syringe,
    color: '#4A7C72',
    glow: '#8BC3B8',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=75',
    title: { en: 'Mesotherapy', ar: 'الميزوثيرابي' },
    description: {
      en: 'Vitamin and mineral injections to nourish the scalp.',
      ar: 'حقن فيتامينات ومعادن لتغذية فروة الرأس.',
    },
  },
  {
    icon: Sparkles,
    color: '#C49A45',
    glow: '#F0D194',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=75',
    title: { en: 'Baldness Treatment', ar: 'علاج الصلع' },
    description: {
      en: 'Comprehensive solutions for hereditary baldness.',
      ar: 'حلول متكاملة لعلاج الصلع الوراثي.',
    },
  },
  {
    icon: Activity,
    color: '#466C8C',
    glow: '#98BBE0',
    image: '/images/imagedev3.png',
    title: { en: 'Hair Analysis', ar: 'تحليل الشعر' },
    description: {
      en: 'Accurate diagnosis of hair and scalp problems.',
      ar: 'تشخيص دقيق لمشاكل الشعر وفروة الرأس.',
    },
  },
  {
    icon: HeartPulse,
    color: '#99627A',
    glow: '#D8A6C0',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&q=75',
    title: { en: 'Hair Loss Treatment', ar: 'علاج التساقط' },
    description: {
      en: 'Comprehensive treatment programs to stop hair loss.',
      ar: 'برامج علاجية شاملة لوقف تساقط الشعر.',
    },
  },
];

const LightOrb = ({ color, glow, Icon, id, image, alt }) => (
  <div className="relative w-full h-full rounded-full overflow-hidden" style={{ isolation: 'isolate' }}>
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'saturate(0.92) contrast(1.02)' }}
    />

    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle at 32% 26%, transparent 30%, ${color}55 100%)` }}
    />

    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id={`beam-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`blur-${id}`}><feGaussianBlur stdDeviation="3.4" /></filter>
      </defs>
      <circle cx="100" cy="100" r="98" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="2" />
      <rect x="6" y="58" width="188" height="12" fill={`url(#beam-${id})`} filter={`url(#blur-${id})`}
            transform="rotate(-18 100 100)" />
      <ellipse cx="72" cy="60" rx="22" ry="12" fill="#fff" opacity="0.35" filter={`url(#blur-${id})`} />
    </svg>

    <div
      className="absolute bottom-1.5 right-1.5 w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(4px)',
        border: `1px solid ${color}55`,
        boxShadow: `0 4px 14px -4px ${color}88`,
      }}
    >
      <Icon size={16} color={color} strokeWidth={2} />
    </div>
  </div>
);

const TiltCard = ({ service, index, dir, onNavigate }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py, active: true });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onNavigate}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg) translateZ(${tilt.active ? 8 : 0}px)`,
        transition: 'transform 0.25s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative w-full text-left rounded-[28px] p-7 bg-white/80 backdrop-blur-sm border border-black/[0.04] shadow-[0_18px_45px_-20px_rgba(40,30,20,0.25)] overflow-hidden cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-30"
        style={{ background: service.glow }}
      />

      <div className="relative w-24 h-24 mb-6" style={{ transform: 'translateZ(30px)' }}>
        <LightOrb
          color={service.color}
          glow={service.glow}
          Icon={service.icon}
          id={index}
          image={service.image}
          alt={service.title[dir]}
        />
      </div>

      <h3
        className="text-xl font-semibold mb-2 relative"
        style={{ color: '#2B2620', transform: 'translateZ(20px)' }}
      >
        {service.title[dir]}
      </h3>
      <p className="text-sm leading-relaxed relative" style={{ color: '#6B6154', transform: 'translateZ(15px)' }}>
        {service.description[dir]}
      </p>

      <div
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide relative"
        style={{ color: service.color, transform: 'translateZ(20px)' }}
      >
        <span>{T.hover[dir]}</span>
        <span className="inline-block transition-transform group-hover:translate-x-1">
          {dir === 'ar' ? '←' : '→'}
        </span>
      </div>
    </motion.button>
  );
};

const HairRestoration = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const dir = language === 'ar' ? 'ar' : 'en';
  const isRtl = dir === 'ar';

  return (
    <div style={{ background: '#FAF6F1' }} dir={isRtl ? 'rtl' : 'ltr'}>
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

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className="df-particle absolute rounded-full pointer-events-none"
            style={{
              left: `${8 + i * 12}%`,
              bottom: '8%',
              width: 5 + (i % 3) * 3,
              height: 5 + (i % 3) * 3,
              background: i % 2 === 0 ? '#D4A373' : '#8BC3B8',
              opacity: 0.5,
              animation: `rise ${6 + i}s ease-in-out ${i * 0.7}s infinite`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <span
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5"
                style={{ color: '#8A5A44', background: '#EADCD3' }}
              >
                {T.eyebrow[dir]}
              </span>
              <h1
                className={`text-5xl md:text-6xl font-medium leading-[1.05] mb-6 ${isRtl ? 'df-arabic' : 'df-serif'}`}
                style={{ color: '#2B2620' }}
              >
                {T.title[dir]}
              </h1>
              <p
                className={`text-lg mb-3 ${isRtl ? 'df-arabic' : 'df-body'}`}
                style={{ color: '#B55A5A' }}
              >
                {T.heroLine[dir]}
              </p>
              <p
                className={`text-base leading-relaxed max-w-md mb-8 ${isRtl ? 'df-arabic' : 'df-body'}`}
                style={{ color: '#6B6154' }}
              >
                {T.subtitle[dir]}
              </p>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 16px 32px -12px rgba(138,90,68,0.45)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(CONTACT_PATH)}
                className={`px-7 py-3.5 rounded-full text-white text-sm font-semibold ${isRtl ? 'df-arabic' : 'df-body'}`}
                style={{ background: 'linear-gradient(135deg, #8A5A44, #4A7C72)' }}
              >
                {T.cta[dir]}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative aspect-square max-w-md mx-auto"
              style={{ perspective: '1200px' }}
            >
              <div
                className="df-orb-float absolute inset-0 rounded-full"
                style={{
                  animation: 'drift 7s ease-in-out infinite',
                  background: 'radial-gradient(circle at 35% 28%, #F7EBE1 0%, #D4A373 38%, rgba(212,163,115,0.05) 72%)',
                  boxShadow: '0 40px 90px -30px rgba(138,90,68,0.4), inset 0 0 60px rgba(255,255,255,0.4)',
                  transform: 'rotateX(8deg) rotateY(-10deg)',
                }}
              />
              <div
                className="df-beam absolute inset-0 rounded-full overflow-hidden"
                style={{ transform: 'rotateX(8deg) rotateY(-10deg)' }}
              >
                <div
                  className="df-beam absolute w-[60%] h-[16%] top-[38%]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
                    animation: 'beamSweep 3.4s ease-in-out infinite',
                  }}
                />
              </div>
              <div
                className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <Sparkles size={64} color="#8A5A44" strokeWidth={1.3} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding pb-28">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, index) => (
              <TiltCard 
                key={index} 
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

export default HairRestoration;