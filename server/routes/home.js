const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/me', async (req, res) => {
  // given the user id

  // get user info

  // get account info

  // get wallet info

  // generate result
  const res = {};
  res.send({
    code: 0,
    result: res,
  });
});

module.exports = homeRouter;
