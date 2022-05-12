const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cryptoUtils = require('../routes/utils/crypto');
const Model = require('../db/models');

const verify = async (username, givenPassword, cb) => {
  Model.UserModel.findOne({ username: username })
    .then(async user => {
      console.log('Successfully found user documents.');
      if (!user) {
        throw 'No user found';
      }
      const password = user.password;
      const salt = user.salt;
      const isValid = await cryptoUtils.checkPassword(givenPassword, password, salt);
      if (isValid) {
        cb(null, false, { message: 'Incorrect username or password' });
      } else {
        cb(null, user);
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
    cb(null, user);
  });
});
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

const loginRouter = express.Router();

loginRouter.get(
  '/password',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/login/complete',
    failureRedirect: '/login/fail',
  })
);
loginRouter.get('/complete', (req, res) => {
  res.send({
    code: 0,
    result: true,
  });
});
loginRouter.get('/fail', (req, res) => {
  res.send({
    code: 0,
    result: false,
  });
});

module.exports = loginRouter;
