import { kv } from '@vercel/kv';

const QUESTIONS = [
  "Worst taste in girls",
  "Funniest",
  "Biggest red flag",
  "Most likely to survive in a zombie apocalypse",
  "Gives the best advice",
  "Gives the worst advice",
  "Biggest yapper",
  "Most likely to go to jail",
  "Would trust to take care of your kids",
  "Would not trust to take care of your kids",
  "Most talented",
  "Baby of the group",
  "Dad of the group",
  "Has the longest screentime",
  "Most rizz",
  "Who's the most unemployed",
  "Who's the most employed",
  "Who's the strongest",
  "Best style",
  "Most intimidating",
  "Biggest green flag",
  "Most nonchalant",
  "Most aura",
  "Who's the meanest",
  "Who's the smartest",
  "Who's the nicest",
  "Who has the best memory",
  "Who has the worst memory",
  "Who is the most reliable",
  "Most likely to show up late",
  "Who would get emotional during a movie",
  "Who would die first in a horror movie",
  "Best music taste",
  "Most likely to be a billionaire",
  "Most likely to say 'huh'",
  "Most likely to get away with murder",
  "Most likely to become homeless",
  "Who's the most competitive",
  "Who's the quietest",
  "Who tells the best stories",
];

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const raw = await kv.hgetall('responses') || {};
  const responses = Object.values(raw).map(v => JSON.parse(v));

  res.status(200).json({ responses, questions: QUESTIONS });
}
