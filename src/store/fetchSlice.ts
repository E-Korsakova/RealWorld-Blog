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
  tags: string[];
  createAt: string;
  updateAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorType;
};

type FetchState = {
  articles: ArticleType[];
  articlesCount: number;
  currentPage: number;
  loading: boolean;
  error: null | string;
};

const initialState: FetchState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
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

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = [];
        state.articlesCount = action.payload.articlesCount;
        state.articles.push(...action.payload.articles);
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = fetchSlice.actions;

export default fetchSlice.reducer;