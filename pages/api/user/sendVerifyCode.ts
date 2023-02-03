import type { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    code: 0,
    data: 123
  }) 
}