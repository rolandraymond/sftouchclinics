import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // التأكد من أن الطلب من نوع POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'الرجاء رفع صورة' });
    }

    // استخراج بيانات الـ Base64 للـ صورة
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // إرسال الصورة لنموذج تعديل الصور المجاني على Hugging Face
    const response = await fetch(
      "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: {
            image: base64Data,
            prompt: "make skin glowing, smooth, aesthetic clinic treatment, flawless complexion",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Hugging Face Error:", errText);
      return res.status(500).json({ error: "فشل معالجة الصورة بواسطة الذكاء الاصطناعي" });
    }

    // استقبال الصورة الناتجة وتحويلها إلى Base64 لإرسالها للفرونت إند
    const arrayBuffer = await response.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);
    const resultBase64 = `data:image/jpeg;base64,${resultBuffer.toString('base64')}`;

    return res.status(200).json({ result: resultBase64 });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: "حدث خطأ أثناء معالجة الصورة" });
  }
}