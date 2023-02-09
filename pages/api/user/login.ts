import { withIronSessionApiRoute  } from 'iron-session/next';
import request from 'service/fetch';
import { ironOptions } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'db/index';
import { User } from 'db/entity/index';

async function login (req: NextApiRequest, res: NextApiResponse) {
  
  const { phone, verify } = req.body;

  const db = await prepareConnection();

  const userRes = db.getRepository(User);

  console.log(await userRes.find())
  
  res.status(200).json({
    code: 0,
    msg: '登录成功',
  })   
}

export default withIronSessionApiRoute(login, ironOptions)
