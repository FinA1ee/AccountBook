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
  console.log('req: ');
  try {
    const mongooseConn = dbo.getMongoose();

    const uName = req.body.username;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const email = req.body.email;

    console.log('hash: ', hashedPassword);
    // const UserModel = mongoose.model('UserModel', UserSchema);
    const user = new UserModel({
      uid: uuidv4(),
      username: uName,
      password: hashedPassword,
      email: email,
    });

    user.save(err => {
      if (err) {
        console.log('New Account Creation Error: ', err);
      }
    });

    // const result = await account.insertOne({
    //   username: uName,
    //   password: hashedPassword,
    //   email: email,
    // });

    console.log('New Account Added: ', user);
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
