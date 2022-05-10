const express = require('express');
const factory = require('./utils/factory');
const { v4: uuidv4 } = require('uuid');
const signUpRouter = express.Router();

signUpRouter.post('/add_new_user', async (req, res) => {
  const errorHandler = err => {
    if (err) {
      throw err;
    }
  };

  try {
    /** 创建id */
    const uid = uuidv4();
    const wallet_id = uuidv4();

    /** 创建Doc */
    const user = await factory.getNewUser(req.body, uid);
    const wallet = factory.getNewWallet(wallet_id);
    const account = factory.getNewAccount(uid, wallet_id);
    console.log('Docs creation done:', user);
    /** 保存document */
    user.save(errorHandler);
    wallet.save(errorHandler);
    account.save(errorHandler);

    res.send({
      code: 0,
      result: true,
    });
  } catch (e) {
    console.log('New Account Adding Error: ', e);
    res.send({
      code: -1,
      result: false,
    });
  }
});

// signUpRouter.get('/signup/check_username', (req, res) => {
//   try {
//     UserModel.findOne({ username: req.query.username })
//       .exec()
//       .then(entry => {
//         res.send({
//           code: 0,
//           result: entry === null,
//         });
//       });
//   } catch (e) {
//     res.send({
//       code: 1,
//     });
//   }
// });

// signUpRouter.get('/signup/check_email', (req, res) => {
//   const email = req.query.email;

//   try {
//     UserModel.findOne({ email })
//       .exec()
//       .then(entry => {
//         res.send({
//           code: 0,
//           result: entry === null,
//         });
//       });
//   } catch (e) {
//     res.send({
//       code: 1,
//     });
//   }
// });

module.exports = signUpRouter;
