import type { NextApiRequest, NextApiResponse } from 'next';

export type QAArchive = {
  questioner: { value: string };
  respondent: { value: string };
  question: { value: string };
  answer: { value: string };
  comment: { value: string };
  evaluation: { value: number };
};

type Records = {
  records: Array<QAArchive>;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Records>) {
  res.status(200).json({
    records: [
      {
        questioner: { value: 'Alice' },
        respondent: { value: 'Alice' },
        question: { value: '質問1' },
        answer: { value: 'Bob' },
        comment: { value: 'how to build demo' },
        evaluation: { value: 4 },
      },
      {
        questioner: { value: 'Danny' },
        respondent: { value: 'Alice' },
        question: { value: '質問２' },
        answer: { value: 'Ema' },
        comment: { value: 'how to refactor' },
        evaluation: { value: 2 },
      },
    ],
  });
}
