import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearError, logIn } from '../../store/fetchSlice';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 10,
};

interface LoginFormType {
  email: string;
  password: string;
}

export const LoginForm = (): ReactElement => {
  const { isError, loading } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<LoginFormType>();
  const submit: SubmitHandler<LoginFormType> = (data) => {
    const login = {
      email: data.email,
      password: data.password,
    };
    window.localStorage.setItem('email', data.email);
    window.localStorage.setItem('password', data.password);
    dispatch(logIn(login));
  };

  useEffect(() => {
    if (isSubmitSuccessful && !isError && !loading) {
      navigate('/');
    }
  }, [isSubmitSuccessful, isError, loading]);

  useEffect(() => {
    if (isError && !isSubmitSuccessful) dispatch(clearError());
  });

  return (
    <div className={styles.loginForm}>
      <header className={styles.header}>Sign In</header>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            pattern: { value: /(\w\.?)+@[\w.-]+\.\w{2,}/, message: 'Email adress is incorrect' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={
                  errors.email || (isError && typeof isError === 'object' && 'email' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Email address"
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              {isError && typeof isError === 'object' && 'email' in isError && isSubmitted && (
                <span className={styles.error}>Email {isError.email}</span>
              )}
            </>
          )}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="password"
                style={
                  errors.password
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : { ...InputStyle, marginBottom: 20 }
                }
                placeholder="Password"
              />
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </>
          )}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        {typeof isError === 'string' && isSubmitted && (
          <span className={styles.error}>Username or email {isError}</span>
        )}
        <span className={styles.text}>
          Don't have an account?{' '}
          <Link to={'/sign-up'} style={{ color: '#1890FF', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};
