import axios from 'axios';

export default async (req, context) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const HEYREACH_API_KEY = process.env.HEYREACH_API_KEY;
  const HEYREACH_BASE_URL = 'https://api.heyreach.io/api';

  if (!HEYREACH_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'HEYREACH_API_KEY not configured in Netlify environment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Extract query parameters from request
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint') || 'campaigns';
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '100';

    const response = await axios.get(
      `${HEYREACH_BASE_URL}/${endpoint}`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          'Authorization': `Bearer ${HEYREACH_API_KEY}`,
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
