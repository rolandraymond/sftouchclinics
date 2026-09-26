import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  CalendarDays,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

type TextPair = {
  en: string;
  ar: string;
};

type Branch = {
  id: string;
  name: TextPair;
  address: TextPair;
  phones: string[];
  hours: TextPair;
};

const BRANCHES: Branch[] = [
  {
    id: '01',
    name: {
      en: 'Damietta Branch',
      ar: 'فرع دمياط',
    },
    address: {
      en: 'Safwa Mall, 2nd Floor',
      ar: 'مول صفوة، الدور الثاني',
    },
    phones: [
      '01551820062',
      '01558008278',
      '572260062',
      '01147113246',
    ],
    hours: {
      en: 'Daily 01:00 PM - 01:00 AM',
      ar: 'يوميًا من 1 ظهرًا إلى 1 صباحًا',
    },
  },
  {
    id: '02',
    name: {
      en: 'New Damietta',
      ar: 'فرع دمياط الجديدة',
    },
    address: {
      en: 'Central Zone',
      ar: 'المنطقة المركزية',
    },
    phones: [
      '572430009',
      '01503656589',
      '01503656598',
      '01558008978',
    ],
    hours: {
      en: 'Daily 01:00 PM - 01:00 AM',
      ar: 'يوميًا من 1 ظهرًا إلى 1 صباحًا',
    },
  },
];

const whatsappNumber = String(
  import.meta.env.VITE_BOOKING_WHATSAPP_NUMBER || ''
).replace(/\D/g, '');

export default function ContactUs() {
  const { isRTL } = useLanguage();
  const locale = isRTL ? 'ar' : 'en';

  const copy = (en: string, ar: string) => (isRTL ? ar : en);

  const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber);

  const whatsappMessage = copy(
    'Hello SF Touch, I would like to ask about your services.',
    'أهلًا SF Touch، كنت حابب أستفسر عن الخدمات عندكم.'
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen overflow-hidden bg-[#FCFBF7] pb-24 pt-40 font-cairo selection:bg-amber-100 selection:text-amber-900 sm:pt-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full bg-amber-100/40 blur-[100px]" />
        <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-slate-100 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />

            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              {copy('Contact Us', 'تواصل معانا')}
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
            {copy("Let's stay in touch", 'خلّينا على تواصل')}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {copy(
              'Find your nearest branch, call our team, or chat with us on WhatsApp. To request an appointment, visit our booking page.',
              'اعرف عنوان الفرع المناسب ليك، اتصل بفريقنا أو كلّمنا على واتساب. ولو حابب تحجز ميعاد، تقدر تقدم طلبك من صفحة الحجز.'
            )}
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <section
            aria-label={copy('Our branches', 'فروعنا')}
            className="space-y-6 lg:col-span-6"
          >
            {BRANCHES.map((branch, index) => (
              <motion.article
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400"
                />

                <div className="mb-7 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {branch.name[locale]}
                  </h2>

                  <span
                    aria-hidden="true"
                    className="text-4xl font-black text-amber-100"
                  >
                    {branch.id}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-semibold text-slate-400">
                        {copy('Address', 'العنوان')}
                      </p>

                      <p className="font-medium leading-7 text-slate-700">
                        {branch.address[locale]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-semibold text-slate-400">
                        {copy('Call the branch', 'اتصل بالفرع')}
                      </p>

                      <div className="flex flex-col items-start gap-2">
                        {branch.phones.map(phone => (
                          <a
                            key={phone}
                            href={`tel:${phone}`}
                            dir="ltr"
                            className="rounded text-lg font-medium text-slate-600 transition-colors hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500">
                      <Clock className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-semibold text-slate-400">
                        {copy('Opening hours', 'مواعيد العمل')}
                      </p>

                      <p className="font-medium leading-7 text-slate-700">
                        {branch.hours[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 lg:sticky lg:top-32 lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-7 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"
              />

              <div className="relative">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <CalendarDays className="h-7 w-7 text-amber-300" />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-300">
                  {copy('Appointments', 'الحجوزات')}
                </p>

                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  {copy('Make time for you.', 'خصص وقت ليك.')}
                </h2>

                <p className="mt-5 leading-8 text-slate-300">
                  {copy(
                    'Choose your service, branch, and preferred date and time. Our team will follow up to confirm availability.',
                    'اختار الخدمة والفرع واليوم والوقت المناسبين ليك، وفريقنا هيتواصل معاك لتأكيد الميعاد المتاح.'
                  )}
                </p>

                <Link
                  to="/booking"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-300 px-6 py-4 font-bold text-slate-900 transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  {copy('Book an appointment', 'احجز ميعاد')}

                  <ArrowRight
                    className={cn(
                      'h-5 w-5',
                      isRTL && 'rotate-180'
                    )}
                  />
                </Link>

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  {copy(
                    'Your requested appointment is subject to confirmation.',
                    'طلب الحجز محتاج تأكيد من فريقنا.'
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-7 sm:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <MessageCircle className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {copy('Have a question?', 'عندك استفسار؟')}
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                {copy(
                  'Ask about our services or get help choosing the right branch. Contact our team directly.',
                  'اسأل عن خدماتنا أو خلي فريقنا يساعدك تختار الفرع المناسب. تواصل معانا مباشرة.'
                )}
              </p>

              {hasWhatsApp ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3.5 font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />

                  {copy('Chat on WhatsApp', 'كلّمنا على واتساب')}
                </a>
              ) : (
                <p className="mt-5 text-sm text-slate-500">
                  {copy(
                    'Call us using one of the branch numbers.',
                    'اتصل بينا على رقم من أرقام الفروع.'
                  )}
                </p>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}