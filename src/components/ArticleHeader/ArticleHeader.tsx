import { ReactNode } from 'react';
import { Space, Tag } from 'antd';
import uniqid from 'uniqid';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { favoritedArticle } from '../../store/fetchSlice';

import styles from './index.module.scss';

type ArticleHeaderProps = {
  title: string;
  slug: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
};

const disabledTags: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#EBEEF3',
  borderColor: '#EBEEF3',
};

export const ArticleHeader = ({ title, favoritesCount, tagList, favorited, slug }: ArticleHeaderProps): ReactNode => {
  const dispatch = useAppDispatch();
  const { article, user } = useAppSelector((state) => state.fetch);
  let heart = <HeartOutlined />;

  if (user && favorited) heart = <HeartFilled style={{ color: 'red' }} />;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/articles/${slug}`} className={styles.title}>
          {title.length > 45 ? title.slice(0, 45) + '...' : title}
        </Link>
        <button
          aria-label="likes"
          className={user ? styles.likeButtonActive : styles.likeButton}
          onClick={() => {
            dispatch(favoritedArticle({ slug, favorited }));
          }}
        >
          {heart}
        </button>
        {favoritesCount}
      </div>
      <div className={article ? styles.full : styles.wrapper}>
        {tagList.map((tag) => {
          if (tag) tag = tag.trim();
          if (tag) {
            return (
              <Space key={uniqid.time('tag-')} size={[0, 8]} wrap>
                <Tag style={disabledTags}>{tag.length > 10 ? tag.slice(0, 10) + '...' : tag}</Tag>
              </Space>
            );
          }
        })}
      </div>
    </div>
  );
};
