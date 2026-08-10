import { InferenceClient } from "@huggingface/inference";

interface Env {
  HUGGINGFACE_API_KEY: string;
}

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

function jsonResponse(data: unknown, status = 200): Response {
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

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, Math.min(i + chunkSize, bytes.length))
    );
  }

  return btoa(binary);
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    const url = new URL(request.url);

    /*
     * API
     * POST /api/generate-ai
     */
    if (url.pathname === "/api/generate-ai") {
      if (request.method !== "POST") {
        return jsonResponse(
          {
            error: "Method Not Allowed",
          },
          405
        );
      }

      try {
        // التأكد من وجود Hugging Face API Key
        if (!env.HUGGINGFACE_API_KEY) {
          return jsonResponse(
            {
              error:
                "مفتاح HUGGINGFACE_API_KEY غير مضاف في Cloudflare Variables and Secrets",
            },
            500
          );
        }

        // قراءة بيانات الطلب
        const body = (await request.json()) as {
          image?: string;
          treatment?: string;
        };

        const { image, treatment } = body;

        if (!image) {
          return jsonResponse(
            {
              error: "الرجاء رفع صورة",
            },
            400
          );
        }

        // اختيار الـ prompt
        const selectedPrompt =
          PROMPTS_MAP[treatment || ""] || PROMPTS_MAP.full_face;

        // تحويل الصورة
        const { mimeType, base64 } = parseDataUrl(image);

        const imageBytes = base64ToUint8Array(base64);

        const imageBlob = new Blob([imageBytes], {
          type: mimeType,
        });

        console.log("Starting Hugging Face image generation...");
        console.log("Treatment:", treatment);
        console.log("Prompt:", selectedPrompt);

        // Hugging Face client
        const client = new InferenceClient(
          env.HUGGINGFACE_API_KEY
        );

        // Image to Image
        const result = await client.imageToImage({
          model: "black-forest-labs/FLUX.1-Kontext-dev",
          provider: "fal-ai",
          inputs: imageBlob,
          parameters: {
            prompt: selectedPrompt,
          },
        });

        // تحويل النتيجة إلى Base64
        const resultBuffer = await result.arrayBuffer();

        const resultMimeType =
          result.type || "image/png";

        const resultBase64 =
          `data:${resultMimeType};base64,` +
          arrayBufferToBase64(resultBuffer);

        console.log("Hugging Face image generation completed.");

        return jsonResponse({
          result: resultBase64,
        });
      } catch (error: unknown) {
        console.error(
          "Cloudflare Worker Error:",
          error
        );

        const errorMessage =
          error instanceof Error
            ? error.message
            : "حدث خطأ غير متوقع أثناء معالجة الصورة";

        return jsonResponse(
          {
            error: errorMessage,
          },
          500
        );
      }
    }

    /*
     * أي request غير الـ API
     * Cloudflare Static Assets هيتعامل معاه تلقائيًا.
     */
    return env.ASSETS.fetch(request);
  },
};