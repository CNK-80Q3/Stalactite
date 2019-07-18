import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as articlesService from '../pages/articles/services/articles';

export default {

  namespace: 'home',

  state: {
    list: [],
    total: null,
    page: null,
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/articles/page') {
  //         dispatch({ type: 'fetch', payload: query });
  //       }
  //     });
  //   },
  // },
  subscriptions: {
    setup({ dispatch, history, query }) {
      history.listen(location => {
        // if (location.pathname !== '/login') {
        //   //权限验证通过
        //   if (sessionStorage.getItem('userInfo')) {
        //     dispatch({
        //       type: 'loginSuccess',
        //       payload: JSON.parse(sessionStorage.getItem('userInfo')) || {}
        //     });
        //   } else {
        //     message.error('请登录后访问本系统！');
        //     dispatch({
        //       type: 'redirectLogin',
        //     });
        //   }
        // }
        switch (location.pathname) {
          case '/login':
            document.title = "登录";
            break;
          case '/':
            document.title = "首页";
            dispatch({ type: 'fetch', payload: query });
            break;
          case '/microblog':
            document.title = "心情";
            break;
          case '/articles':
            document.title = "文章管理";
            break;
          case '/userinfo':
            document.title = "用户管理";
            break;
          default: break;
        }
      });
    },
  },

  effects: {
    *redirectLogin({ payload }, { put }) {
      yield put(routerRedux.push('/login'));
    },

    *redirectHome({ payload }, { put }) {
      yield put(routerRedux.push('/'));
    },
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
  },

  reducers: {
    loginSuccess(state, action) {
      let userInfo = action.payload;
      return { ...state, ...userInfo, isLogin: true, modalVisible: false };
    },
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },

};