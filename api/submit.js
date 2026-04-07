import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, answers } = req.body;
  if (!name || !answers) return res.status(400).json({ error: 'Missing fields' });

  const entry = { name, answers, ts: Date.now() };

  try {
    // Store by name so re-submissions overwrite
    await kv.hset('responses', { [name]: JSON.stringify(entry) });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('KV error:', err);
    res.status(500).json({ error: `KV error: ${err.message}` });
  }
}
