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
  isError: null | string;
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
  if (!response.ok) return rejectWithValue(response.statusText);
  const data = await response.json();
  window.localStorage.setItem('token', data.user.token);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
  console.log('local');
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
    console.log(response);
    if (!response.ok) return rejectWithValue(response.statusText);
    const data = await response.json();
    console.log(data);
    return data;
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
        state.articles = [];
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isError = action.payload;
      });
  },
});

export const { setPage, logOut } = fetchSlice.actions;

export default fetchSlice.reducer;
