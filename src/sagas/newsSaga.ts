import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure } from '@/redux-store/newsSlice.slice';
import { PayloadAction } from '@reduxjs/toolkit';

const API_TOKEN = '3EC79C17-63ED-4166-BD58-04397B94312C';

const headers = {
  Authorization: `${API_TOKEN}`,
};

interface FetchNewsParams {
  skip: number;
  limit: number;
}

interface Article {
  id: string;
  tieuDe: string;
  tomTat: string;
  anhDaiDien: string;
  ngayTao: string;
  urlChiTiet: string;
}

interface FetchNewsResponse {
  status: number;
  message: string;
  total: number;
  data: Article[];
}

function* fetchNews(action: PayloadAction<FetchNewsParams>) {
  try {
    const response: AxiosResponse<FetchNewsResponse> = yield call(
      axios.get,
      'http://api-tintuc.enetviet.com/TinTucHeThong/GetDanhSachTinTuc',
      {
        headers,
        params: {
          cap_don_vi: 4,
          loai_nguoi_dung: 4,
          ma_so: 'shn',
          ma_phong: '',
          skip: action.payload.skip,
          limit: action.payload.limit,
          tieu_de: '',
          danh_muc_tin_tuc_id: '',
        },
      },
    );
    yield put(fetchNewsSuccess({ data: response.data.data, total: response.data.total }));
  } catch (error: any) {
    yield put(fetchNewsFailure(error.message));
  }
}

export default function* newsSaga() {
  yield takeLatest(fetchNewsRequest.toString(), fetchNews);
}
