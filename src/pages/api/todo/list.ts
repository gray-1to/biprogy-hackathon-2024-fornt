import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  'worker': string,
  'task': string,
  'time': number
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>,
) {
  res.status(200).json(
    [{'worker': 'Bill',
    'task': 'create demo',
    'time': 40},
    {'worker': 'Bob',
    'task': 'make presentation',
    'time': 60},]);
}