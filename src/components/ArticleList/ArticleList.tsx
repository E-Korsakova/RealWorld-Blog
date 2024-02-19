import { ReactElement } from 'react';

import { Article } from '../Article';
import { useAppSelector } from '../../hooks';

import styles from './index.module.scss';

export const ArticleList = (): ReactElement => {
  const { articles } = useAppSelector((state) => state.fetch);
  return (
    <div className={styles.list}>
      {articles.map((article) => (
        <Article {...article} />
      ))}
    </div>
  );
};
