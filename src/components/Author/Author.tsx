import { ReactNode } from 'react';
import { format } from 'date-fns';

import { AuthorType } from '../../store/fetchSlice';

import styles from './index.module.scss';

type AuthorProps = {
  author: AuthorType;
  date: string;
};

export const Author = ({ author, date }: AuthorProps): ReactNode => {
  //   console.log(date, new Date(date));
  const postDate = format(new Date(date), 'MMMM d, yyyy');

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h6 className={styles.title}>{author.username}</h6>
        <span className={styles.date}>{postDate}</span>
      </div>
      <div className={styles.avatar}>
        <img src={author.image} alt="avatar" width={46} />
      </div>
    </div>
  );
};
