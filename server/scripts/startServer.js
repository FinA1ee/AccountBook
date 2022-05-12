require('dotenv').config({ path: './config.env' });

const { checkNodeVersion, getAvailablePort } = require('./utils');
const express = require('express');
const cors = require('cors');
const dbo = require('../db/conn');
const session = require('express-session');
// const csrf = require('csurf');

const signup = require('../routes/signup.js');
const login = require('../routes/login.js');
const home = require('../routes/home');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const PORT = process.env.PORT;
const app = express();

checkNodeVersion();

const registerRouters = () => {
  app.use('/signup', signup);
  app.use('/login', login);
  app.use('/home', home);
};

const start = () => {
  // Global error handling
  app.use(cors());
  app.use(express.json());

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      store: new MongoStore({
        mongoUrl:
          'mongodb+srv://yuchenZhu:Gx8aPcnggdbqM5nm@cluster0.2oosd.mongodb.net/jz_wallet?retryWrites=true&w=majority',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native',
      }),
    })
  );
  // app.use(csrf());
  app.use(passport.authenticate('session'));

  registerRouters();

  // get MongoDB driver connection
  dbo.connectToServer(function (err) {
    if (err) {
      console.error('错误', err);
      process.exit();
    }
  });

  return new Promise((resolve, reject) => {
    getAvailablePort(PORT)
      .then(port => {
        process.env.PORT = port;
        app.listen(port, () => {
          resolve(port);
        });
      })
      .catch(err => reject(err));
  });
};

start()
  .then(port => {
    console.log(`Server is running on port: ${port}`);
  })
  .catch(err => {
    console.log(`Server is down: ${err}`);
  });
