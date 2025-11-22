
export default async function handler(req, res) {
  // 1. Handle CORS (Cross-Origin Resource Sharing)
  // This allows your frontend to talk to this backend function
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const API_KEY = process.env.BREVO_API_KEY;

  if (!API_KEY) {
    console.error("BREVO_API_KEY is missing in environment variables");
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const BREVO_ENDPOINT = 'https://api.brevo.com/v3/contacts';

  try {
    // 3. Call Brevo API from the server side
    const response = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true // Updates the user if they already exist
      }),
    });

    const data = await response.json();

    // 4. Handle Brevo specific responses
    if (!response.ok) {
        // If user already exists, Brevo returns an error, but we treat it as success for the frontend
        if (data.code === 'duplicate_parameter') {
            return res.status(200).json({ success: true, message: 'User already subscribed' });
        }
        throw new Error(data.message || 'Error submitting to Brevo');
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Brevo API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
