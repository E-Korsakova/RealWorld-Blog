import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 10,
};

interface LoginFormType {
  email: string;
  password: string;
}

const submit: SubmitHandler<LoginFormType> = (data) => {
  console.log(data);
};

const error: SubmitErrorHandler<LoginFormType> = (data) => {
  console.log(data);
};

export const LoginForm = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
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
                style={errors.password ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
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
          <Link to={''} style={{ color: '#1890FF', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};
