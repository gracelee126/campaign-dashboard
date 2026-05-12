import axios from 'axios';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const HEYREACH_API_KEY = process.env.HEYREACH_API_KEY;
  const HEYREACH_BASE_URL = 'https://api.heyreach.io';

  if (!HEYREACH_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'HEYREACH_API_KEY not configured in Netlify environment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const page = body.page || 1;
    const limit = body.limit || 100;

    // Try GET request with query parameters
    const response = await axios.get(
      `${HEYREACH_BASE_URL}/campaigns`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          'X-API-KEY': HEYREACH_API_KEY,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling HeyReach API:', error);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch from HeyReach API',
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
