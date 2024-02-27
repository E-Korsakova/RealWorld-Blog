import { ReactElement, useEffect } from 'react';
import uniqid from 'uniqid';

import { Article } from '../Article';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppFooter } from '../AppFooter';
import { clearArticle } from '../../store/fetchSlice';

import styles from './index.module.scss';

export const ArticleList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { articles, article, loading } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    if (article && !loading) dispatch(clearArticle());
  }, [article, loading]);
  return (
    <>
      <div className={styles.list}>
        {articles.map((a) => (
          <div key={uniqid.time('article-')} className={styles.wrapper}>
            <Article {...a} />
          </div>
        ))}
      </div>
      <AppFooter />
    </>
  );
};
