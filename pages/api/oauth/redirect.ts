import type {NextApiRequest, NextApiResponse} from 'next';
import {Cookie} from 'next-cookie';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOptions} from 'config/index';
import {ISession} from 'pages/api/index';
import {setCookie} from 'utils/cookie';
import request from 'service/fetch';
import {DefaultImage, getGithubAccessTokenUrl, GithubClientID, GithubUserPath} from 'utils/constant';
import {prepareConnection} from 'db';
import {User, UserAuth} from 'db/entity';

async function redirect(req: NextApiRequest, res: NextApiResponse) {
  const cookie = Cookie.fromApiRoute(req, res);
  const session: ISession = req.session;
  const {code: requestToken} = req!.query;

  const accessTokeRes = await request.post<
    null,
    {
      access_token: string;
    }
  >(
    getGithubAccessTokenUrl(requestToken as string),
    {},
    {
      headers: {
        accept: 'application/json',
      },
    },
  );
  // 返回值是：
  const accessToken = accessTokeRes.access_token;
  // 通过 access_token 拿到 git user 信息
  const gitUserInfo = await request.get<
    null,
    {
      name: string;
      avatar_url: string;
      login: string; // github 用户名
    }
  >(GithubUserPath, {
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  });

  const db = await prepareConnection();
  const userAuthRepo = db.getRepository(UserAuth);

  const userAuth = await userAuthRepo.findOne(
    {
      identity_type: 'github',
      identifier: GithubClientID,
    },
    {
      relations: ['user'],
    },
  );

  if (userAuth) {
    // 之前登陆过的用户，直接从 user 里面获取用户信息，并更新 credential
    userAuth.credential = accessToken;
    await userAuthRepo.save(userAuth);

    const user = userAuth.user;
    const {id, nickname, avatar} = user;
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();

    setCookie(cookie, {userId: id, nickname, avatar});

    res.redirect(302, '/');
  } else {
    // 创建一个新用户，包括 user 和user_auth
    const {login = '', avatar_url} = gitUserInfo;
    const user = new User();
    user.nickname = login || `用户_${Math.floor(Math.random() * 10000)}`;
    user.avatar = avatar_url || DefaultImage;

    const userAuth = new UserAuth();
    userAuth.identity_type = 'github';
    userAuth.identifier = GithubClientID;
    userAuth.credential = accessToken;
    userAuth.user = user;

    const resultAuth = await userAuthRepo.save(userAuth);

    // 保存登录态 将用户信息存在了后端的session
    const {id, nickname, avatar} = resultAuth.user as User;
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();

    setCookie(cookie, {userId: id, nickname, avatar});

    res.redirect(302, '/');
  }
}

export default withIronSessionApiRoute(redirect, ironOptions);
