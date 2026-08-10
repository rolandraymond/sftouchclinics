import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InferenceClient } from '@huggingface/inference';

// قائمة الـ Prompts المخصصة لكل إجراء تجميلي
const PROMPTS_MAP: Record<string, string> = {
  botox:
    'botox treatment effect, smooth forehead, softened crow feet wrinkles, naturally relaxed expression, smooth skin texture, photorealistic, aesthetic clinic result',
  fillers:
    'subtle dermal fillers, naturally plump lips, defined cheekbones, restored facial volume, youthful jawline contour, photorealistic 8k',
  skin_booster:
    'skin booster treatment, ultra-hydrated glowing skin, crystal clear complexion, refined pores, smooth dewy texture, natural aesthetic dermatology result',
  full_face:
    'full face beautification, harmonized facial proportions, flawless smooth glowing skin, subtle cheek lift, plump lips, symmetric aesthetic transformation, photorealistic 8k',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(500).json({
      error: 'مفتاح HUGGINGFACE_API_KEY غير مضاف في إعدادات البيئة (Environment Variables)',
    });
  }

  try {
    const { image, treatment } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'الرجاء رفع صورة' });
    }

    // اختيار الـ Prompt المناسب للإجراء المحدد أو إرجاع الخيار الافتراضي
    const selectedPrompt =
      PROMPTS_MAP[treatment as string] || PROMPTS_MAP.full_face;

    const base64Data = image.includes(',') ? image.split(',')[1] : image;
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imageBlob = new Blob([imageBuffer]);

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const result = await client.imageToImage({
      model: 'black-forest-labs/FLUX.1-Kontext-dev',
      provider: 'fal-ai',
      inputs: imageBlob,
      parameters: {
        prompt: selectedPrompt,
      },
    });

    const resultBuffer = Buffer.from(await result.arrayBuffer());
    const resultBase64 = `data:${result.type || 'image/jpeg'};base64,${resultBuffer.toString('base64')}`;

    return res.status(200).json({ result: resultBase64 });
  } catch (error: unknown) {
    console.error('Serverless Function Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'حدث خطأ غير متوقع أثناء معالجة الصورة';
    return res.status(500).json({ error: errorMessage });
  }
}