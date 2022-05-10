const { checkNodeVersion, getAvailablePort } = require('./utils');

// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const dbo = require('../db/conn');

const signup = require('../routes/signup.js');
const login = require('../routes/login.js');

const PORT = process.env.PORT;
const app = express();

checkNodeVersion();

const registerRouters = () => {
  app.use('/signup', signup);
  app.use('/login', login);
};

const start = () => {
  // Global error handling
  app.use(cors());
  app.use(express.json());

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
