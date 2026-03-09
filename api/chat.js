export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { chatInput, sessionId } = req.body || {};

  if (!chatInput || !sessionId) {
    return res.status(400).json({ error: 'Missing chatInput or sessionId' });
  }

  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
  const N8N_API_TOKEN   = process.env.N8N_API_TOKEN;

  if (!N8N_WEBHOOK_URL || !N8N_API_TOKEN) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': N8N_API_TOKEN,
      },
      body: JSON.stringify({ chatInput, sessionId }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error('n8n error:', upstream.status, text);
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await upstream.json();
    return res.status(200).json({ reply: data.reply || data.output || '' });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
