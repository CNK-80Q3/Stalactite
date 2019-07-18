import * as usersService from '../services/users';
import { Modal } from 'antd'

export default {
  namespace: 'users',
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
    // 获取用户数据
    *getUserData({ payload: { page = 1 } }, { call, put }){
      const { data } = yield call(usersService.getUser, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.user,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'getUserData', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'getUserData', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      const { data } = yield call(usersService.create, values);
            if (!data.status) {
        Modal.error({
          title: '错误提示',
          content: <p style={{fontSize: 14}}>{data.msg}</p>
        });
      }
      const page = yield select(state => state.users.page);
      yield put({ type: 'getUserData', payload: { page } });
    },
  },
  // 监听路由
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/userinfo/components/Users') {
          dispatch({ type: 'getUserData', payload: query });
        }
      });
    },
  },
};
