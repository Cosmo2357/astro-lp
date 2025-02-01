import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const testData = {
    message: 'これはテストメッセージです。',
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(testData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
