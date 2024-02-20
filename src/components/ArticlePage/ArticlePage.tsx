import { ReactElement } from 'react';
import Markdown from 'marked-react';

import { Article } from '../Article';
import { ArticleType } from '../../store/fetchSlice';

import styles from './index.module.scss';

export const ArticlePage = ({ body, ...article }: ArticleType): ReactElement => {
  console.log(article);
  return (
    <div className={styles.pageContainer}>
      <Article {...article} />
      <Markdown>{body}</Markdown>
    </div>
  );
};
