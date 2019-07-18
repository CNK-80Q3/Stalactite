import * as picturesService from '../services/picture';
import { Modal } from 'antd'

export default {
  namespace: 'pictures',
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
    // 获取所有相册数据
    // *getPictureData({ payload: { page = 1 } }, { call, put }) {
    //   const { data } = yield call(picturesService.getPicture, { page });
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       data: data.picture,
    //       total: data.count,
    //       page: parseInt(page, 10),
    //     },
    //   });
    // },
    *getMyAlbumsData({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(picturesService.getMyPicture, { page });
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          data: data.picture,
          total: data.count,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(picturesService.remove, id);
      const page = yield select(state => state.pictures.page);
      yield put({ type: 'getMyAlbumsData', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(picturesService.patch, id, values);
      const page = yield select(state => state.pictures.page);
      yield put({ type: 'getMyAlbumsData', payload: { page } });
    },
    // *like({ payload: { id, like } }, { call, put, select }) {
    //   yield call(picturesService.like, id, like);
    //   const page = yield select(state => state.pictures.page);
    //   yield put({ type: 'getMyAlbumsData', payload: { page } });
    // },
    *create({ payload: values }, { call, put, select }) {
      const { data } = yield call(picturesService.create, values);
      if (!data.status) {
        Modal.error({
          title: '错误提示',
          content: <p style={{ fontSize: 14 }}>{data.msg}</p>
        });
      }
      const page = yield select(state => state.pictures.page);
      //请求更新心情数据
      yield put({ type: 'getMyAlbumsData', payload: { page } });  
    },
    *getToken(_, { call, put }) {
      const { data } = yield call(picturesService.getToken);
      return data
    }
  },
  // 监听路由
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/picture/page') {
          dispatch({ type: 'getMyAlbumsData', payload: query });
        }
      });
    },
  },
};
