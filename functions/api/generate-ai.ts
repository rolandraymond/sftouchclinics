export async function onRequest(context: {
  request: Request;
}) {
  return new Response(
    JSON.stringify({
      ok: true,
      method: context.request.method,
      message: "Cloudflare Function is working",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}