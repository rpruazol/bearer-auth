'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

const basic = async (req, res, next) => {
  if (!req.headers.authorization) { return next('Not authorized, no token present'); }
  
  let basic = req.headers.authorization.split(' ')[1];
  console.log('basic', basic);
  let [username, pass] = base64.decode(basic).split(':');
  console.log([username, pass])
  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

module.exports = basic;

