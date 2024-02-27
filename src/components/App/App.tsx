import { ReactElement, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { ArticleForm } from '../ArticleForm';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage, loading, article, articles } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      const user = {
        email: window.localStorage.getItem('email') || '',
        password: window.localStorage.getItem('password') || '',
      };
      dispatch(logIn(user));
    }
  }, []);

  useEffect(() => {
    if (!article && articles.length === 0 && !loading) {
      dispatch(fetchArticles(currentPage));
    }
  }, [currentPage, article, loading]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={loading ? <Spin size="large" /> : <ArticleList />} />
          <Route path="articles" element={<Navigate to={'/'} replace />} />
          <Route path="articles/:id" element={loading ? <Spin size="large" /> : <ArticlePage />} />
          <Route path="articles/:id/edit" element={<ArticleForm isEdit={true} />} />
          <Route path="sign-up" element={<NewAccountForm />} />
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="profile" element={<EditProfileForm />} />
          <Route path="new-article" element={<ArticleForm isEdit={false} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export { App };
