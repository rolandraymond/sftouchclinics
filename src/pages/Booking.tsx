import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { CalendarDays, ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { branches, services, emptyBooking, cairoToday, validateBooking } from '../lib/booking';
import type { Booking as BookingData, Errors } from '../lib/booking';

// Set this public value in .env.local and your production build settings.
const whatsappNumber = String(import.meta.env.VITE_BOOKING_WHATSAPP_NUMBER || '').replace(/\D/g, '');
export default function Booking() {
  const { isRTL } = useLanguage();
  const ar = isRTL;
  const copy = (en: string, arabic: string) => ar ? arabic : en;
  const [form, setForm] = useState<BookingData>({ ...emptyBooking });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ saved: boolean; url: string } | null>(null);
  const lock = useRef(false);
  const submissionRef = useRef<{
  fingerprint: string;
  requestId: string;
} | null>(null);
  const inputClass = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/20 disabled:opacity-60';
  const update = (key: keyof BookingData, value: string) => {
    setForm(old => ({ ...old, [key]: value }));
    setErrors(old => ({ ...old, [key]: undefined }));
  };
  function field(key: keyof BookingData, label: string, children: ReactNode) {
    return <div><label htmlFor={key} className="mb-2 block text-sm font-semibold text-slate-700">{label}{key !== 'notes' && ' *'}</label>{children}{errors[key] && <p id={`${key}-error`} className="mt-2 text-sm text-red-700">{errors[key]}</p>}</div>;
  }
  const attrs = (key: keyof BookingData) => ({ id: key, name: key, className: inputClass, value: form[key], 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? `${key}-error` : undefined });
async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (lock.current || result) return;

  const checked = validateBooking(form, ar);
  setErrors(checked.errors);

  if (Object.keys(checked.errors).length > 0) {
    document
      .getElementById(Object.keys(checked.errors)[0])
      ?.focus();

    return;
  }

  if (!/^[1-9]\d{7,14}$/.test(whatsappNumber)) {
    return;
  }

  const d = checked.data;
  const fingerprint = JSON.stringify(d);

  if (
    !submissionRef.current ||
    submissionRef.current.fingerprint !== fingerprint
  ) {
    submissionRef.current = {
      fingerprint,
      requestId: crypto.randomUUID(),
    };
  }

  const requestId = submissionRef.current.requestId;
  const idx = ar ? 2 : 1;

  const serviceLabel =
    services.find(service => service[0] === d.service)?.[idx] ||
    d.service;

  const branchLabel =
    branches.find(branch => branch[0] === d.branch)?.[idx] ||
    d.branch;

  const text = [
    copy('SF — Appointment request', 'SF — طلب حجز'),
    `${copy('Request ID', 'رقم الطلب')}: ${requestId}`,
    `${copy('Name', 'الاسم')}: ${d.name}`,
    `${copy('Phone', 'الموبايل')}: ${d.phone}`,
    `${copy('Service', 'الخدمة')}: ${serviceLabel}`,
    `${copy('Branch', 'الفرع')}: ${branchLabel}`,
    `${copy('Preferred date', 'اليوم المفضل')}: ${d.date}`,
    `${copy('Preferred time (Cairo)', 'الوقت المفضل بتوقيت القاهرة')}: ${d.time}`,
    ...(d.notes
      ? [`${copy('Notes', 'ملاحظات')}: ${d.notes}`]
      : []),
  ].join('\n');

  const url =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(text)}`;

  lock.current = true;
  setBusy(true);

  let tab: Window | null = null;

  try {
    tab = window.open('about:blank', '_blank');

    if (tab) {
      tab.opener = null;
    }
  } catch {
    // The WhatsApp link remains available on the result screen.
  }

  let saved = false;

  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    35000
  );

  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...d,
        requestId,
      }),
      signal: controller.signal,
    });

    const body = await response.json();

    saved =
      response.ok &&
      body.ok === true &&
      body.requestId === requestId;

    if (!saved) {
      console.warn(
        'Booking save not confirmed:',
        response.status,
        body.code || 'UNKNOWN'
      );
    }
  } catch {
    console.warn('Booking save response unavailable');
  } finally {
    window.clearTimeout(timeout);

    setResult({ saved, url });
    setBusy(false);

    try {
      if (tab && !tab.closed) {
        tab.location.replace(url);
      }
    } catch {
      // The user can open WhatsApp from the result screen.
    }
  }
}

  return <main dir={ar ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f8f7f3] px-4 pb-20 pt-44 text-slate-900 sm:px-6">
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <aside className="lg:pt-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-600/25 bg-yellow-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-800"><CalendarDays size={15}/>{copy('Your next appointment', 'ميعادك الجاي')}</span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{copy('A little time.', 'وقت ليك.')}<br/><span className="text-yellow-700">{copy('Just for you.', 'وعناية تناسبك.')}</span></h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">{copy('Tell us what you need and when you would like to visit. Our team will confirm your appointment with you.', 'قولنا محتاج إيه وعايز تزورنا إمتى، وفريقنا هيتواصل معاك لتأكيد الميعاد.')}</p>
        <div className="mt-10 space-y-5 border-t border-slate-200 pt-7 text-sm text-slate-600">{[copy('Choose your service and branch', 'اختار الخدمة والفرع'), copy('Pick a preferred date and time', 'حدد اليوم والوقت المناسبين ليك'), copy('Continue to WhatsApp and tap Send', 'كمّل على واتساب واضغط إرسال')].map((line, i) => <p key={line} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-yellow-800">{i + 1}</span>{line}</p>)}</div>
      </aside>
      <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
        {result ? <div role="status" className="py-12 text-center"><CheckCircle2 className="mx-auto mb-6 text-yellow-700" size={44}/><h2 className="text-2xl font-semibold">{copy('Continue on WhatsApp', 'كمّل طلبك على واتساب')}</h2><p className="my-5 leading-7 text-slate-600">{result.saved ? copy('Your request has been recorded. Send the prepared WhatsApp message to coordinate with our team. Your appointment still needs confirmation.', 'طلبك اتسجل. ابعت الرسالة الجاهزة على واتساب للتنسيق مع فريقنا. الميعاد لسه محتاج تأكيد.') : copy('Send the prepared message on WhatsApp so our team can receive your request and confirm availability.', 'ابعت الرسالة الجاهزة على واتساب عشان فريقنا يستلم طلبك ويأكد الميعاد المتاح.')}</p><a href={result.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-4 font-semibold text-white"><MessageCircle size={18}/>{copy('Open WhatsApp', 'افتح واتساب')}</a></div> : <form onSubmit={submit} noValidate>
          <h2 className="text-2xl font-semibold">{copy('Request an appointment', 'اطلب حجز ميعاد')}</h2><p className="mb-8 mt-2 text-sm text-slate-500">{copy('Fields marked * are required.', 'الخانات اللي عليها * مطلوبة.')}</p>
          <fieldset disabled={busy} className="grid min-w-0 gap-5 sm:grid-cols-2">
            {field('name', copy('Full name', 'الاسم'), <input {...attrs('name')} autoComplete="name" maxLength={80} required onChange={e => update('name', e.target.value)}/>)}
            {field('phone', copy('Mobile number', 'رقم الموبايل'), <input {...attrs('phone')} type="tel" dir="ltr" autoComplete="tel" maxLength={24} placeholder="01xxxxxxxxx" required onChange={e => update('phone', e.target.value)}/>)}
            {field('service', copy('Service', 'الخدمة'), <select {...attrs('service')} required onChange={e => update('service', e.target.value)}><option value="">{copy('Choose a service', 'اختار الخدمة')}</option>{services.map(s => <option key={s[0]} value={s[0]}>{s[ar ? 2 : 1]}</option>)}</select>)}
            {field('branch', copy('Branch', 'الفرع'), <select {...attrs('branch')} required onChange={e => update('branch', e.target.value)}><option value="">{copy('Choose a branch', 'اختار الفرع')}</option>{branches.map(b => <option key={b[0]} value={b[0]}>{b[ar ? 2 : 1]}</option>)}</select>)}
            {field('date', copy('Preferred date', 'اليوم المفضل'), <input {...attrs('date')} type="date" min={cairoToday()} required onChange={e => update('date', e.target.value)}/>)}
            {field('time', copy('Preferred time · Cairo', 'الوقت المفضل · القاهرة'), <input {...attrs('time')} type="time" required onChange={e => update('time', e.target.value)}/>)}
            <div className="sm:col-span-2">{field('notes', copy('Notes (optional)', 'ملاحظات (اختياري)'), <textarea {...attrs('notes')} rows={3} maxLength={500} onChange={e => update('notes', e.target.value)}/>)}</div>
          </fieldset>
          <p className="my-5 text-xs leading-6 text-slate-500">{copy('By continuing, you agree to share these details with the clinic for booking follow-up through Google Sheets and WhatsApp. Please avoid sensitive medical details. This is a request, subject to availability.', 'بالمتابعة، إنت موافق تشارك البيانات دي مع العيادة لمتابعة الحجز باستخدام Google Sheets وواتساب. بلاش تفاصيل طبية حساسة. ده طلب حجز حسب المواعيد المتاحة.')}</p>
          {!/^[1-9]\d{7,14}$/.test(whatsappNumber) && <p role="alert" className="mb-4 text-sm text-red-700">{copy('Online booking is being configured. Please contact the clinic by phone.', 'الحجز أونلاين لسه بيتجهز. تواصل مع العيادة بالتليفون.')}</p>}
          <button disabled={busy || !/^[1-9]\d{7,14}$/.test(whatsappNumber)} className="flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50">{busy ? copy('Preparing your request…', 'بنجهز طلبك…') : copy('Continue to WhatsApp', 'كمّل على واتساب')}<ArrowUpRight size={18}/></button>
        </form>}
      </section>
    </div>
  </main>;
}