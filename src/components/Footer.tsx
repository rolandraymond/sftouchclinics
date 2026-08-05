import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SiSnapchat } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

interface PhoneItem {
  label: string;
  display: string;
  value: string;
}

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const logoSrc = "/images/logo.png";

  // بيانات الفروع مع الإحداثيات لكل فرع
  const branches = [
    {
      id: "damietta",
      title: t.footer?.damietta || (isRTL ? "فرع دمياط القديمة" : "Old Damietta Branch"),
      desc: isRTL ? "الصفوة مول - برج 2 - الدور 5 - شقة 8" : "Safwa Mall - Tower 2 - 5th Floor - Apt 8",
      mapLink: "https://www.google.com/maps?q=31.422801,31.807625&z=17&hl=en",
      embedLink: "https://maps.google.com/maps?q=31.422801,31.807625&z=17&output=embed",
    },
    {
      id: "new-damietta",
      title: t.footer?.newDamietta || (isRTL ? "فرع دمياط الجديدة" : "New Damietta Branch"),
      desc: isRTL ? "المنطقة المركزية - الدور الأول" : "Central Zone - 1st Floor",
      mapLink: "https://www.google.com/maps?q=31.43739128112793,31.680818557739258&z=17&hl=en",
      embedLink: "https://maps.google.com/maps?q=31.43739128112793,31.680818557739258&z=17&output=embed",
    },
  ];

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about-us", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/doctors", label: t.nav.doctors },
    { href: "/offers", label: t.nav.offers },
    { href: "/contact-us", label: t.nav.contact },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/sftouchclinic",
      hoverClass: "hover:bg-blue-600",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sf_touch_clinic",
      hoverClass: "hover:bg-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com",
      hoverClass: "hover:bg-sky-700",
    },
    {
      icon: Twitter,
      href: "https://www.twitter.com",
      hoverClass: "hover:bg-sky-500",
    },
    {
      icon: SiSnapchat,
      href: "https://www.snapchat.com/add/sf_touchclinic",
      hoverClass: "hover:bg-yellow-400 hover:text-black",
    },
  ];

  const phoneNumbers: PhoneItem[] = [
    {
      label: isRTL ? " تواصل معنا" : "Main Booking",
      display: "015 518 20062",
      value: "01551820062",
    },
    {
      label: isRTL ? " تواصل معنا" : "WhatsApp Booking",
      display: "015 580 08978",
      value: "01558008978",
    },
    {
      label: isRTL ? "فرع دمياط القديمة" : "Damietta Branch",
      display: "015 580 08278",
      value: "01558008278",
    },
    {
      label: isRTL ? "فرع دمياط الجديدة" : "New Damietta Branch",
      display: "015 0365 6589",
      value: "01503656589",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#020617] text-slate-300 pt-20 pb-10">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-yellow-900/10 blur-[120px]" />

      {/* Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg">
                  <img
                    src={logoSrc}
                    alt="Clinic Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-2xl font-bold">
                      {isRTL ? "العيادة" : "Clinic"}
                    </span>
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-sm text-slate-400">
                    {isRTL ? "جمال بثقة أعلى" : "Beauty with elevated confidence"}
                  </p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-400">
                {t.footer?.aboutText ||
                  (isRTL
                    ? "نقدم أرقى خدمات التجميل والعناية بالبشرة بأحدث التقنيات العالمية وبإشراف فريق متخصص يهتم بأدق التفاصيل."
                    : "We deliver premium aesthetic and skin care services using advanced global techniques with a team that cares about every detail.")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                  {isRTL ? "حجز سريع" : "Fast booking"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                  {isRTL ? "رعاية متخصصة" : "Specialized care"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                  {isRTL ? "خدمة مميزة" : "Premium service"}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${social.hoverClass}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h4 className="relative mb-6 inline-block text-lg font-bold text-white">
                {t.footer?.quickLinks || (isRTL ? "روابط سريعة" : "Quick Links")}
                <span className="absolute -bottom-2 left-0 h-0.5 w-1/2 rounded-full bg-yellow-500" />
              </h4>

              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:border-yellow-500/20 hover:bg-yellow-500/10 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors group-hover:bg-yellow-500" />
                        {link.label}
                      </span>
                      <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact + Maps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="relative inline-block text-lg font-bold text-white">
                  {t.footer?.branches || (isRTL ? "فروعنا على الخريطة" : "Our Locations")}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-1/2 rounded-full bg-yellow-500" />
                </h4>
              </div>

              {/* الخريطتين معاً - قابلة للضغط مباشرة */}
              <div className="grid gap-4 md:grid-cols-2">
                {branches.map((branch) => (
                  <a
                    key={branch.id}
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
                  >
                    {/* Overlay لدمج الخريطة مع الستايل ووضع البيانات */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-slate-900/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" />

                    {/* بيانات العنوان بتظهر فوق الخريطة بشكل أنيق */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-transparent p-4 pb-8">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                          <MapPin className="h-3 w-3" />
                        </div>
                        <p className="text-sm font-bold text-white transition-colors group-hover:text-yellow-400">
                          {branch.title}
                        </p>
                      </div>
                      <p className="text-xs text-slate-300 drop-shadow-md">
                        {branch.desc}
                      </p>
                    </div>

                    {/* الخريطة (عطلنا التفاعل معها لتكون مجرد خلفية واللينك هو اللي يشتغل) */}
                    <iframe
                      src={branch.embedLink}
                      title={branch.title}
                      className="pointer-events-none absolute inset-0 h-full w-full border-0 opacity-70 grayscale filter transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* زر يظهر عند تمرير الماوس */}
                    <div className={`absolute bottom-3 z-30 flex translate-y-4 items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${isRTL ? "left-3" : "right-3"}`}>
                      {isRTL ? "افتح الخريطة" : "Open Map"}
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </a>
                ))}
              </div>

              {/* الأرقام والاتصال */}
              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {isRTL ? "أرقام الحجز والاستفسار" : "Booking & Support Numbers"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {isRTL
                        ? "اختار الرقم الأقرب ليك أو اتواصل مباشرة"
                        : "Choose the nearest line or contact us directly"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.value}`}
                      dir="ltr"
                      className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:bg-yellow-500/10"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          {phone.label}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-yellow-500/70 group-hover:bg-yellow-400" />
                      </div>
                      <div className="text-base font-bold text-white transition-colors group-hover:text-yellow-300">
                        {phone.display}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {isRTL ? "ساعات العمل" : "Working Hours"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {t.footer?.hours || "10:00 AM - 10:00 PM"}
                      </p>
                    </div>
                  </div>

                  <a
                    href="mailto:info@sftouchclinics.com"
                    className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200 transition-colors hover:bg-yellow-500/20 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    info@sftouchclinics.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <a
              href="https://tungsten-media.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-yellow-400"
            >
              <span>{t.footer?.copyright}</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-1" />
            </a>

            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="transition-colors hover:text-white">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href="#" className="transition-colors hover:text-white">
                {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;