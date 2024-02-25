import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { editProfile } from '../../store/fetchSlice';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileFormType>();

  const submit: SubmitHandler<EditProfileFormType> = (data) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.newPassword,
      image: data.avatar,
    };
    dispatch(editProfile(user));
    navigate('/');
  };

  const error: SubmitErrorHandler<EditProfileFormType> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.editForm}>
      <header className={styles.header}>Edit Profile</header>
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
            pattern: { value: /(\w\.?)+@[\w.-]+\.\w{2,}/, message: 'Email adress is incorrect' },
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
      </form>
    </div>
  );
};
