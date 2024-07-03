import { call, put, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '@/redux-store/category.slice';

const token = '3EC79C17-63ED-4166-BD58-04397B94312C';
const headers = {
  Authorization: `${token}`,
};
interface Category {
  id: string;
  tenDanhMuc: string;
  thuTu: number;
  kichHoat: boolean;
  ngayTao: string;
}

interface FetchCategoriesResponse {
  status: number;
  message: string;
  total: number;
  data: Category[];
}

function* fetchCategories() {
  try {
    const response: AxiosResponse<FetchCategoriesResponse> = yield call(
      axios.get,
      'http://api-tintuc.enetviet.com/DanhMucTinTuc/GetDanhSachDanhMucTinTuc',
      {
        headers,
        params: {
          loai_nguoi_dung: 4,
          skip: 0,
          limit: 30,
          ten_danh_muc: '',
        },
      },
    );
    yield put(fetchCategoriesSuccess({ data: response.data.data, total: response.data.total }));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export default function* categoriesSaga() {
  yield takeEvery(fetchCategoriesRequest.type, fetchCategories);
}
