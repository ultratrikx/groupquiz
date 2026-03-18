import { kv } from '@vercel/kv';

const QUESTIONS = [
  // PLACEHOLDER — must match index.html
  "Question 1 placeholder",
  "Question 2 placeholder",
  "Question 3 placeholder",
];

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const raw = await kv.hgetall('responses') || {};
  const responses = Object.values(raw).map(v => JSON.parse(v));

  res.status(200).json({ responses, questions: QUESTIONS });
}
