const Model = require('../../db/models');
const cryptoUtils = require('./crypto');

/** 创建user document */
const getNewUser = async ({ username, password, email }, uid) => {
  try {
    const { hashedPassword, salt } = await cryptoUtils.passwordHash(password);
    console.log(hashedPassword, salt);
    return new Model.UserModel({
      uid,
      username,
      password: hashedPassword,
      salt,
      email: email.toLowerCase(),
    });
  } catch (e) {
    console.error('Error Occurred During User Creation: ', e);
    return null;
  }
};

/** 创建 wallet document */
const getNewWallet = wallet_id => {
  try {
    return new Model.WalletModel({
      wallet_id,
      balance: 0,
    });
  } catch (e) {
    console.error('Error Occurred During Walelt Creation: ', e);
    return null;
  }
};

/** 创建account document */
const getNewAccount = (uid, wallet_id) => {
  return new Model.AccountModel({
    uid,
    wallet_id,
    reqTime: new Date().toUTCString(),
    avatar: '',
  });
};

module.exports = {
  getNewUser,
  getNewWallet,
  getNewAccount,
};
