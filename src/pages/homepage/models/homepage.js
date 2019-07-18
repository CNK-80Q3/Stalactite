import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as articlesService from '../../articles/services/articles';

export default {

  namespace: 'homepage',

  state: {
    list: [],
    total: null,
    page: null,
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/') {
  //         dispatch({ type: 'fetch', payload: query });
  //       }
  //     });
  //   },
  // },
  

  effects: {
    // 获取文章数据
    *fetch({ payload: { page = 1 } }, { call, put }) {
      console.log(1111111)
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
  },

  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
};