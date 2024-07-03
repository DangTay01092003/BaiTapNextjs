import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: string;
  tenDanhMuc: string;
  thuTu: number;
  kichHoat: boolean;
  ngayTao: string;
}

interface CategoriesState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
  total: 0,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.status = 'loading';
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<{ data: Category[]; total: number }>) => {
      state.status = 'succeeded';
      state.categories = action.payload.data;
      state.total = action.payload.total;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
