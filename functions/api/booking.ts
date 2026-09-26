import { validateBooking } from '../../src/lib/booking';

interface Env {
  BOOKING_SCRIPT_URL: string;
}

interface ScriptResult {
  ok?: boolean;
  code?: string;
  requestId?: string;
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function reply(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();

  if (!reader) {
    throw new Error('EMPTY_BODY');
  }

  const chunks: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    size += value.byteLength;

    if (size > 8192) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }

    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(bytes);
}

export async function onRequestPost({
request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }

  const origin = request.headers.get('origin');

  if (origin !== new URL(request.url).origin) {
    return reply({ ok: false, code: 'FORBIDDEN' }, 403);
  }

  const contentType = request.headers.get('content-type') || '';

  if (!contentType.toLowerCase().startsWith('application/json')) {
    return reply({ ok: false, code: 'INVALID_CONTENT_TYPE' }, 415);
  }

  let raw: Record<string, unknown>;

  try {
    const parsed: unknown = JSON.parse(await readBody(request));

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed)
    ) {
      return reply({ ok: false, code: 'INVALID' }, 400);
    }

    raw = parsed as Record<string, unknown>;
  } catch (error) {
    const tooLarge =
      error instanceof Error &&
      error.message === 'BODY_TOO_LARGE';

    return reply(
      {
        ok: false,
        code: tooLarge ? 'BODY_TOO_LARGE' : 'INVALID',
      },
      tooLarge ? 413 : 400
    );
  }

  const requestId = raw.requestId;

  if (
    typeof requestId !== 'string' ||
    !UUID_PATTERN.test(requestId)
  ) {
    return reply({ ok: false, code: 'INVALID_REQUEST_ID' }, 422);
  }

  const { data, errors } = validateBooking(raw);

  if (Object.keys(errors).length > 0) {
    return reply(
      {
        ok: false,
        code: 'INVALID',
        errors,
      },
      422
    );
  }

  let scriptUrl: URL;

  try {
    scriptUrl = new URL(env.BOOKING_SCRIPT_URL);

    if (
      scriptUrl.protocol !== 'https:' ||
      scriptUrl.hostname !== 'script.google.com' ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(scriptUrl.pathname)
    ) {
      throw new Error('INVALID_CONFIGURATION');
    }
  } catch {
    return reply(
      { ok: false, code: 'NOT_CONFIGURED' },
      503
    );
  }

  try {
    const upstream = await fetch(scriptUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        requestId,

        site: 'sf',

        website: '',
      }),
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
    });

    if (!upstream.ok) {
      return reply(
        { ok: false, code: 'UPSTREAM_ERROR' },
        502
      );
    }

    const result = (await upstream.json()) as ScriptResult;

    if (
      result?.ok === true &&
      result.requestId === requestId
    ) {
      return reply({
        ok: true,
        requestId,
      });
    }

    const code =
      typeof result?.code === 'string'
        ? result.code
        : 'UPSTREAM_ERROR';

    const status =
      code === 'INVALID'
        ? 422
        : code === 'RATE_LIMIT'
          ? 429
          : code === 'BUSY'
            ? 503
            : 502;

    return reply({ ok: false, code }, status);
  } catch {
    console.error('Booking save could not be confirmed');

    return reply(
      { ok: false, code: 'SAVE_UNCONFIRMED' },
      502
    );
  }
}