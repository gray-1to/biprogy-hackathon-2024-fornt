import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  questionier: {value: string},
  answerer: {value: string},
  question: {value: string},
  evaluation: {value: number}
};

type Records = {
  records: Array<Data>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Records>,
) {
  res.status(200).json({
    "records":[{'questionier': {'value': 'Alice'},
                'answerer': {'value': 'Bob'},
                'question': {'value': 'how to build demo'},
                'evaluation': {'value': 4}},
                {'questionier': {'value': 'Danny'},
                'answerer': {'value': 'Ema'},
                'question': {'value': 'how to refactor'},
                'evaluation': {'value': 2}},]});
}