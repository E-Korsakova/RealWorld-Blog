import { ReactElement, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles } from '../../store/fetchSlice';
import { AppHeader } from '../AppHeader';
import { AppFooter } from '../AppFooter';
import { ArticleList } from '../ArticleList';

import styles from './index.module.scss';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <ArticleList />
      <AppFooter />
    </div>
  );
}

export { App };
