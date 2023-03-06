// github oauth 登录
export const GithubRedirectUrl = 'http://localhost:3000/api/oauth/redirect';
export const GithubClientID = 'b6b881241ab4abc21b8e';
export const GithubClientSecrets = '60d69177860e358dfc0dcf448e4c3c2c1a2c69b6';
export const GithubCallbackUrl = `https://github.com/login/oauth/authorize?client_id=${GithubClientID}&redirect_uri=${GithubRedirectUrl}`;
export const getGithubAccessTokenUrl = (requestToken: string) => {
  return `https://github.com/login/oauth/access_token?client_id=${GithubClientID}&client_secret=${GithubClientSecrets}&code=${requestToken}`;
};

export const GithubUserPath = 'https://api.github.com/user';

export const DefaultImage = '/images/avatar.jpg';
