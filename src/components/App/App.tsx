import { ReactElement, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles } from '../../store/fetchSlice';
import { ArticleList } from '../ArticleList';
import { Layout } from '../Layout';
import { ArticlePage } from '../ArticlePage';
import { NewAccountForm } from '../NewAccountForm';
import { LoginForm } from '../LoginForm';
import { EditProfileForm } from '../EditProfileForm';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage, articles, loading } = useAppSelector((state) => state.fetch);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);

  console.log(articles);
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
        </Route>
      </Routes>
    </>
  );
}

export { App };
