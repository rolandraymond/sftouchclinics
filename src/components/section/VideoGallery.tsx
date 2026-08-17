import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Play, X, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  quoteEn: string;
  quoteAr: string;
  thumbnail: string;
  videoId: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    nameEn: "SF Touch Expert",
    nameAr: "خبير تجميل SF Touch",
    roleEn: "Dermatology & Aesthetics",
    roleAr: "طب وتجميل الجلد",
    quoteEn: "Beauty is a carefully studied decision, not just a procedure. Every face needs a unique, customized treatment plan.",
    quoteAr: "الجمال مش مجرد إجراء، الجمال قرار مدروس. كل وش بيحتاج خطة علاجية مخصصة ليه عشان النتيجة تكون متكاملة.",
    thumbnail: "images/OES02416.jpg",
    videoId: "iplg6K7V2Ys",
  },
  {
    id: "2",
    nameEn: "Dr. Mai",
    nameAr: "د. مي",
    roleEn: "Clinical Nutritionist",
    roleAr: "أخصائية التغذية العلاجية",
    quoteEn: "Weight stability isn't just about diet. Stress, lack of sleep, and random weight loss drugs can slow down your metabolism.",
    quoteAr: "ثبات الوزن مش بس دايت! الضغط النفسي، السهر، وأدوية التخسيس العشوائية بتقلل الحرق وتأثر على النتيجة.",
    thumbnail: "images/OES02404.jpg",
    videoId: "nFExdl3kxBk",
  },
  {
    id: "3",
    nameEn: "SF Touch Expert",
    nameAr: "خبير تجميل SF Touch",
    roleEn: "Aesthetic Medicine",
    roleAr: "الطب التجميلي",
    quoteEn: "Restoring volume to cheeks and lips isn't an exaggeration, it's returning to a more beautiful version of yourself with calculated angles.",
    quoteAr: "في فرق بين التكبير المبالغ فيه واستعادة الحجم. بنملى بزوايا ومقاسات دقيقة عشان ترجعي نسخة أحلى وأصغر من نفسك.",
    thumbnail: "images/OES02435.jpg",
    videoId: "125u0Rt-qos",
  },
  {
    id: "4",
    nameEn: "Dr. Sally",
    nameAr: "د. سالي",
    roleEn: "Body Contouring Specialist",
    roleAr: "أخصائية تنسيق القوام",
    quoteEn: "The Schwarzy device doesn't just break down fat; it builds and stimulates muscles as if you just finished a heavy gym workout.",
    quoteAr: "جهاز شوارزي مش بس بيكسر الدهون، ده بيبني العضلات وينشطها كأنك رحتي الجيم بالظبط وعملتي تمرين كامل!",
    thumbnail: "images/OES02416.jpg",
    videoId: "XbTzyDwSMKk",
  },
];

const VideoGallery = () => {
  const { language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {language === "en" ? "Success Stories" : "قصص نجاح"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 tracking-tight">
            {language === "en" ? "Real Results, Real Stories" : "تجارب حقيقية، نتائج مبهرة"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Listen to our experts and discover how we help you achieve the best version of yourself with the latest technologies."
              : "استمعي لنصائح خبرائنا واكتشفي إزاي بنساعدك توصلي لأفضل نسخة من نفسك بأحدث التقنيات."}
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group relative cursor-pointer h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => setSelectedVideo(testimonial)}
            >
              {/* Background Thumbnail */}
              <div className="absolute inset-0">
                <img
                  src={testimonial.thumbnail}
                  alt={language === "en" ? testimonial.nameEn : testimonial.nameAr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay for better readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-primary/90 group-hover:border-primary transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                  <Play className="w-6 h-6 text-white ml-1.5" fill="currentColor" />
                </div>
              </div>

              {/* Content Box (Glassmorphism that slides up) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-20">
                <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-white font-serif font-bold text-xl mb-1 drop-shadow-md">
                    {language === "en" ? testimonial.nameEn : testimonial.nameAr}
                  </h3>
                  <p className="text-primary-foreground/80 font-medium text-sm mb-4">
                    {language === "en" ? testimonial.roleEn : testimonial.roleAr}
                  </p>
                  
                  {/* Quote reveals on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto">
                    <p className="text-white/90 text-sm leading-relaxed border-t border-white/20 pt-3">
                      "{language === "en" ? testimonial.quoteEn : testimonial.quoteAr}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-md md:max-w-3xl p-0 bg-black/90 border-border overflow-hidden rounded-2xl shadow-2xl">
              <DialogTitle className="sr-only">
                {language === "en" ? selectedVideo.nameEn : selectedVideo.nameAr}
              </DialogTitle>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-colors z-50 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[9/16] md:aspect-video w-full flex items-center justify-center bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title="Video testimonial"
                  className="w-full h-full md:rounded-b-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;