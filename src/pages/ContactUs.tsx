import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
  SendHorizontal,
  MessageSquareText,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "201503656589";

const MAP_URL =
  "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bing.com%2Fmaps%2Fdefault.aspx%3Fv%3D2%26pc%3DFACEBK%26mid%3D8100%26where1%3D%25D8%25AF%25D9%2585%25D9%258A%25D8%25A7%25D8%25B7%2520%25D8%25A7%25D9%2584%25D9%2582%25D8%25AF%25D9%258A%25D9%2585%25D8%25A9%2520%25D8%25A7%25D9%2584%25D8%25B5%25D9%2581%25D9%2588%25D8%25A9%2520%25D9%2585%25D9%2588%25D9%2584%2520-%2520%25D8%25A8%25D8%25B1%25D8%25AC%25202%2520-%2520%25D8%25A7%25D9%2584%25D8%25AF%25D9%2588%25D8%25B1%2520%25D8%25A7%25D9%2584%25D8%25AE%25D8%25A7%25D9%2585%25D8%25B3%2520-%2520%25D8%25B4%25D9%2582%25D8%25A9%25208%252C%2520Damietta%252C%2520Egypt%26FORM%3DFBKPL1%26mkt%3Den-GB%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExTHJPbXU1MjJlbHhWMEc2THNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7Vk4jXc-1tmq5NtmXZnkanP8UM4XxGvK4VHoYZxlu5rzz85KON-dG4BiE3cw_aem_6_azjJNvW9dZSr_rIV1dXQ&h=AUAGq-9EPxt6oIe3_qk2RjpiGZOe1uOGzNpFZV75PCiL-fjWPR9F5-EVmzV7qsP0Oe9obI_xoGPmTTYdjnXKDzDym178GotZkKAxJ2bbgYXbIa1UWHSSQm8dofk7G9xvM-m_";

type LocaleKey = "en" | "ar";

interface TextPair {
  en: string;
  ar: string;
}

interface Branch {
  id: string;
  name: TextPair;
  address: TextPair;
  phones: string[];
  hours: TextPair;
}

interface FormDataState {
  fullName: string;
  phone: string;
  email: string;
  branch: string;
  message: string;
}

const BRANCHES: Branch[] = [
  {
    id: "01",
    name: { en: "Damietta Branch", ar: "فرع دمياط" },
    address: { en: "Safwa Mall, 2nd Floor", ar: "مول صفوة، الدور الثاني" },
    phones: ["01551820062", "01558008278", "572260062", "01147113246"],
    hours: { en: "Daily 12:00 PM - 10:00 PM", ar: "يوميًا من 1 ظهرًا إلى 1 صباحأ" },
  },
  {
    id: "02",
    name: { en: "New Damietta", ar: "فرع دمياط الجديدة" },
    address: { en: "Central Zone", ar: "المنطقة المركزية" },
    phones: ["572430009", "01503656589", "01503656598", "01558008978"],
    hours: { en: "Daily 12:00 PM - 10:00 PM", ar: "يوميًا من 1 ظهرًا إلى 1 صباحأ" },
  },
];

