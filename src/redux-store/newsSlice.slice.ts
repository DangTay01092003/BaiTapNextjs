import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Article {
  id: string;
  tieuDe: string;
  tomTat: string;
  anhDaiDien: string;
  ngayTao: string;
  urlChiTiet: string;
}
interface FetchNewsParams {
  skip: number;
  limit: number;
}
interface NewsState {
  allArticles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  skip: number;
  limit: number;
}

const initialState: NewsState = {
  allArticles: [],
  status: 'idle',
  error: null,
  total: 0,
  skip: 0,
  limit: 4,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsRequest: (state, action: PayloadAction<FetchNewsParams>) => {
      state.status = 'loading';
    },
    fetchNewsSuccess: (state, action: PayloadAction<{ data: Article[]; total: number }>) => {
      state.status = 'succeeded';
      state.allArticles = action.payload.data;
      state.total = action.payload.total;
      state.skip += action.payload.data.length;
    },
    fetchNewsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure } = newsSlice.actions;

export default newsSlice.reducer;
