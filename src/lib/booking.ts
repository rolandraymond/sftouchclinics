export const services = [
  ['dermatology', 'Dermatology & Laser', 'الجلدية والليزر'],
  ['hair', 'Hair Care', 'عناية الشعر'],
  ['nutrition', 'Nutrition & Body', 'التغذية ونحت القوام'],
  ['help', 'Help me choose', 'ساعدني أختار'],
] as const;
export const branches = [['damietta', 'Damietta', 'دمياط'], ['new-damietta', 'New Damietta', 'دمياط الجديدة']] as const;
export type Booking = { name: string; phone: string; service: string; branch: string; date: string; time: string; notes: string };
export type Errors = Partial<Record<keyof Booking, string>>;
export const emptyBooking: Booking = { name: '', phone: '', service: '', branch: '', date: '', time: '', notes: '' };
export function cairoToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function normalizePhone(value: string) {
  let phone = value.replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[\s()-]/g, '');
  if (phone.startsWith('0020')) phone = '0' + phone.slice(4);
  else if (phone.startsWith('+20')) phone = '0' + phone.slice(3);
  else if (phone.startsWith('20')) phone = '0' + phone.slice(2);
  return phone;
}
export function validateBooking(input: unknown, ar = false): { data: Booking; errors: Errors } {
  const obj = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  const data = Object.fromEntries(Object.keys(emptyBooking).map(key => [key, typeof obj[key] === 'string' ? (obj[key] as string).trim() : ''])) as Booking;
  data.name = data.name.replace(/\s+/g, ' ');
  data.phone = normalizePhone(data.phone);
  const errors: Errors = {};
  if (data.name.length < 3 || data.name.length > 80 || !/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(data.name)) errors.name = ar ? 'اكتب اسم صحيح من ٣ لـ٨٠ حرف، من غير أرقام.' : 'Enter a name of 3–80 letters, without numbers.';
  if (!/^01[0125]\d{8}$/.test(data.phone)) errors.phone = ar ? 'اكتب رقم موبايل مصري صحيح من ١١ رقم.' : 'Enter a valid 11-digit Egyptian mobile number.';
  if (!services.some(s => s[0] === data.service)) errors.service = ar ? 'اختار الخدمة.' : 'Choose a service.';
  if (!branches.some(b => b[0] === data.branch)) errors.branch = ar ? 'اختار الفرع.' : 'Choose a branch.';
  const parsed = new Date(data.date + 'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== data.date || data.date < cairoToday()) errors.date = ar ? 'اختار النهارده أو يوم بعده.' : 'Choose today or a future date.';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) errors.time = ar ? 'اختار الوقت المفضل.' : 'Choose your preferred time.';
  else if (data.date === cairoToday()) {
    const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
    if (data.time <= time) errors.time = ar ? 'اختار وقت لسه مجاش.' : 'Choose a time later than now.';
  }
  if (data.notes.length > 500) errors.notes = ar ? 'الملاحظات بحد أقصى ٥٠٠ حرف.' : 'Keep notes within 500 characters.';
  return { data, errors };
}