const ContactUs = () => {
  const { t, language, isRTL } = useLanguage();
  const dir: LocaleKey = language === "ar" ? "ar" : "en";

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    phone: "",
    email: "",
    branch: "",
    message: "",
  });

  const branches = useMemo(() => BRANCHES, []);

  const updateField = (field: keyof FormDataState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildWhatsAppMessage = () => {
    const selectedBranch =
      branches.find((b) => b.id === formData.branch) ?? branches[0];

    const lines =
      dir === "ar"
        ? [
            "صفحة تواصل معنا",
            "----------------",
            `الاسم: ${formData.fullName || "غير مذكور"}`,
            `رقم الهاتف: ${formData.phone || "غير مذكور"}`,
            `البريد الإلكتروني: ${formData.email || "غير مذكور"}`,
            `الفرع المطلوب: ${selectedBranch.name.ar}`,
            `العنوان: ${selectedBranch.address.ar}`,
            "",
            "الرسالة:",
            formData.message || "لا توجد رسالة.",
          ]
        : [
            "Contact us page",
            "----------------",
            `Name: ${formData.fullName || "Not provided"}`,
            `Phone: ${formData.phone || "Not provided"}`,
            `Email: ${formData.email || "Not provided"}`,
            `Preferred branch: ${selectedBranch.name.en}`,
            `Address: ${selectedBranch.address.en}`,
            "",
            "Message:",
            formData.message || "No message provided.",
          ];

    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const inputBase =
    "peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none placeholder-transparent transition-colors duration-300 focus:border-amber-500";
  const labelBase =
    "absolute top-3 text-slate-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-bold peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 pointer-events-none";

  const sectionTitle = isRTL ? "صفحة تواصل معنا" : "Contact Us";
  const heroTitlePrimary = isRTL ? "خلّينا على تواصل" : "Let's stay in touch";
  const heroText = isRTL
    ? "عندك استفسار أو حابب تعرف تفاصيل أكتر عن الخدمات؟ فريقنا الطبي و المنسقين موجودين للرد على الاستفسارات ومساعدتك في اختيار الخدمة المناسبة وتحديد الموعد."
    : "Do you have a question or want more details about our services? Our medical team and coordinators are ready to help you choose the right service and book the best time.";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#FCFBF7] relative overflow-hidden pt-36 pb-32 selection:bg-amber-100 selection:text-amber-900 font-cairo"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-100/50 via-orange-50/20 to-transparent rounded-full blur-[100px] opacity-70 -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-100 via-stone-100/40 to-transparent rounded-full blur-[100px] opacity-80 translate-y-1/4 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-amber-700 text-[11px] font-bold tracking-[0.25em] uppercase">
              {sectionTitle}
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            {isRTL ? (
              <>
                {heroTitlePrimary} <br />
                <span className="font-light text-slate-500 italic">
                </span>
              </>
            ) : (
              <>
                {heroTitlePrimary} <br />
                <span className="font-light text-slate-500 italic">
                  with care and clarity
                </span>
              </>
            )}
          </h1>

          <p className="mt-8 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {heroText}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-5 flex flex-col gap-6",
              isRTL ? "lg:order-2" : "lg:order-1",
            )}
          >
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:border-amber-100 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400 opacity-70" />

                <div
                  dir="ltr"
                  className={cn(
                    "absolute -top-6 text-[8rem] font-black text-slate-50 font-serif leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-amber-50/70",
                    isRTL ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
                  )}
                >
                  {branch.id}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h3 className={cn("text-2xl font-bold text-slate-900", isRTL ? "text-right" : "text-left")}>
                      {branch.name[dir]}
                    </h3>

                    <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700 text-xs font-bold">
                      <Navigation className="w-3.5 h-3.5" />
                      {isRTL ? "زيارة" : "Visit"}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                        <MapPin className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <div className={cn(isRTL ? "text-right" : "text-left")}>
                        <p className="text-slate-600 font-medium leading-relaxed">
                          {branch.address[dir]}
                        </p>

                        <a
                          href={MAP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider"
                        >
                          {isRTL ? "الخريطة والاتجاهات" : "Map & Directions"}
                          <ArrowRight className={cn("w-3.5 h-3.5", isRTL && "rotate-180")} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                        <Phone className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <div className={cn("space-y-2", isRTL ? "text-right" : "text-left")}>
                        {branch.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className={cn(
                              "block text-slate-600 font-medium hover:text-slate-900 transition-colors text-lg",
                              isRTL ? "text-right" : "text-left"
                            )}
                            dir="ltr"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                        <Clock className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <div className={cn(isRTL ? "text-right" : "text-left")}>
                         <p className="text-slate-600 font-medium leading-relaxed">
                           {branch.hours[dir]}
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-7 bg-white/60 backdrop-blur-3xl border border-white p-10 sm:p-14 lg:p-16 rounded-[2.5rem] shadow-[0_20px_80px_rgba(15,23,42,0.04)]",
              isRTL ? "lg:order-1 text-right" : "lg:order-2 text-left",
            )}
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700 font-bold text-xs tracking-[0.2em] uppercase mb-5">
                <MessageSquareText className="w-4 h-4" />
                {isRTL ? "نموذج سريع" : "Quick Form"}
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {isRTL ? "اكتب رسالتك" : "Write your message"}
              </h2>

              <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                {isRTL
                  ? "املأ البيانات الأساسية، واختار الفرع المناسب، ثم أرسل التفاصيل مباشرة إلى الفريق عبر واتساب."
                  : "Fill in the basic details, choose the right branch, then send your request directly to the team on WhatsApp."}
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    onFocus={() => setFocusedInput("fullName")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="name"
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn(inputBase, isRTL ? "text-right" : "text-left")}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "الاسم بالكامل" : "Full Name"}
                  </label>
                  <div
                    className={cn(
                      "absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out",
                      focusedInput === "fullName"
                        ? "w-full opacity-100"
                        : "w-0 opacity-0",
                      isRTL ? "right-0" : "left-0",
                    )}
                  />
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="tel"
                    dir="ltr"
                    className={cn(inputBase, isRTL ? "text-right" : "text-left")}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <div
                    className={cn(
                      "absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out",
                      focusedInput === "phone"
                        ? "w-full opacity-100"
                        : "w-0 opacity-0",
                      isRTL ? "right-0" : "left-0",
                    )}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="email"
                    dir="ltr"
                    className={cn(inputBase, isRTL ? "text-right" : "text-left")}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div
                    className={cn(
                      "absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out",
                      focusedInput === "email"
                        ? "w-full opacity-100"
                        : "w-0 opacity-0",
                      isRTL ? "right-0" : "left-0",
                    )}
                  />
                </div>

                <div className="relative group">
                  <select
                    value={formData.branch}
                    onChange={(e) => updateField("branch", e.target.value)}
                    onFocus={() => setFocusedInput("branch")}
                    onBlur={() => setFocusedInput(null)}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn(
                      "peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none appearance-none transition-colors duration-300 focus:border-amber-500",
                      isRTL ? "text-right" : "text-left",
                    )}
                  >
                    <option value="" disabled hidden></option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name[dir]}
                      </option>
                    ))}
                  </select>

                  <label
                    className={cn(
                      "absolute transition-all duration-300 pointer-events-none",
                      (focusedInput === "branch" || formData.branch)
                        ? "-top-4 text-xs font-bold " + (focusedInput === "branch" ? "text-amber-600" : "text-slate-400")
                        : "top-3 text-base text-slate-400",
                      isRTL ? "right-0" : "left-0"
                    )}
                  >
                    {isRTL ? "الفرع المفضل" : "Preferred Branch"}
                  </label>

                  <div
                    className={cn(
                      "absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out",
                      focusedInput === "branch"
                        ? "w-full opacity-100"
                        : "w-0 opacity-0",
                      isRTL ? "right-0" : "left-0",
                    )}
                  />
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder=" "
                  rows={5}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={cn(
                    "peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none placeholder-transparent resize-none transition-colors duration-300 focus:border-amber-500",
                    isRTL ? "text-right" : "text-left",
                  )}
                />
                <label
                  className={cn(
                    "absolute top-7 text-slate-400 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-bold peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 pointer-events-none",
                    isRTL ? "right-0" : "left-0",
                  )}
                >
                  {isRTL ? "اكتب استفسارك أو تفاصيل الحجز" : "Write your inquiry or booking details"}
                </label>
                <div
                  className={cn(
                    "absolute bottom-1 h-[2px] bg-amber-500 transition-all duration-500 ease-out",
                    focusedInput === "message"
                      ? "w-full opacity-100"
                      : "w-0 opacity-0",
                    isRTL ? "right-0" : "left-0",
                  )}
                />
              </div>

              <div className={cn("pt-4", isRTL ? "text-right" : "text-left")}>
                <button
                  type="submit"
                  className={cn(
                    "group/submit relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-10 py-4 font-bold text-white transition-all hover:bg-amber-500 hover:shadow-[0_10px_40px_rgba(245,158,11,0.3)] active:scale-95 w-full sm:w-auto",
                    isRTL ? "flex-row-reverse" : "",
                  )}
                >
                  <span className="relative z-10 tracking-wide">
                    {isRTL ? "إرسال للفريق" : "Send to Team"}
                  </span>
                  <SendHorizontal
                    className={cn(
                      "relative z-10 w-5 h-5 transition-transform duration-300 group-hover/submit:translate-x-1",
                      isRTL ? "rotate-180 group-hover/submit:-translate-x-1" : "",
                    )}
                  />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;