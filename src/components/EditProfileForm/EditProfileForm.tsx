import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearError, editProfile } from '../../store/fetchSlice';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 10,
};

interface EditProfileFormType {
  username: string;
  email: string;
  newPassword: string;
  avatar: string;
}

export const EditProfileForm = (): ReactElement => {
  const { loading, isError, user } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    handleSubmit,
  } = useForm<EditProfileFormType>({
    defaultValues: {
      username: (user && user.username) || '',
      email: (user && user.email) || '',
      avatar: (user && user.image) || '',
    },
  });

  const submit: SubmitHandler<EditProfileFormType> = (data) => {
    const updateUser = {
      username: data.username,
      email: data.email,
      password: data.newPassword,
      image: data.avatar,
    };
    dispatch(editProfile(updateUser));
  };

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    if (!loading && isSubmitSuccessful && !isError) navigate('/');
  }, [isSubmitSuccessful, isError, loading]);

  useEffect(() => {
    if (isError && !isSubmitSuccessful) dispatch(clearError());
  });
  return (
    <div className={styles.editForm}>
      <header className={styles.header}>Edit Profile</header>
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
          New password
        </label>
        <Controller
          name="newPassword"
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
                style={errors.newPassword ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Password"
              />
              {errors.newPassword && <span className={styles.error}>{errors.newPassword.message}</span>}
            </>
          )}
        />
        <label htmlFor="image" className={styles.label}>
          Avatar image (url)
        </label>
        <Controller
          name="avatar"
          control={control}
          rules={{
            pattern: {
              value: /[(http(s)?)://(www.)?\w-/=#%&.?]{2,}\.[a-z]{2,}([\w-/=#%&.?]*)/,
              message: 'URL is incorrect',
            },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={
                  errors.avatar
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0 }
                    : { ...InputStyle, marginBottom: 20 }
                }
                placeholder="Avatar image"
              />
              {errors.avatar && <span className={styles.error}>{errors.avatar.message}</span>}
            </>
          )}
        />

        <button type="submit" className={styles.button}>
          Save
        </button>
        {typeof isError === 'string' && isSubmitted && (
          <span className={styles.error}>Username or email {isError}</span>
        )}
      </form>
    </div>
  );
};
