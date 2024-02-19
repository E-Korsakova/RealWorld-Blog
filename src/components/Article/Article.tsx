import { ReactElement } from 'react';

import { ArticleType } from '../../store/fetchSlice';
import { ArticleHeader } from '../ArticleHeader';

import styles from './index.module.scss';

export const Article = ({
  author,
  //   body,
  createAt,
  //   description,
  //   favorited,
  //   favoritesCount,
  //   slug,
  //   tags,
  title,
  updateAt,
}: ArticleType): ReactElement => {
  return (
    <div className={styles.article}>
      <ArticleHeader title={title} date={updateAt || createAt} authorName={author.username} avatar={author.image} />
    </div>
  );
};
