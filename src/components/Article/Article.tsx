import { ReactElement } from 'react';

import { ArticleType } from '../../store/fetchSlice';
import { ArticleHeader } from '../ArticleHeader';
import { Author } from '../Author';

import styles from './index.module.scss';

export const Article = ({
  author,
  createdAt,
  description,
  favoritesCount,
  tagList,
  title,
  updatedAt,
}: ArticleType): ReactElement => {
  console.log('Article', author);
  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <ArticleHeader title={title} likesCount={favoritesCount} tags={tagList} />
        <div className={styles.wrap}>
          <span className={styles.text}>{description}</span>
        </div>
      </div>
      <Author author={author} date={updatedAt || createdAt} />
    </div>
  );
};
