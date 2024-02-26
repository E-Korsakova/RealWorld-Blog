import { ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Popconfirm, message } from 'antd';

import { AuthorType, deleteArticle } from '../../store/fetchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './index.module.scss';

type AuthorProps = {
  author: AuthorType;
  date: string;
};

export const Author = ({ author, date }: AuthorProps): ReactNode => {
  const [clicked, setClicked] = useState(false);
  const { user, article } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postDate = format(new Date(date), 'MMMM d, yyyy');

  useEffect(() => {
    if (clicked) navigate('edit');
  }, [clicked]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h6 className={styles.title}>{author.username}</h6>
          <span className={styles.date}>{postDate}</span>
        </div>
        <div className={styles.avatar}>
          <img src={author.image} alt="avatar" className={styles.image} />
        </div>
      </div>
      {user && user.username === author.username && article && (
        <div className={styles.buttonsContainer}>
          <Popconfirm
            title="Delete article"
            description="Are you sure to delete this article?"
            onConfirm={() => {
              dispatch(deleteArticle(article.slug));
              message.success('Article was deleted');
              navigate('/');
            }}
            okText="Yes"
            cancelText="No"
          >
            <button aria-label="delete article" className={styles.deleteButton}>
              Delete
            </button>
          </Popconfirm>
          <button aria-label="edit article" className={styles.editButton} onClick={() => setClicked(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
