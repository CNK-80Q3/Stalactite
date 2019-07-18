import * as articlesService from '../services/articles';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'articles',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    // 获取文章数据
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(articlesService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.article,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(articlesService.remove, id);
      const page = yield select(state => state.articles.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { articleId, articleData } }, { call, put, select }) {
      yield call(articlesService.patch, articleData);
      yield put(routerRedux.push('/articles/page'));
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(articlesService.create, values);
      yield put(routerRedux.push('/articles/page'));
    },
    *search({ payload: {value, page=1} }, { call, put, select }) {
      console.log(value)
      const { data } = yield call(articlesService.search, {value, page} );
      // yield put(routerRedux.push('/articles/page'));
      yield put({
        type: 'save',
        payload: {
          data: data.article,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/articles/page') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
