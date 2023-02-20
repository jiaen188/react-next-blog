import {format} from 'date-fns';
import md5 from 'md5';
import {encode} from 'js-base64';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ISession} from 'pages/api/index';
import request from 'service/fetch';
import {ironOptions} from 'config';

import type {NextApiRequest, NextApiResponse} from 'next';

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;

  // 文档
  // http://doc.yuntongxun.com/space/5a5098313b8496dd00dcdd7f
  const {to, templateId = 1} = req.body;
  const AppId = '2c9488768610eb80018624ae88a703b1';
  const AccountId = '2c9488768610eb80018624ae87a503aa';
  const AuthToken = '77588f00e7cb4d90be2874643ebd8a03';

  const NowDate = format(new Date(), 'yyyyMMddHHmmss');

  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);

  const Authorization = encode(`${AccountId}:${NowDate}`);

  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;

  const expireMinute = 5;

  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    },
  );

  console.log(verifyCode);

  const {statusCode, statusMsg, templateSMS} = response as any;
  if (statusCode === '000000') {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: {
        ...templateSMS,
      },
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    });
  }
}

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);
