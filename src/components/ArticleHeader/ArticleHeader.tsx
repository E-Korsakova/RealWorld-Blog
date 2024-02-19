import { ReactNode } from 'react';

import styles from './index.module.scss';

type ArticleHeaderProps = {
  title: string;
  authorName: string;
  avatar: string;
  date: string;
};

export const ArticleHeader = ({ title, authorName, avatar, date }: ArticleHeaderProps): ReactNode => {
  return (
    <div className={styles.articleHeader}>
      <h5>{title}</h5>
      <div>
        <div className={styles.info}>
          <h6>{authorName}</h6>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.avatarContainer}>
          <img src={avatar} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};
