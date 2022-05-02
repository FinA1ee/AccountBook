// /signUp/check/username
const express = require('express');
const passwordHash = require('password-hash');
const dbo = require('../db/conn');

const signUpRouter = express.Router();

signUpRouter.get('/signup', function (req, res) {
  // do something here.
  console.log('req: asdfasdfasdf');
  res.send('WTF');
});

signUpRouter.post('/signup/add_new_user', async (req, res) => {
  console.log('req: ');
  try {
    const dbConnect = dbo.getDb();
    const account = dbConnect.collection('accounts');

    const uName = req.body.username;
    const hashedPassword = passwordHash.generate(req.body.password);
    const email = req.body.email;

    const result = await account.insertOne({
      username: uName,
      password: hashedPassword,
      email: email,
    });

    console.log('New Account Added: ', result);
    res.send({
      code: 0,
      message: 'success',
    });
  } catch {
    console.log('New Account Adding Error');
    res.send({
      code: 1,
      message: 'failed',
    });
  }
});

signUpRouter.get('/signup/check_username', (req, res) => {
  const dbConnect = dbo.getDb();

  const data = dbConnect.collection('accounts');

  console.log(data);
});

signUpRouter.get('/signup/check_email', (req, res) => {
  const dbConnect = dbo.getDb();
  const data = dbConnect.collection('accounts');

  console.log(data);
});

module.exports = signUpRouter;
