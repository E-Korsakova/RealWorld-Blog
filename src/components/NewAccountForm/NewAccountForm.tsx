import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { Checkbox, Divider, Input } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 10,
};

interface NewAccountFormType {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  checkbox: boolean;
}

const submit: SubmitHandler<NewAccountFormType> = (data) => {
  console.log(data);
};

const error: SubmitErrorHandler<NewAccountFormType> = (data) => {
  console.log(data);
};

export const NewAccountForm = (): ReactElement => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAccountFormType>({});
  return (
    <div className={styles.newAccountForm}>
      <header className={styles.header}>Create new account</header>
      <form onSubmit={handleSubmit(submit, error)}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            minLength: { value: 3, message: 'Username needs to be at least 3 characters' },
            maxLength: { value: 20, message: 'Username needs to be no more than 20 characters' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.username ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Username"
              />
              {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </>
          )}
        />

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
            minLength: { value: 6, message: 'Password needs to be at least 6 characters' },
            maxLength: { value: 40, message: 'Password needs to be no more than 40 characters' },
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
        <label htmlFor="repeatPassword" className={styles.label}>
          Repeat Password
        </label>
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            validate: (value) => value === watch('password') || 'Passwords needs must match',
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="password"
                style={errors.repeatPassword ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Repeat Password"
              />
              {errors.repeatPassword && <span className={styles.error}>{errors.repeatPassword.message}</span>}
            </>
          )}
        />
        <Divider style={{ margin: '10px 0' }} />
        <Controller
          name="checkbox"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <Checkbox
                {...field}
                style={{ verticalAlign: 'top', marginBottom: errors.checkbox ? 0 : 20, color: '#595959' }}
              >
                I agree to the processing of my personal information
              </Checkbox>
              {errors.checkbox && <span className={styles.error}>{errors.checkbox.message}</span>}
            </>
          )}
        />
        <button type="submit" className={styles.button}>
          Create
        </button>
        <span className={styles.text}>
          Already have an account?{' '}
          <Link to={''} style={{ color: '#1890FF', textDecoration: 'none' }}>
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};