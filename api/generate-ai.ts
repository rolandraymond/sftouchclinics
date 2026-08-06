import type { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // التأكد من أن الطلب من نوع POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // تهيئة Replicate
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'الرجاء رفع صورة' });
    }

    // إرسال الصورة للذكاء الاصطناعي
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: image,
          prompt: "high quality portrait, glowing perfect smooth skin, aesthetic clinic result, slightly fuller lips, symmetrical face, highly detailed, photorealistic, 8k",
          negative_prompt: "ugly, blurry, malformed, cartoon, deformed eyes, extra limbs",
          prompt_strength: 0.35, 
          num_inference_steps: 30,
        }
      }
    );

    // Vercel Serverless Function Response
    return res.status(200).json({ result: (output as string[])[0] });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({ error: "حدث خطأ أثناء معالجة الصورة" });
  }
}