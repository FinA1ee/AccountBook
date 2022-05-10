const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const dbo = require('../db/conn');
const cryptoUtils = require('../routes/utils/crypto');
const Model = require('../db/models');
const loginRouter = express.Router();

const verify = async (username, givenPassword, cb) => {
  console.log('Verifying: ', dbo.getDb().collection);
  Model.UserModel.findOne({ username: username })
    .then(async user => {
      console.log('Successfully found user documents.');
      console.log('User: ', user);
      if (!user) {
        throw 'No user found';
      }
      const password = user.password;
      const salt = user.salt;
      const isValid = await cryptoUtils.checkPassword(givenPassword, password, salt);
      if (isValid) {
        cb(null, false, { message: 'Incorrect username or password' });
        console.log('invalid');
      } else {
        cb(null, user);
        console.log('valid');
      }
    })
    .catch(err => {
      console.error('Failed to found user documents with error: ', err);
      cb(null, false, { message: 'Incorrect username or password' });
    });
};

passport.use(new LocalStrategy((username, password, cb) => verify(username, password, cb)));
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

loginRouter.get(
  '/password',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/login/complete',
    failureRedirect: '/login/fail',
  })
);
loginRouter.get('/complete', (req, res) => {
  console.log('verification done: ', req, res);
  res.send({
    code: 0,
    result: true,
  });
});
loginRouter.get('/fail', (req, res) => {
  console.log('verification failed: ', req, res);
  res.send({
    code: 0,
    result: false,
  });
});
// loginRouter.post('/login', async (req, res) => {
//   /** authentication */
//   const uName = req.body.username;
//   const pWord = req.body.password;

//   /** */
// });

module.exports = loginRouter;
