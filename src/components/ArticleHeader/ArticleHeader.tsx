import { ReactNode } from 'react';
import { Space, Tag } from 'antd';
import uniqid from 'uniqid';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../hooks';

import styles from './index.module.scss';

type ArticleHeaderProps = {
  title: string;
  likesCount: number;
  tagList: string[];
};

const disabledTags: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#EBEEF3',
  borderColor: '#EBEEF3',
};

export const ArticleHeader = ({ title, likesCount, tagList }: ArticleHeaderProps): ReactNode => {
  const { article, user } = useAppSelector((state) => state.fetch);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5 className={styles.title}>{title.length > 45 ? title.slice(0, 45) + '...' : title}</h5>
        <button aria-label="likes" className={user ? styles.likeButtonActive : styles.likeButton}>
          {!user ? (
            <HeartOutlined />
          ) : article && !article.favorited ? (
            <HeartOutlined />
          ) : (
            <HeartFilled style={{ color: 'red' }} />
          )}
        </button>
        {likesCount}
      </div>
      <div className={article ? styles.full : styles.wrapper}>
        {tagList.map((tag) => {
          tag = tag.trim();
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
