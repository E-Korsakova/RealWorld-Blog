import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ArticleType } from '../../store/fetchSlice';
import { ArticleHeader } from '../ArticleHeader';
import { Author } from '../Author';
import { useAppSelector } from '../../hooks';

import styles from './index.module.scss';

export const Article = ({
  slug,
  author,
  createdAt,
  description,
  favoritesCount,
  tagList,
  title,
  updatedAt,
}: ArticleType): ReactElement => {
  const { article } = useAppSelector((state) => state.fetch);
  return (
    <Link to={`/articles/${slug}`} className={styles.container}>
      <div className={styles.article}>
        <ArticleHeader title={title} likesCount={favoritesCount} tagList={tagList} />
        <div className={styles.wrap}>
          <span className={article ? styles.full : styles.text}>{description}</span>
        </div>
      </div>
      <Author author={author} date={updatedAt || createdAt} />
    </Link>
  );
};
