export const setCookie = (cookie: any, values: any) => {
  // 登录失效 24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = '/';

  const {userId, nickname, avatar} = values;
  cookie.set('userId', userId || '', {
    path,
    expires,
  });
  cookie.set('nickname', nickname || '', {
    path,
    expires,
  });
  cookie.set('avatar', avatar || '', {
    path,
    expires,
  });
};
