// functions/api/generate-ai.ts
import { InferenceClient } from "@huggingface/inference";

interface Env {
  HUGGINGFACE_API_KEY: string;
}

// قائمة الـ Prompts المخصصة لكل إجراء تجميلي
const PROMPTS_MAP: Record<string, string> = {
  botox:
    "botox treatment effect, smooth forehead, softened crow feet wrinkles, naturally relaxed expression, smooth skin texture, photorealistic, aesthetic clinic result",
  fillers:
    "subtle dermal fillers, naturally plump lips, defined cheekbones, restored facial volume, youthful jawline contour, photorealistic 8k",
  skin_booster:
    "skin booster treatment, ultra-hydrated glowing skin, crystal clear complexion, refined pores, smooth dewy texture, natural aesthetic dermatology result",
  full_face:
    "full face beautification, harmonized facial proportions, flawless smooth glowing skin, subtle cheek lift, plump lips, symmetric aesthetic transformation, photorealistic 8k",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}

function parseDataUrl(input: string) {
  const match = input.match(/^data:(.+?);base64,(.+)$/);

  if (match) {
    return {
      mimeType: match[1],
      base64: match[2],
    };
  }

  return {
    mimeType: "image/png",
    base64: input,
  };
}

function base64ToUint8Array(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}) {
  const { request, env } = context;

  try {
    if (!env.HUGGINGFACE_API_KEY) {
      return json(
        {
          error:
            "مفتاح HUGGINGFACE_API_KEY غير مضاف في إعدادات البيئة (Environment Variables)",
        },
        500
      );
    }

    const { image, treatment } = (await request.json()) as {
      image?: string;
      treatment?: string;
    };

    if (!image) {
      return json({ error: "الرجاء رفع صورة" }, 400);
    }

    const selectedPrompt =
      PROMPTS_MAP[treatment || ""] || PROMPTS_MAP.full_face;

    const { mimeType, base64 } = parseDataUrl(image);
    const imageBytes = base64ToUint8Array(base64);
    const imageBlob = new Blob([imageBytes], { type: mimeType });

    const client = new InferenceClient(env.HUGGINGFACE_API_KEY);

    const result = await client.imageToImage({
      model: "black-forest-labs/FLUX.1-Kontext-dev",
      provider: "fal-ai",
      inputs: imageBlob,
      parameters: {
        prompt: selectedPrompt,
      },
    });

    const resultBuffer = await result.arrayBuffer();
    const resultMimeType = result.type || "image/png";
    const resultBase64 = `data:${resultMimeType};base64,${arrayBufferToBase64(
      resultBuffer
    )}`;

    return json({ result: resultBase64 }, 200);
  } catch (error: unknown) {
    console.error("Serverless Function Error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "حدث خطأ غير متوقع أثناء معالجة الصورة";

    return json({ error: errorMessage }, 500);
  }
}