import { Action, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AuthorType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type ArticleType = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorType;
};

type UserType = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
};

// type UserErrorType = {

// }

type FetchState = {
  articles: ArticleType[];
  article: ArticleType | null;
  articlesCount: number;
  currentPage: number;
  loading: boolean;
  isError: null | string | { username?: string; email?: string };
  user: UserType | null;
  login: boolean;
};

const initialState: FetchState = {
  articles: [],
  article: null,
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  isError: null,
  user: null,
  login: false,
};

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

export const fetchArticles = createAsyncThunk<
  { articles: ArticleType[]; articlesCount: number },
  number,
  { rejectValue: string }
>('fetch/fetchArticles', async function (page, { rejectWithValue }) {
  let skipArticles: number;
  if (page === 1) skipArticles = 0;
  else skipArticles = (page - 1) * 5;
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${skipArticles}`);
  if (!response.ok) return rejectWithValue('Server Error!');
  const data = await response.json();
  return data;
});

export const getArticle = createAsyncThunk<ArticleType, string | undefined, { rejectValue: string }>(
  'fetch/getArticle',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!response.ok) return rejectWithValue('Server Error!');
    const data = await response.json();
    return data.article;
  }
);

export const registerNewUser = createAsyncThunk<
  { user: UserType },
  { username: string; email: string; password: string },
  { rejectValue: string }
>('fetch/registerNewUser', async function ({ username, email, password }, { rejectWithValue }) {
  const user = { username, email, password };
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
    else return rejectWithValue(data.message);
  }
  window.localStorage.setItem('token', data.user.token);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
  return data;
});

export const logIn = createAsyncThunk<{ user: UserType }, { email: string; password: string }, { rejectValue: string }>(
  'fetch/logIn',
  async function ({ email, password }, { rejectWithValue }) {
    const user = { email, password };
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.errors['email or password']);
    }
    return data;
  }
);

export const editProfile = createAsyncThunk<
  { user: UserType },
  { username: string; email: string; password: string; image: string | null },
  { rejectValue: string }
>('fetch/editProfile', async function ({ username, email, password, image = null }, { rejectWithValue }) {
  const user = { username, email, password, image };
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ user }),
  });
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    if ('username' in data.errors || 'email' in data.errors) return rejectWithValue(data.errors);
    else return rejectWithValue(data.message);
  }
  return data;
});

export const createNewArticle = createAsyncThunk<
  { article: ArticleType },
  { title: string; description: string; body: string; tagList?: string[] },
  { rejectValue: string }
>('fetch/createNewArticle', async function ({ title, description, body, tagList }, { rejectWithValue }) {
  const article = { title, description, body, tagList };
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ article }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('body' in data.errors) return rejectWithValue(data.errors.body);
    else return rejectWithValue(data.message);
  }
  return data;
});

export const editArticle = createAsyncThunk<
  { article: ArticleType },
  { editedArticle: { title: string; description: string; body: string }; slug: string },
  { rejectValue: string }
>('fetch/editArticle', async function ({ editedArticle, slug }, { rejectWithValue }) {
  const article = { title: editedArticle.title, description: editedArticle.description, body: editedArticle.body };
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ article }),
  });
  const data = await response.json();
  if (!response.ok) {
    if ('body' in data.errors) return rejectWithValue(data.errors.body);
    else return rejectWithValue(data.message);
  }
  return data;
});

export const deleteArticle = createAsyncThunk<undefined, string, { rejectValue: string }>(
  'fetch/deleteArticle',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.errors.message);
    }

    return undefined;
  }
);

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    logOut(state) {
      state.login = false;
      window.localStorage.clear();
      state.user = null;
    },
    clearError(state) {
      state.isError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.article = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = [];
        state.articlesCount = action.payload.articlesCount;
        state.articles.push(...action.payload.articles);
        state.loading = false;
      })
      .addCase(getArticle.pending, (state) => {
        state.article = null;
        state.loading = true;
        state.isError = null;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = { ...action.payload };
        state.loading = false;
      })
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        window.localStorage.setItem('token', action.payload.user.token);
        state.login = true;
        state.loading = false;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.user = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        window.localStorage.setItem('token', action.payload.user.token);
        state.login = true;
        state.loading = false;
      })
      .addCase(createNewArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.article = null;
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.loading = false;
      })
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
        state.article = null;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.loading = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.article = null;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isError = action.payload;
      });
  },
});

export const { setPage, logOut, clearError } = fetchSlice.actions;

export default fetchSlice.reducer;
