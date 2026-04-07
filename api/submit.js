import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, answers } = req.body;
  if (!name || !answers) return res.status(400).json({ error: 'Missing fields' });

  const entry = { name, answers, ts: Date.now() };

  try {
    await put(`responses/${name}.json`, JSON.stringify(entry), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Blob error:', err);
    res.status(500).json({ error: `Blob error: ${err.message}` });
  }
}
