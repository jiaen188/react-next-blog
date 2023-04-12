import {prepareConnection} from 'db/index';
import {Articles} from 'db/entity';
import type {IArticle} from 'pages/api/index.d.ts';
import {Empty} from 'antd';
import ListItem from 'components/ListItem';

export async function getServerSideProps() {
  const db = await prepareConnection();
  const articles = await db.getRepository(Articles).find({
    relations: ['user'],
  });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) || [],
    },
  };
}

interface IProps {
  articles: IArticle[];
}

export default function Home(props: IProps) {
  const {articles} = props;
  console.log('article', articles);
  return (
    <div className="content-layout">
      {articles.length ? (
        articles?.map((article) => {
          return <ListItem article={article} key={article.id} />;
        })
      ) : (
        <Empty description={'文章列表为空'} />
      )}
    </div>
  );
}
