import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../AppHeader';

import styles from './index.module.scss';

export const Layout = (): ReactElement => {
  return (
    <div className={styles.app}>
      <AppHeader />

      <Outlet />
    </div>
  );
};
