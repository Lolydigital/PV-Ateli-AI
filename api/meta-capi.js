export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event_name, event_id, event_url, user_data } = req.body;

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Configurações do Meta (Pixel ID ou Access Token) ausentes nas variáveis de ambiente da Vercel.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const payload = {
    data: [
      {
        event_name: event_name || 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: event_url,
        event_id: event_id,
        user_data: {
          client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          client_user_agent: req.headers['user-agent'],
          ...user_data
        }
      }
    ]
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao enviar evento para Meta CAPI:', error);
    return res.status(500).json({ error: 'Failed to send event' });
  }
}
