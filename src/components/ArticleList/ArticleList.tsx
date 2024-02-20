import { ReactElement } from 'react';
// import uniqid from 'uniqid';

// import { Article } from '../Article';
import { useAppSelector } from '../../hooks';
import { ArticlePage } from '../ArticlePage';

import styles from './index.module.scss';

export const ArticleList = (): ReactElement => {
  const { articles } = useAppSelector((state) => state.fetch);
  return (
    <div className={styles.list}>
      {/* {articles.map((article) => (
        <div className={styles.wrapper}>
          <Article key={uniqid.time('article-')} {...article} />
        </div>
      ))} */}
      <ArticlePage {...articles[4]} />
    </div>
  );
};
