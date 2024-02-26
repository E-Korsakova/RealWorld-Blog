import { ReactNode, useEffect } from 'react';
import Markdown from 'marked-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Article } from '../Article';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getArticle } from '../../store/fetchSlice';

import styles from './index.module.scss';

export const ArticlePage = (): ReactNode => {
  const dispatch = useAppDispatch();
  const { article, isError } = useAppSelector((state) => state.fetch);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) navigate('/');
    if (!article) dispatch(getArticle(id));
  }, []);

  return (
    article && (
      <div className={styles.pageContainer}>
        <Article {...article} />
        <Markdown>{article.body}</Markdown>
      </div>
    )
  );
};
