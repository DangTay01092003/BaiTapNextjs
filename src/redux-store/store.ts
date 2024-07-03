import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/redux-store/counter.slice';
import createSagaMiddleware from 'redux-saga';
import newsReducer from '@/redux-store/newsSlice.slice';
import categoriesReducer from '@/redux-store/category.slice';
import rootSaga from '@/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    news: newsReducer,
    categories: categoriesReducer,
  },
  //sài default middleware của ReduxTool và thêm 1 midllewear là saga middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
