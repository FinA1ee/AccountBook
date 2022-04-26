// /signUp/check/username
const express = require('express');
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
    console.log('reqqqqqqq: ', req.body);
    const result = await account.insertOne({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    console.log('New Account Added: ', result);
    res.send({
      code: 0,
      message: 'success',
    });
  } catch {
    console.log('New Account Adding Error');
  }
});

signUpRouter.get('/check_username', (req, res) => {
  const dbConnect = dbo.getDb();

  // dbConnect
  //   .collection('accounts')
  //   .find({})
  //   .limit(50)
  //   .toArray(function (err, result) {
  //     if (err) {
  //       res.status(400).send('Error fetching listings!');
  //     } else {
  //       res.json(result);
  //     }
  //   });
});

module.exports = signUpRouter;
