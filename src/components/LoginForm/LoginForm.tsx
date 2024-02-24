import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logIn } from '../../store/fetchSlice';

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
  const { user } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: user ? user.email : '',
    },
  });
  const submit: SubmitHandler<LoginFormType> = (data) => {
    const login = {
      email: data.email,
      password: data.password,
    };
    window.localStorage.setItem('email', data.email);
    window.localStorage.setItem('password', data.password);
    dispatch(logIn(login));
    navigate('/');
  };

  const error: SubmitErrorHandler<LoginFormType> = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.loginForm}>
      <header className={styles.header}>Sign In</header>
      <form onSubmit={handleSubmit(submit, error)}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, message: 'Email adress is incorrect' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.email ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Email address"
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
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
