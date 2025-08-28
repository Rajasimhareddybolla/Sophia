// API route to proxy get_audio requests
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
    const response = await fetch(`http://34.68.130.177/get_audio?urls=${urls}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Forward the audio blob response
    const contentType = response.headers.get('content-type') || 'audio/mpeg';
    res.setHeader('Content-Type', contentType);
    
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error getting audio:', error);
    res.status(500).json({ 
      error: 'Failed to get audio',
      message: error.message 
    });
  }
}
