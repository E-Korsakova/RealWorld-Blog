import { ReactElement } from 'react';

import styles from './index.module.scss';

export const AppHeader = (): ReactElement => {
  return (
    <header className={styles.header}>
      <h6 className={styles.headerTitle}>Realworld Blog</h6>
      <div className={styles.headerButtons}>
        <button aria-label="Sign in" className={styles.button}>
          <h6 className={styles.buttonTitle}>Sign in</h6>
        </button>
        <button aria-label="Sign up" className={styles.button}>
          <h6 className={styles.buttonTitle}>Sign up</h6>
        </button>
      </div>
    </header>
  );
};
