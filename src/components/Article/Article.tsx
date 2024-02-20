import { ReactElement } from 'react';

import { AuthorType } from '../../store/fetchSlice';
import { ArticleHeader } from '../ArticleHeader';
import { Author } from '../Author';

import styles from './index.module.scss';

type ArticleProps = {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorType;
};

export const Article = ({
  author,
  // body,
  createdAt,
  description,
  // favorited,
  favoritesCount,
  // slug,
  tagList,
  title,
  updatedAt,
}: ArticleProps): ReactElement => {
  //   console.log(createAt, updateAt, updateAt || createAt);
  return (
    <div className={styles.container}>
      <div className={styles.article}>
        <ArticleHeader title={title} likesCount={favoritesCount} tags={tagList} />
        <span className={styles.text}>{description}</span>
      </div>
      <Author author={author} date={updatedAt || createdAt} />
    </div>
  );
};
