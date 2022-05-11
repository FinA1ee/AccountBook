const userModel = {
  namespace: 'user',
  state: {
    userInfo: String, // todo types
    accountInfo: String,
    walletInfo: String,
  },
  reducers: {},
  effects: {
    *init({ call, put }) {
      const { data } = yield call();
      yield put({
        type: 'save',
        payload: {
          userInfo: data.userInfo,
          accountInfo: data.accountInfo,
          walletInfo: data.walletInfo,
        },
      });
    },
  },
};

export default userModel;
