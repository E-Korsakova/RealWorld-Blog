import { ReactElement, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles, logIn } from '../../store/fetchSlice';
import { ArticleList } from '../ArticleList';
import { Layout } from '../Layout';
import { ArticlePage } from '../ArticlePage';
import { NewAccountForm } from '../NewAccountForm';
import { LoginForm } from '../LoginForm';
import { EditProfileForm } from '../EditProfileForm';
import { NotFound } from '../NotFound';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage, loading } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      const user = {
        email: window.localStorage.getItem('email') || '',
        password: window.localStorage.getItem('password') || '',
      };
      dispatch(logIn(user));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={loading ? <Spin size="large" /> : <ArticleList />} />
          <Route path="articles" element={loading ? <Spin size="large" /> : <ArticleList />} />
          <Route path="articles/:id" element={loading ? <Spin size="large" /> : <ArticlePage />} />
          <Route path="sign-up" element={<NewAccountForm />} />
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="profile" element={<EditProfileForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export { App };
