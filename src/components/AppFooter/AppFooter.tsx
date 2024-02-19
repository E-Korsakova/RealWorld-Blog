import { ConfigProvider, Pagination } from 'antd';
import { ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage } from '../../store/fetchSlice';

import styles from './index.module.scss';

export const AppFooter = (): ReactNode => {
  const dispatch = useAppDispatch();
  const { currentPage, articlesCount } = useAppSelector((state) => state.fetch);
  return (
    <footer className={styles.footer}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          defaultCurrent={currentPage}
          total={articlesCount}
          defaultPageSize={5}
          showSizeChanger={false}
          onChange={(newPage) => dispatch(setPage(newPage))}
          className={styles.pagination}
        />
      </ConfigProvider>
    </footer>
  );
};
