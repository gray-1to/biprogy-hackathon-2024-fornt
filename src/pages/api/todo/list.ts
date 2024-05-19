import type { NextApiRequest, NextApiResponse } from 'next';

export type Task = {
  id: number;
  worker: string;
  task: string;
  time: number;
  trouble_level: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Task[]>) {
  const date = new Date();

  // NOTE: trouble_level 0 は見開始
  res.status(200).json([
    {
      id: 1,
      worker: 'Bill',
      task: 'create demo',
      time: 40,
      trouble_level: 3,
    },
    {
      id: 2,
      worker: 'Bob',
      task: 'make presentation',
      time: 60,
      trouble_level: 6,
    },
  ]);
}
