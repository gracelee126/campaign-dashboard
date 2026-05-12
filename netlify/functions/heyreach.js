import axios from 'axios';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const HEYREACH_API_KEY = process.env.HEYREACH_API_KEY;
  const HEYREACH_BASE_URL = 'https://api.heyreach.io/api/public';

  if (!HEYREACH_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'HEYREACH_API_KEY not configured in Netlify environment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();

    // Use fixed campaigns endpoint
    const response = await axios.post(
      `${HEYREACH_BASE_URL}/campaigns/list`,
      body,
      {
        headers: {
          'X-API-KEY': HEYREACH_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling HeyReach API:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch from HeyReach API',
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
