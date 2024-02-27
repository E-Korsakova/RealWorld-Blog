import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Checkbox, Divider, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { clearError, registerNewUser } from '../../store/fetchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 10,
};

export interface NewAccountFormType {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  checkbox: boolean;
}

export const NewAccountForm = (): ReactElement => {
  const { isError, loading } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<NewAccountFormType>({});

  const submit: SubmitHandler<NewAccountFormType> = (data) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(registerNewUser(user));
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
    <div className={styles.newAccountForm}>
      <header className={styles.header}>Create new account</header>
      <form onSubmit={handleSubmit(submit)}>
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
                style={
                  errors.username || (isError && typeof isError === 'object' && 'username' in isError && isSubmitted)
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : InputStyle
                }
                placeholder="Username"
              />
              {errors.username && <span className={styles.error}>{errors.username.message}</span>}
              {isError && typeof isError === 'object' && 'username' in isError && isSubmitted && (
                <span className={styles.error}>Username {isError.username}</span>
              )}
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
            required: 'This field is required',
          }}
          render={({ field }) => (
            <>
              <Checkbox
                {...field}
                name={field.name}
                onChange={field.onChange}
                checked={field.value}
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
        {typeof isError === 'string' && isSubmitted && (
          <span className={styles.error}>Username or email {isError}</span>
        )}
        <span className={styles.text}>
          Already have an account?{' '}
          <Link to={'/sign-in'} style={{ color: '#1890FF', textDecoration: 'none' }}>
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};
