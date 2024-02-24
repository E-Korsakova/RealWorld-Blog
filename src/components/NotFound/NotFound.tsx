import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

export const NotFound = (): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <span className={styles.text}>
        Return to{' '}
        <Link to={'/'} className={styles.link}>
          Main Page
        </Link>
      </span>
    </div>
  );
};
