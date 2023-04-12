import type {NextApiRequest, NextApiResponse} from 'next';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironOptions} from 'config/index';
import {ISession} from 'pages/api/index';
import {prepareConnection} from 'db/index';
import {Articles, User} from 'db/entity';

async function publish(req: NextApiRequest, res: NextApiResponse<BaseDataResponse<any>>) {
  const session: ISession = req.session;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const articleRepo = db.getRepository(Articles);

  const user = await userRepo.findOne({
    id: session.userId,
  });

  const {title = '', content = ''} = req.body;
  const article = new Articles();
  article.title = title;
  article.content = content;
  article.is_delete = 0;
  article.create_time = new Date();
  article.update_time = new Date();
  article.views = 0;

  if (user) {
    article.user = user;

    console.log('article,', article);

    const resArticle = await articleRepo.save(article);
    console.log('resArticle', resArticle);

    if (resArticle) {
      res.status(200).json({
        code: 0,
        msg: '发布成功',
        data: resArticle,
      });
    } else {
      res.status(200).json({
        code: -1,
        msg: '文章发布失败',
        data: '',
      });
    }
  } else {
    res.status(200).json({
      code: -1,
      msg: '用户不存在',
      data: '',
    });
  }
}

export default withIronSessionApiRoute(publish, ironOptions);
