// API route to proxy summarize requests
export default async function handler(req, res) {
  const { method, query } = req;

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { urls } = query;

  if (!urls) {
    res.status(400).json({ error: 'URLs parameter is required' });
    return;
  }

  try {
    const response = await fetch(`http://34.68.130.177/summarize?urls=${urls}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error summarizing:', error);
    res.status(500).json({ 
      error: 'Failed to summarize articles',
      message: error.message 
    });
  }
}
