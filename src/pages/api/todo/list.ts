import type { NextApiRequest, NextApiResponse } from 'next';

export type Task = {
  worker: {
    value: string;
  };
  task: {
    value: string;
  };
  time: {
    value: number;
  };
  trouble_level: {
    value: number;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Task[]>) {
  res.status(200).json([
    {
      worker: {
        value: 'Bill',
      },
      task: {
        value: 'create demo',
      },
      time: {
        value: 40,
      },
      trouble_level: {
        value: 3,
      }
    },
    {
      worker: {
        value: 'Bob',
      },
      task: {
        value: 'make presentation',
      },
      time: {
        value: 60,
      },
      trouble_level: {
        value: 6,
      }
    },
  ]);
}
