import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  SendHorizontal,
  MessageSquareText,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// ضع هنا الـ URL اللي خدته من Google Apps Script
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbycTUhZcZUx_D-zX2gKqNK-rbrL9hCodDu06fF14K5cS_oxNWYs_YUShEcC33PKZG-e/exec";
// ============================================

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
    hours: { en: "Daily 01:00 PM - 01:00 AM", ar: "يوميًا من 1 ظهرًا إلى 1 صباحًا" },
  },
  {
    id: "02",
    name: { en: "New Damietta", ar: "فرع دمياط الجديدة" },
    address: { en: "Central Zone", ar: "المنطقة المركزية" },
    phones: ["572430009", "01503656589", "01503656598", "01558008978"],
    hours: { en: "Daily 01:00 PM - 01:00 AM", ar: "يوميًا من 1 ظهرًا إلى 1 صباحًا" },
  },
];

// ============================================
// الحماية والفليديشن
// ============================================

// تحويل الأرقام العربية ٠١٢٣ لأرقام إنجليزية
const toEnglishDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

// إزالة أي تاجات HTML أو علامات < > (حماية من XSS)
const stripTags = (s: string) => s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");

// الاسم: حروف عربي أو إنجليزي ومسافات بس (ممنوع أرقام أو رموز أو تاجات)
const isValidName = (s: string) =>
  /^[\u0600-\u06FFa-zA-Z\s.'-]{2,60}$/.test(s.trim());

// موبايل مصري: 11 رقم يبدأ بـ 010 / 011 / 012 / 015
const isValidEgyptianPhone = (s: string) =>
  /^01[0125][0-9]{8}$/.test(toEnglishDigits(s).trim());

// الإيميل اختياري، لكن لو مكتوب لازم يكون صحيح
const isValidEmail = (s: string) =>
  s.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
// ============================================

const ContactUs = () => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const dir: LocaleKey = language === "ar" ? "ar" : "en";

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    phone: "",
    email: "",
    branch: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataState, string>>>({});

  const branches = useMemo(() => BRANCHES, []);

  const updateField = (field: keyof FormDataState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  // التليفون: أرقام بس، بحد أقصى 11 رقم — مستحيل يدخل حروف أو تاجات
  const handlePhoneChange = (value: string) => {
    const digits = toEnglishDigits(value).replace(/\D/g, "").slice(0, 11);
    updateField("phone", digits);
  };

  const getBranchName = (id: string) => {
    const b = branches.find((b) => b.id === id);
    return b ? b.name[dir] : id;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // تنظيف المدخلات من أي تاجات قبل أي حاجة
    const cleaned = {
      fullName: stripTags(formData.fullName).trim(),
      phone: toEnglishDigits(formData.phone).trim(),
      email: stripTags(formData.email).trim(),
      branch: formData.branch,
      message: stripTags(formData.message).trim(),
    };

    const newErrors: Partial<Record<keyof FormDataState, string>> = {};

    if (!cleaned.fullName) {
      newErrors.fullName = isRTL ? "الاسم مطلوب" : "Name is required";
    } else if (!isValidName(cleaned.fullName)) {
      newErrors.fullName = isRTL
        ? "الاسم لازم يكون حروف بس (عربي أو إنجليزي) من غير رموز أو أكواد"
        : "Name must contain letters only (no symbols or code)";
    }

    if (!cleaned.phone) {
      newErrors.phone = isRTL ? "رقم الهاتف مطلوب" : "Phone is required";
    } else if (!isValidEgyptianPhone(cleaned.phone)) {
      newErrors.phone = isRTL
        ? "لازم رقم موبايل مصري صحيح: 11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015"
        : "Enter a valid Egyptian mobile: 11 digits starting with 010, 011, 012 or 015";
    }

    if (!isValidEmail(cleaned.email)) {
      newErrors.email = isRTL ? "البريد الإلكتروني غير صحيح" : "Invalid email address";
    }

    if (!cleaned.branch) {
      newErrors.branch = isRTL ? "اختار الفرع" : "Please select a branch";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        fullName: cleaned.fullName,
        phone: cleaned.phone,
        email: cleaned.email,
        branch: getBranchName(cleaned.branch),
        message: cleaned.message,
      };

      // no-cors + text/plain عشان نتجنب CORS
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      setSubmitStatus("success");
      setFormData({ fullName: "", phone: "", email: "", branch: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none placeholder-transparent transition-colors duration-300 focus:border-amber-500 disabled:opacity-50";
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

      {/* زرار تغيير اللغة */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 z-50 rounded-full bg-white border border-slate-200 shadow-sm px-5 py-2 text-sm font-bold text-slate-700 hover:border-amber-300 hover:text-amber-600 transition-colors"
        style={{ insetInlineEnd: "1.5rem" }}
      >
        {isRTL ? "English" : "عربي"}
      </button>

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
            {heroTitlePrimary}
          </h1>

          <p className="mt-8 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {heroText}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Branches Column */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn("lg:col-span-5 flex flex-col gap-6", isRTL ? "lg:order-2" : "lg:order-1")}
          >
            {branches.map((branch) => (
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
                        <p className="text-slate-600 font-medium leading-relaxed">{branch.address[dir]}</p>
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
                            className="block text-slate-600 font-medium hover:text-slate-900 transition-colors text-lg"
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
                        <p className="text-slate-600 font-medium leading-relaxed">{branch.hours[dir]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-7 bg-white/60 backdrop-blur-3xl border border-white p-10 sm:p-14 lg:p-16 rounded-[2.5rem] shadow-[0_20px_80px_rgba(15,23,42,0.04)]",
              isRTL ? "lg:order-1 text-right" : "lg:order-2 text-left"
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
                  ? "املأ البيانات الأساسية، واختار الفرع المناسب، ثم أرسل التفاصيل مباشرة إلى الفريق."
                  : "Fill in the basic details, choose the right branch, then send your request directly to the team."}
              </p>
            </div>

            {/* Success Toast */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-800"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-bold text-sm">
                  {isRTL
                    ? "تم إرسال رسالتك بنجاح! هنتواصل معاك قريب."
                    : "Your message has been sent successfully! We'll contact you soon."}
                </p>
              </motion.div>
            )}

            {/* Error Toast */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex items-center gap-3 rounded-2xl bg-red-50 border border-red-100 p-4 text-red-800"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-bold text-sm">
                  {isRTL
                    ? "في بيانات غير صحيحة، راجع الخانات المعلَّمة بالأحمر تحت."
                    : "Some fields are invalid, please review the fields marked in red below."}
                </p>
              </motion.div>
            )}

            <form className="space-y-10" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* الاسم */}
                <div className="relative group">
                  <input
                    type="text"
                    maxLength={60}
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", stripTags(e.target.value))}
                    onFocus={() => setFocusedInput("fullName")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="name"
                    disabled={isSubmitting}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn(
                      inputBase,
                      isRTL ? "text-right" : "text-left",
                      errors.fullName && "border-red-400 focus:border-red-500"
                    )}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "الاسم بالكامل *" : "Full Name *"}
                  </label>
                  <div className={cn("absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out", focusedInput === "fullName" ? "w-full opacity-100" : "w-0 opacity-0", isRTL ? "right-0" : "left-0")} />
                  {errors.fullName && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* التليفون */}
                <div className="relative group">
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="tel"
                    disabled={isSubmitting}
                    dir="ltr"
                    className={cn(
                      inputBase,
                      isRTL ? "text-right" : "text-left",
                      errors.phone && "border-red-400 focus:border-red-500"
                    )}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "رقم الهاتف * (01xxxxxxxxx)" : "Phone Number * (01xxxxxxxxx)"}
                  </label>
                  <div className={cn("absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out", focusedInput === "phone" ? "w-full opacity-100" : "w-0 opacity-0", isRTL ? "right-0" : "left-0")} />
                  {errors.phone && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* الإيميل */}
                <div className="relative group">
                  <input
                    type="email"
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => updateField("email", stripTags(e.target.value))}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder=" "
                    autoComplete="email"
                    disabled={isSubmitting}
                    dir="ltr"
                    className={cn(
                      inputBase,
                      isRTL ? "text-right" : "text-left",
                      errors.email && "border-red-400 focus:border-red-500"
                    )}
                  />
                  <label className={cn(labelBase, isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div className={cn("absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out", focusedInput === "email" ? "w-full opacity-100" : "w-0 opacity-0", isRTL ? "right-0" : "left-0")} />
                  {errors.email && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* الفرع */}
                <div className="relative group">
                  <select
                    value={formData.branch}
                    onChange={(e) => updateField("branch", e.target.value)}
                    onFocus={() => setFocusedInput("branch")}
                    onBlur={() => setFocusedInput(null)}
                    disabled={isSubmitting}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={cn(
                      "peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none appearance-none transition-colors duration-300 focus:border-amber-500 disabled:opacity-50",
                      isRTL ? "text-right" : "text-left",
                      errors.branch && "border-red-400 focus:border-red-500"
                    )}
                  >
                    <option value="" disabled hidden></option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name[dir]}
                      </option>
                    ))}
                  </select>
                  <label className={cn("absolute transition-all duration-300 pointer-events-none", (focusedInput === "branch" || formData.branch) ? "-top-4 text-xs font-bold " + (focusedInput === "branch" ? "text-amber-600" : "text-slate-400") : "top-3 text-base text-slate-400", isRTL ? "right-0" : "left-0")}>
                    {isRTL ? "الفرع المفضل *" : "Preferred Branch *"}
                  </label>
                  <div className={cn("absolute bottom-0 h-[2px] bg-amber-500 transition-all duration-500 ease-out", focusedInput === "branch" ? "w-full opacity-100" : "w-0 opacity-0", isRTL ? "right-0" : "left-0")} />
                  {errors.branch && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.branch}
                    </p>
                  )}
                </div>
              </div>

              {/* الرسالة */}
              <div className="relative group pt-4">
                <textarea
                  value={formData.message}
                  maxLength={500}
                  onChange={(e) => updateField("message", stripTags(e.target.value))}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder=" "
                  rows={5}
                  disabled={isSubmitting}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={cn("peer w-full bg-transparent border-b border-slate-200 py-3 text-lg text-slate-900 focus:outline-none placeholder-transparent resize-none transition-colors duration-300 focus:border-amber-500 disabled:opacity-50", isRTL ? "text-right" : "text-left")}
                />
                <label className={cn("absolute top-7 text-slate-400 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-bold peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 pointer-events-none", isRTL ? "right-0" : "left-0")}>
                  {isRTL ? "اكتب استفسارك أو تفاصيل الحجز" : "Write your inquiry or booking details"}
                </label>
                <div className={cn("absolute bottom-1 h-[2px] bg-amber-500 transition-all duration-500 ease-out", focusedInput === "message" ? "w-full opacity-100" : "w-0 opacity-0", isRTL ? "right-0" : "left-0")} />
              </div>

              <div className={cn("pt-4 space-y-4", isRTL ? "text-right" : "text-left")}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "group/submit relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-10 py-4 font-bold text-white transition-all hover:bg-amber-500 hover:shadow-[0_10px_40px_rgba(245,158,11,0.3)] active:scale-95 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed",
                    isRTL ? "flex-row-reverse" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="relative z-10 w-5 h-5 animate-spin" />
                      <span className="relative z-10 tracking-wide">
                        {isRTL ? "جاري الإرسال..." : "Sending..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 tracking-wide">
                        {isRTL ? "إرسال للفريق" : "Send to Team"}
                      </span>
                      <SendHorizontal className={cn("relative z-10 w-5 h-5 transition-transform duration-300 group-hover/submit:translate-x-1", isRTL ? "rotate-180 group-hover/submit:-translate-x-1" : "")} />
                    </>
                  )}
                </button>

                <p className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {isRTL
                    ? "بياناتك محمية: يتم فحص جميع المدخلات وتنظيفها قبل الإرسال."
                    : "Your data is protected: all inputs are validated and sanitized before sending."}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;