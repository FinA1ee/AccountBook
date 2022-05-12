import { HomeApi } from '@apis/handlers';
import * as models from '@apis/model/models';

export interface UserModelState {
  userInfo: models.UserInfoVo | null;
  accountInfo: models.AccountInfoVo | null;
}

const userModel = {
  namespace: 'user',
  state: {
    userInfo: null,
    accountInfo: null,
  } as UserModelState,
  reducers: {
    save(state, { payload: { userInfo, accountInfo } }) {
      return {
        ...state,
        userInfo,
        accountInfo,
      };
    },
  },
  effects: {
    *init(payload: {}, { call, put }) {
      console.log('calling redux');

      const { code, result } = yield call(HomeApi.getInitalInfo);
      console.log('calling redux done: ', code, result);
      yield put({
        type: 'save',
        payload: {
          userInfo: result.userInfo,
          accountInfo: result.accountInfo,
        },
      });
    },
  },
};

export default userModel;
