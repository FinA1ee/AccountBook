const express = require('express');
const Model = require('../db/models');
const homeRouter = express.Router();

homeRouter.get('/me', async (req, res) => {
  // given the user id
  try {
    const { uid, username, email } = req.session.passport.user;
    console.log('uid: ', uid);
    const { avatar = '', wallet_id = '' } = await Model.AccountModel.findOne({ uid: uid });
    const { balance } = await Model.WalletModel.findOne({ wallet_id: wallet_id });
    const result = {
      userInfo: {
        username,
        email,
      },
      accountInfo: {
        avatar,
        balance,
      },
    };
    console.log('result: ', result);
    res.send({
      code: 0,
      result,
    });
  } catch (e) {
    console.error(e);
    res.send({
      code: -1,
      result: null,
    });
  }
});

module.exports = homeRouter;
