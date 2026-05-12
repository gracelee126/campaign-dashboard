const axios = require('axios');

const ASHBY_API_KEY = process.env.ASHBY_API_KEY;
const ASHBY_BASE_URL = 'https://api.ashbyhq.com/job.list';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }

    // Create Basic Auth header
    const credentials = Buffer.from(`${ASHBY_API_KEY}:`).toString('base64');

    const response = await axios.post(
      ASHBY_BASE_URL,
      body,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Ashby API error:', error.response?.data || error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: error.response?.data || error.message,
      }),
    };
  }
};
