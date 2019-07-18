import * as microblogsService from '../services/microblog';
import { Modal } from 'antd'

export default {
  namespace: 'microblogs',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    // 获取用户数据
    *getMicroblogData({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(microblogsService.getMicroblog, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.microblog,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
    *getMyMicroblogData({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(microblogsService.getMyMicroblog, { page });
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          data: data.microblog,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(microblogsService.remove, id);
      const page = yield select(state => state.microblogs.page);
      yield put({ type: 'getMicroblogData', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(microblogsService.patch, id, values);
      const page = yield select(state => state.microblogs.page);
      yield put({ type: 'getMicroblogData', payload: { page } });
    },
    *like({ payload: { id, like } }, { call, put, select }) {
      yield call(microblogsService.like, id, like);
      const page = yield select(state => state.microblogs.page);
      yield put({ type: 'getMicroblogData', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      const { data } = yield call(microblogsService.create, values);
      if (!data.status) {
        Modal.error({
          title: '错误提示',
          content: <p style={{ fontSize: 14 }}>{data.msg}</p>
        });
      }
      const page = yield select(state => state.microblogs.page);
      //请求更新心情数据
      yield put({ type: 'getMicroblogData', payload: { page } });
    },
    *getToken(_, { call, put }) {
      const { data } = yield call(microblogsService.getToken);
      return data
    },
    *comment({ payload: value }, { call, put, select }) {
      console.log(value)
      const { data } = yield call(microblogsService.comment, value);
      yield put({
        type: 'save',
        payload: {
          data: data.microbblog,
        },
      });
    },
  },
  // 监听路由
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/microblog/page') {
          dispatch({ type: 'getMicroblogData', payload: query });
        }
      });
    },
  },
};
