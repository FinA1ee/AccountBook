const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const dbo = require('../db/conn');

const UserModel = require('../db/models/User');
const signUpRouter = express.Router();

signUpRouter.get('/signup', function (req, res) {
  // do something here.
  console.log('req: asdfasdfasdf');
  res.send('WTF');
});

signUpRouter.post('/signup/add_new_user', async (req, res) => {
  try {
    /** 获取数据 */
    const uName = req.body.username;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const email = req.body.email;

    /** 创建document */
    const user = new UserModel({
      uid: uuidv4(),
      username: uName,
      password: hashedPassword,
      email: email.toLowerCase(),
    });

    /** 保存document */
    user.save(err => {
      if (err) {
        res.send({
          code: 0,
          result: false,
        });
      } else {
        res.send({
          code: 0,
          result: true,
        });
      }
    });
  } catch (e) {
    console.log('New Account Adding Error: ', e);
    res.send({
      code: 0,
      result: false,
    });
  }
});

signUpRouter.get('/signup/check_username', (req, res) => {
  try {
    UserModel.findOne({ username: req.query.username })
      .exec()
      .then(entry => {
        res.send({
          code: 0,
          result: entry === null,
        });
      });
  } catch (e) {
    res.send({
      code: 1,
    });
  }
});

signUpRouter.get('/signup/check_email', (req, res) => {
  const email = req.query.email;

  try {
    UserModel.findOne({ email })
      .exec()
      .then(entry => {
        res.send({
          code: 0,
          result: entry === null,
        });
      });
  } catch (e) {
    res.send({
      code: 1,
    });
  }
});

module.exports = signUpRouter;
