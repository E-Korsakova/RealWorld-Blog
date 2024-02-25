import { ReactNode } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { AuthorType } from '../../store/fetchSlice';
import { useAppSelector } from '../../hooks';

import styles from './index.module.scss';

type AuthorProps = {
  author: AuthorType;
  date: string;
};

export const Author = ({ author, date }: AuthorProps): ReactNode => {
  const { user, article } = useAppSelector((state) => state.fetch);
  const postDate = format(new Date(date), 'MMMM d, yyyy');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h6 className={styles.title}>{author.username}</h6>
          <span className={styles.date}>{postDate}</span>
        </div>
        <div className={styles.avatar}>
          <img src={author.image} alt="avatar" className={styles.image} />
        </div>
      </div>
      {user && user.username === author.username && (
        <div className={styles.buttonsContainer}>
          <button
            aria-label="delete article"
            className={styles.button}
            style={{ color: '#F5222D', borderColor: '#F5222D' }}
            onClick={() => {}}
          >
            Delete
          </button>
          <Link to={`articles/:${article!.slug}/edit`}>
            <button aria-label="edit article" className={styles.button}>
              Edit
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
