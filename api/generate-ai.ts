import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // التأكد من وجود مفتاح Hugging Face
  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: 'مفتاح HUGGINGFACE_API_KEY غير مضاف في إعدادات البيئة (Environment Variables)' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'الرجاء رفع صورة' });
    }

    // إرسال الطلب لـ Hugging Face
    const response = await fetch(
      "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: "make skin glowing, smooth, aesthetic clinic treatment, flawless complexion",
          image: image, // إرسال الصورة مباشرة بصيغة Base64
        }),
      }
    );

    // التحقق من استجابة Hugging Face
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API Error:", errorText);
      
      // إذا كان النموذج يحمل حالياً (Loading)
      if (errorText.includes("is currently loading")) {
        return res.status(503).json({ error: "الذكاء الاصطناعي يستيقظ الآن، يرجى المحاولة بعد ثوانٍ قليلة." });
      }

      return res.status(500).json({ error: `خطأ من الخادم الخارجي: ${errorText}` });
    }

    // إذا كانت الاستجابة صورة ناجحة
    const arrayBuffer = await response.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);
    const resultBase64 = `data:image/jpeg;base64,${resultBuffer.toString('base64')}`;

    return res.status(200).json({ result: resultBase64 });

  } catch (error: any) {
    console.error("Serverless Function Error:", error);
    return res.status(500).json({ error: error.message || "حدث خطأ غير متوقع أثناء معالجة الصورة" });
  }
}