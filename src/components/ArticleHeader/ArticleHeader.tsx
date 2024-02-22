import { ReactNode } from 'react';
import { Space, Tag } from 'antd';
import uniqid from 'uniqid';

import styles from './index.module.scss';

type ArticleHeaderProps = {
  title: string;
  likesCount: number;
  tags: string[];
};

const disabledTags: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#EBEEF3',
  borderColor: '#EBEEF3',
};

export const ArticleHeader = ({ title, likesCount, tags }: ArticleHeaderProps): ReactNode => {
  console.log('title', title);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h5 className={styles.title}>{title.length > 45 ? title.slice(0, 45) + '...' : title}</h5>
        <button aria-label="likes" className={styles.likeButton} />
        {likesCount}
      </div>
      <div className={styles.wrapper}>
        {tags.map((tag) => {
          tag = tag.trim();
          return (
            <Space key={uniqid.time('tag-')} size={[0, 8]} wrap>
              <Tag style={disabledTags}>{tag.length > 10 ? tag.slice(0, 10) + '...' : tag}</Tag>
            </Space>
          );
        })}
      </div>
    </div>
  );
};
