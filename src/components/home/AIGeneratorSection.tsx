"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  UploadCloud,
  Loader2,
  ChevronsLeftRight,
  AlertCircle,
  Syringe,
  Sparkle,
  Smile,
  UserCheck,
} from "lucide-react";

// خيارات الإجراءات التجميلية
const TREATMENTS = [
  {
    id: "full_face",
    titleAr: "تنسيق كامل للوجه",
    titleEn: "Full Face Beautification",
    icon: UserCheck,
    descAr: "نضارة شمولية وتحديد معالم الوجه بالكامل",
    descEn: "Overall radiance & facial harmony",
  },
  {
    id: "skin_booster",
    titleAr: "سكين بوستر / نضارة",
    titleEn: "Skin Booster & Glow",
    icon: Sparkle,
    descAr: "ترطيب عميق وإخفاء المسام وإعطاء نضارة زجاجية",
    descEn: "Deep hydration & glassy skin texture",
  },
  {
    id: "botox",
    titleAr: "بوتوكس (شد وتنعيم)",
    titleEn: "Botox Smoothing",
    icon: Smile,
    descAr: "التخلص من تجاعيد الجبهة وحول العينين",
    descEn: "Smooth forehead & eye wrinkles",
  },
  {
    id: "fillers",
    titleAr: "فيلر (شفايف وجنتين)",
    titleEn: "Lips & Cheeks Filler",
    icon: Syringe,
    descAr: "امتلاء طبيعي للشفايف وتحديد الخدود",
    descEn: "Natural lip plump & cheek volume",
  },
];

const AIGeneratorSection = () => {
  const { isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<string>("full_face");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError(
        isRTL
          ? "حجم الصورة كبير جداً. الحد الأقصى 4 ميجا"
          : "Image is too large. Max 4MB."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setAiImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const generateAIImage = async () => {
    if (!originalImage) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: originalImage,
          treatment: selectedTreatment,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error(
          `Server error (${response.status}): تأكد من تشغيل البيئة المحلية بـ 'vercel dev'`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ غير معروف");
      }

      setAiImage(data.result);
      setSliderPosition(50);
    } catch (err: unknown) {
      console.error("Detailed Error:", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : isRTL
          ? "عذراً، فشل توليد الصورة. حاول مرة أخرى."
          : "Failed to generate image.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            {isRTL ? "الذكاء الاصطناعي الطبي" : "AI Clinical Preview"}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight font-cairo mb-4">
            {isRTL ? "تخيلي نتيجتك " : "Visualize Your "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              {isRTL ? "قبل أن تبدأي" : "Result"}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {isRTL
              ? "ارفعي صورتك واختاري نوع الإجراء التجميلي لرؤية المحاكاة الدقيقة بالذكاء الاصطناعي."
              : "Upload your photo, select a procedure, and see your simulated clinical result."}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl">
          {/* 1. منطقة رفع الصورة */}
          {!originalImage && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/50 rounded-2xl p-12 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[350px]"
            >
              <UploadCloud className="w-16 h-16 text-slate-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-300 mb-2">
                {isRTL ? "اضغطي هنا لرفع صورتك" : "Click to upload your photo"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isRTL
                  ? "صورة واضحة للوجه بإضاءة جيدة (أقل من 4MB)"
                  : "Clear face photo with good lighting (Max 4MB)"}
              </p>
            </div>
          )}

          {/* 2. اختيار نوع الإجراء التجميلي (يظهر عند اختيار الصورة وقبل التوليد) */}
          {originalImage && !aiImage && !loading && (
            <div className="mb-8">
              <h4 className="text-white text-lg font-bold mb-4 text-center">
                {isRTL ? "حدد الإجراء المطلوب تجسيده:" : "Select Desired Procedure:"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TREATMENTS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedTreatment === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTreatment(item.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-lg ${
                          isSelected
                            ? "bg-amber-500 text-slate-950"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-white mb-0.5">
                          {isRTL ? item.titleAr : item.titleEn}
                        </h5>
                        <p className="text-xs text-slate-400">
                          {isRTL ? item.descAr : item.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. شاشة التحميل */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-amber-400 animate-pulse text-center">
                {isRTL
                  ? "جاري تطبيق الإجراء التجميلي بدقة وتوليد النتيجة..."
                  : "Applying clinical adjustments & generating results..."}
              </h3>
            </div>
          )}

          {/* 4. رسالة الأخطاء */}
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-400 bg-red-400/10 py-3 px-6 rounded-lg text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 5. عرض النتيجة بالتمرير (Slider) */}
          {!loading && originalImage && aiImage && (
            <div className="relative w-full max-w-2xl mx-auto h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl select-none">
              <img
                src={aiImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={originalImage}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-amber-500 text-amber-600">
                  <ChevronsLeftRight className="w-6 h-6" />
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>
          )}

          {/* 6. المعاينة المبدئية للصورة قبل التوليد */}
          {!loading && originalImage && !aiImage && (
            <div className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-700 mb-6">
              <img
                src={originalImage}
                alt="Uploaded"
                className="w-full h-auto object-cover max-h-[250px]"
              />
            </div>
          )}

          {/* 7. أزرار التحكم */}
          <div className="flex justify-center gap-4 mt-6">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {originalImage && !loading && (
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setAiImage(null);
                  setError(null);
                }}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-bold text-sm"
              >
                {isRTL ? "صورة أخرى" : "Upload Another"}
              </button>
            )}

            {originalImage && !aiImage && !loading && (
              <button
                onClick={generateAIImage}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all flex items-center gap-2 text-sm"
              >
                <Sparkles className="w-5 h-5" />
                {isRTL ? "توليد النتيجة المتوقعة" : "Generate Preview"}
              </button>
            )}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto">
            {isRTL
              ? "* إخلاء مسؤولية: هذه الصورة مولدة بالذكاء الاصطناعي لأغراض التوضيح فقط. النتيجة الطبية الفعلية يتم تحديدها بعد استشارة الطبيب."
              : "* Disclaimer: This AI-generated image is for illustrative purposes only. Actual medical results depend on professional consultation."}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGeneratorSection;