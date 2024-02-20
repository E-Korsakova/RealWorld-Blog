import { ReactElement, useEffect } from 'react';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles } from '../../store/fetchSlice';
import { AppHeader } from '../AppHeader';
import { AppFooter } from '../AppFooter';
import { ArticleList } from '../ArticleList';
// import { ArticlePage } from '../ArticlePage';

import styles from './index.module.scss';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage, articles, loading } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);

  console.log(articles);
  return (
    <div className={styles.app}>
      <AppHeader />
      {loading ? <Spin size="large" /> : <ArticleList />}
      {/* {loading ? <Spin size="large" /> : <ArticlePage {...articles[3]} />} */}
      <AppFooter />
    </div>
  );
}

export { App };
