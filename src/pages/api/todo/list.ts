import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json(
    [{'worker': 'Bill',
    'task': 'create demo',
    'time': 40},
    {'worker': 'Bob',
    'task': 'make presentation',
    'time': 60},]);
// res.status(200).json(
//     {'worker': 'Bill',
//     'task': 'create demo',
//     'time': 40});
}