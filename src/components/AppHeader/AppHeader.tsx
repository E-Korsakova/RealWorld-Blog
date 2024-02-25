import { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/fetchSlice';

import styles from './index.module.scss';

export const AppHeader = (): ReactElement => {
  const { user } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <h6 className={styles.headerTitle}>Realworld Blog</h6>
      <div className={styles.headerButtons}>
        {user ? (
          <>
            <Link to={'/new-article'}>
              <button
                aria-label="create new article"
                className={styles.button}
                style={{ color: '#52c41a', borderColor: '#52c41a' }}
              >
                <h6 className={styles.buttonTitle}>Create article</h6>
              </button>
            </Link>
            <div className={styles.user}>
              {user.username}
              <div className={styles.avatar}>
                <img
                  src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                  alt="avatar"
                  className={styles.image}
                />
              </div>
            </div>
            <button
              aria-label="Log out"
              className={styles.button}
              onClick={() => {
                console.log('out');
                dispatch(logOut());
                navigate('/');
              }}
            >
              <h6 className={styles.buttonTitle}>Log out</h6>
            </button>
          </>
        ) : (
          <>
            <Link to={'/sign-in'}>
              <button aria-label="Sign in" className={styles.button}>
                <h6 className={styles.buttonTitle}>Sign in</h6>
              </button>
            </Link>
            <Link to={'/sign-up'}>
              <button aria-label="Sign up" className={styles.button}>
                <h6 className={styles.buttonTitle}>Sign up</h6>
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
