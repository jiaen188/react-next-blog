import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOptions} from 'config';
import {NextApiRequest, NextApiResponse} from 'next';
import {prepareConnection} from 'db/index';
import {User, UserAuth} from 'db/entity/index';
import {ISession} from 'pages/api/index';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const {phone, verify, identity_type = 'phone'} = req.body;

  const db = await prepareConnection();

  const userRes = db.getRepository(User);
  const userAuthRes = db.getRepository(UserAuth);

  if (String(session.verifyCode) === verify) {
    // 验证码正确, 在user_auths查找 identity_type是否有记录
    const userAuth = await userAuthRes.findOne(
      {
        identity_type,
        identifier: phone,
      },
      {
        relations: ['user'],
      },
    );

    if (userAuth) {
      //已存在用户
      const user = userAuth.user;
      const {id, nickname, avatar} = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    } else {
      // 新用户
      const user = new User();
      user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
      user.avatar = '/images/avatar.jpg';
      user.job = '暂无';
      user.introduce = '暂无';

      const userAuth = new UserAuth();
      userAuth.identifier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session.verifyCode;
      userAuth.user = user;
      console.log('user', user);
      console.log('userAuth', userAuth);

      const resUserAuth = await userAuthRes.save(userAuth);

      console.log(1212, resUserAuth);

      const {
        user: {id, nickname, avatar},
      } = resUserAuth;

      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    }
  } else {
    res.status(200).json({
      code: -1,
      msg: '验证码错误',
    });
  }
}

export default withIronSessionApiRoute(login, ironOptions);
