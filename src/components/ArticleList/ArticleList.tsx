import { ReactElement } from 'react';
import uniqid from 'uniqid';

import { Article } from '../Article';
import { useAppSelector } from '../../hooks';
import { AppFooter } from '../AppFooter';

import styles from './index.module.scss';

export const ArticleList = (): ReactElement => {
  const { articles } = useAppSelector((state) => state.fetch);
  return (
    <>
      <div className={styles.list}>
        {articles.map((article) => (
          <div key={uniqid.time('article-')} className={styles.wrapper}>
            <Article {...article} />
          </div>
        ))}
      </div>
      <AppFooter />
    </>
  );
};
