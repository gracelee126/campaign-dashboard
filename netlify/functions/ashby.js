import axios from 'axios';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const ASHBY_API_KEY = process.env.ASHBY_API_KEY;
  const ASHBY_BASE_URL = 'https://api.ashbyhq.com/graphql';

  if (!ASHBY_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'ASHBY_API_KEY not configured in Netlify environment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();

    const response = await axios.post(
      ASHBY_BASE_URL,
      body,
      {
        headers: {
          'Authorization': `Bearer ${ASHBY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling Ashby API:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch from Ashby API',
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
