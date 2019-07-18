import { doRegist } from '../services/register';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'register',

  state: {
    username: '',
    isLogin: false,
    modalVisible: false,
    authToken: '',
    pathname: '/',
    logupModalVisible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    * doRegist({ payload }, { call, put }) {
      let { userData, resolve, reject } = payload;
      const { data } = yield call(doRegist, userData);

      if (data && data.status) {
      //   let userInfo = data.userInfo;
      //   yield sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      //   //注册成功
      //   yield put({
      //     type: 'loginSuccess',
      //     payload: userInfo
      //   });
      //   // 跳转到首页
        yield put(routerRedux.push('/login/page'));
                resolve();
      } else {
        reject(data);
      }
    }
  },

  reducers: {
    login(state, action) {
      return { ...state,
        modalVisible: true
      };
    },
    loginSuccess(state, action) {
      let userInfo = action.payload;
      return { ...state,
        ...userInfo,
        isLogin: true,
        modalVisible: false
      };
    },
    logoutSuccess(state, action) {
      return { ...state,
        username: '',
        authToken: '',
        isLogin: false
      };
    },
    hideModal(state) {
      return { ...state,
        modalVisible: false
      };
    },
  },

}
