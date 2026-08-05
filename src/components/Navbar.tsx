import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Globe, MapPin, Clock, ArrowRight, ChevronDown, Zap, Activity, ScanFace, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. زر "Book Appointment" مع تأثير اللمعان
// ----------------------------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

const ShimmerButton = ({ className, children, variant = 'primary', ...props }: ButtonProps) => (
  <button
    type="button"
    className={cn(
      "relative group overflow-hidden rounded-full font-bold transition-all duration-300 active:scale-95",
      variant === 'primary'
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40"
        : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
    <span className="relative z-20 flex items-center justify-center gap-2">
      {children}
    </span>
  </button>
);

// ----------------------------------------------------------------------
// 2. المكون الرئيسي (Navbar)
// ----------------------------------------------------------------------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // States for Dropdowns
  const [isServicesHovered, setIsServicesHovered] = useState(false); // Desktop Hover
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // Mobile Accordion

  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 20;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  useEffect(() => {
    setIsOpen(false);
    setIsMobileServicesOpen(false); // Close sub-menu on page change
  }, [location.pathname]);

  // تعريف التخصصات الفرعية مع إضافة وصف قصير لإعطاء طابع احترافي
  const serviceSubLinks = [
    {
      id: 'dermatology',
      label: language === 'en' ? 'Dermatology' : 'الجلدية والتجميل',
      desc: language === 'en' ? 'Advanced skin care & aesthetics' : 'عناية متقدمة بالبشرة والجمال',
      icon: ScanFace,
      href: '/services/dermatology-laser'
    },
    {
      id: 'laser',
      label: language === 'en' ? 'Hair Restoration' : 'استعادة الشعر',
      desc: language === 'en' ? 'Modern transplant technologies' : 'أحدث تقنيات زراعة وعلاج الشعر',
      icon: Zap,
      href: '/services/hair-restoration'
    },
    {
      id: 'nutrition',
      label: language === 'en' ? 'Nutrition & Body' : 'التغذية ونحت القوام',
      desc: language === 'en' ? 'Custom plans & contouring' : 'برامج مخصصة وتنسيق القوام',
      icon: Activity,
      href: '/services/nutrition-contouring'
    },
  ];

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about-us', label: t.nav.about },
    { href: '/services', label: t.nav.services, hasDropdown: true },
    { href: '/doctors', label: t.nav.doctors },
    { href: '/offers', label: t.nav.offers },
    { href: '/contact-us', label: t.nav.contact },
  ];

  const handleBookAppointment = () => {
    setIsOpen(false);
    setIsMobileServicesOpen(false);
    navigate('/contact-us');
  };

  return (
    <>
      {/* ======================= TOP BAR ======================= */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120] text-slate-300 text-[11px] sm:text-xs font-medium tracking-wide border-b border-white/5"
        initial={{ height: 'auto', opacity: 1, y: 0 }}
        animate={{
          height: isScrolled ? 0 : '40px',
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -40 : 0
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:01503656589" className="flex items-center gap-2 hover:text-yellow-500 transition-colors group">
              <div className="p-1 rounded-full bg-white/5 group-hover:bg-yellow-500/10 transition-colors">
                <Phone className="w-3 h-3 text-yellow-500" />
              </div>
              <span>01503656589</span>
            </a>
            <span className="hidden md:flex items-center gap-2">
              <MapPin className="w-3 h-3 text-slate-500" />
              {language === 'en' ? 'Damietta, Safwa Mall' : 'دمياط، الصفوة مول'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-slate-500" />
              1:00 AM - 1:00 PM
            </span>
            <button onClick={toggleLanguage} className="lg:hidden text-xs font-bold text-white hover:text-yellow-500">
              {language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ======================= NAVBAR ======================= */}
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)",
          isScrolled ? "top-4" : "top-[40px]"
        )}
      >
        <div className={cn(
          "mx-auto transition-all duration-500 flex items-center justify-between",
          isScrolled
            ? "container max-w-5xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 py-2 border border-white ring-1 ring-slate-900/5"
            : "container bg-transparent px-4 sm:px-6 py-5 border-b border-transparent"
        )}>

          {/* LOGO */}
          <Link to="/" className="relative z-10 flex items-center gap-2 group">
            <motion.div
              layout
              className={cn("relative transition-all duration-300", isScrolled ? "w-24" : "w-32")}
            >
              <img src="/images/logo.png" alt="SF Touch" className="w-full h-auto object-contain" />
            </motion.div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-white/50 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

              // 🌟 الإبداع في قائمة الخدمات (Desktop Dropdown) 🌟
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full z-10 flex items-center gap-1",
                        isActive || isServicesHovered ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isServicesHovered ? "rotate-180 text-yellow-600" : "")} />
                      {isActive && !isServicesHovered && (
                        <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white shadow-sm rounded-full -z-10 border border-slate-200/50" />
                      )}
                    </Link>

                    <AnimatePresence>
                      {isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                          transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-[320px]"
                        >
                          {/* Glow Effect Background */}
                          <div className="absolute inset-0 top-5 bg-gradient-to-b from-yellow-500/10 to-transparent blur-xl rounded-3xl -z-10" />
                          
                          <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white ring-1 ring-slate-900/5 overflow-hidden p-3 relative">
                            
                            <div className="flex flex-col gap-1">
                              {serviceSubLinks.map((subItem, idx) => (
                                <motion.div
                                  initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 + 0.1 }}
                                  key={subItem.id}
                                >
                                  <Link
                                    to={subItem.href}
                                    className="group relative flex items-center gap-4 p-3 rounded-[16px] hover:bg-slate-50 transition-all duration-300"
                                  >
                                    {/* Icon Container with Hover Animation */}
                                    <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 overflow-hidden">
                                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                      <subItem.icon className="w-5 h-5 text-slate-600 group-hover:text-white relative z-10 transition-colors duration-300 group-hover:scale-110" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col">
                                      <span className="text-sm font-bold text-slate-800 group-hover:text-yellow-600 transition-colors">
                                        {subItem.label}
                                      </span>
                                      <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                                        {subItem.desc}
                                      </span>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <div className={cn(
                                      "absolute opacity-0 group-hover:opacity-100 transition-all duration-300 text-yellow-500",
                                      isRTL ? "left-4 -translate-x-2 group-hover:translate-x-0" : "right-4 translate-x-2 group-hover:translate-x-0"
                                    )}>
                                      <ArrowRight className={cn("w-4 h-4", isRTL ? "rotate-180" : "")} />
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>

                            {/* Dropdown Footer Link */}
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              <Link
                                to="/services"
                                className="flex items-center justify-center gap-2 p-3 rounded-[12px] bg-slate-900 hover:bg-slate-800 text-white transition-colors group"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                  {language === 'en' ? 'Explore All Services' : 'استكشف كل الخدمات'}
                                </span>
                              </Link>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Normal Links
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full z-10",
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm rounded-full -z-10 border border-slate-200/50"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <ShimmerButton
              onClick={handleBookAppointment}
              className={cn(isScrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm")}
            >
              {t.nav.bookAppointment}
            </ShimmerButton>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 text-slate-800 bg-white rounded-full shadow-sm border border-slate-100 active:scale-90 transition-transform"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ======================= MOBILE MENU ======================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[85%] max-w-[320px] bg-white z-50 lg:hidden shadow-2xl flex flex-col border-l border-slate-100`}
            >
              {/* Menu Header */}
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <div className="w-24 opacity-80 grayscale hover:grayscale-0 transition-all">
                  <img src="/images/logo.png" alt="SF Touch" />
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link, i) => {
                  
                  // 🌟 الإبداع في قائمة الموبايل (Mobile Accordion) 🌟
                  if (link.hasDropdown) {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                        className={cn(
                          "rounded-[20px] overflow-hidden transition-colors duration-300 border border-transparent",
                          isMobileServicesOpen ? "bg-slate-50 border-slate-100" : "hover:bg-slate-50"
                        )}
                      >
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer"
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        >
                          <span className={cn("text-base font-medium", isMobileServicesOpen || location.pathname === link.href ? "text-slate-900 font-bold" : "text-slate-600")}>
                            {link.label}
                          </span>
                          <div className={cn(
                            "p-1.5 rounded-full transition-colors",
                            isMobileServicesOpen ? "bg-yellow-100 text-yellow-600" : "bg-slate-100 text-slate-400"
                          )}>
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileServicesOpen ? "rotate-180" : "")} />
                          </div>
                        </div>

                        {/* Sub-menu Animation */}
                        <AnimatePresence>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className={cn(
                                "px-4 pb-4 space-y-1 relative before:absolute before:top-0 before:bottom-6 before:w-[2px] before:bg-slate-200 before:rounded-full",
                                isRTL ? "before:right-8 pr-12" : "before:left-8 pl-12"
                              )}>
                                {serviceSubLinks.map((subLink) => (
                                  <Link
                                    key={subLink.id}
                                    to={subLink.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "relative flex items-center gap-3 p-3 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-all text-sm font-medium",
                                      location.pathname === subLink.href ? "text-yellow-600 bg-white shadow-sm" : ""
                                    )}
                                  >
                                    <subLink.icon className={cn("w-4 h-4", location.pathname === subLink.href ? "text-yellow-500" : "text-slate-400")} />
                                    {subLink.label}
                                  </Link>
                                ))}
                                <Link
                                  to="/services"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 p-3 mt-3 text-xs font-bold text-white uppercase tracking-wider justify-center bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                  {language === 'en' ? 'View All' : 'عرض الكل'}
                                  <ArrowRight className={cn("w-3.5 h-3.5", isRTL ? "rotate-180" : "")} />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  // Standard Mobile Links
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center justify-between p-4 rounded-2xl text-base font-medium transition-all duration-300",
                          location.pathname === link.href
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        <span>{link.label}</span>
                        {location.pathname === link.href && <ArrowRight className={cn("w-4 h-4 text-yellow-400", isRTL ? "rotate-180" : "")} />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Language</span>
                  <button onClick={toggleLanguage} className="font-bold text-slate-900 px-4 py-1.5 bg-white rounded-lg border shadow-sm flex items-center gap-2 hover:bg-slate-100 transition-colors">
                    <Globe className="w-4 h-4 text-slate-400" />
                    {language === 'en' ? 'Arabic' : 'English'}
                  </button>
                </div>

                <ShimmerButton
                  onClick={handleBookAppointment}
                  className="w-full py-4 text-base rounded-2xl"
                >
                  {t.nav.bookAppointment}
                </ShimmerButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;