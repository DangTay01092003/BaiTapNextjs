import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import newsSaga from './newsSaga';
import categoriesSaga from './categoriesSaga';

export default function* rootSaga() {
  console.log(categoriesSaga());
  yield all([newsSaga(), categoriesSaga()]);
}
