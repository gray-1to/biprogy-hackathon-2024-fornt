import type { NextApiRequest, NextApiResponse } from 'next';

export type Task = {
  $id: {
    value: number;
  };
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
  // NOTE: trouble_level 0 は見開始
  res.status(200).json([
    {
      $id: {
        value: 1,
      },
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
      $id: {
        value: 2,
      },
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
