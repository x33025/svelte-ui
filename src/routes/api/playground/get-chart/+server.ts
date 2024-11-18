import type { RequestHandler } from '@sveltejs/kit';
import { restClient } from '@polygon.io/client-js';


const API_KEY = 'wHOM047TsRMpdb02HUxs2M9ZfWi6YLuy';
const rest = restClient(API_KEY);

export const GET: RequestHandler = async ({ url }) => {
  const ticker = url.searchParams.get('ticker') || 'AAPL';
  const start = url.searchParams.get('start') || '2024-11-03';
  const end = url.searchParams.get('end') || '2024-11-05';

  try {
    const data = await rest.stocks.aggregates(ticker, 1, "hour", start, end);
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
