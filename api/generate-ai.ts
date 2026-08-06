import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InferenceClient } from '@huggingface/inference';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: 'مفتاح HUGGINGFACE_API_KEY غير مضاف في إعدادات البيئة (Environment Variables)' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'الرجاء رفع صورة' });
    }

    const base64Data = image.includes(',') ? image.split(',')[1] : image;
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imageBlob = new Blob([imageBuffer]);

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const result = await client.imageToImage({
      model: 'black-forest-labs/FLUX.1-Kontext-dev',
      //provider: 'fal-ai', // خلي الـ SDK يختار أول provider متاح للموديل ده
      inputs: imageBlob,
      parameters: {
        prompt: 'make skin glowing, smooth, aesthetic clinic treatment, flawless complexion',
      },
    });

    // result من الـ SDK بيرجع Blob
    const resultBuffer = Buffer.from(await result.arrayBuffer());
    const resultBase64 = `data:${result.type || 'image/jpeg'};base64,${resultBuffer.toString('base64')}`;

    return res.status(200).json({ result: resultBase64 });

  } catch (error: any) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: error.message || 'حدث خطأ غير متوقع أثناء معالجة الصورة' });
  }
}