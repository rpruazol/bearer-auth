'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

const basic = async (req, res, next) => {
  if (!req.headers.authorization) { return next('Not authorized, no token present'); }
  
  let basic = req.headers.authorization.split(' ');
  console.log('basic', basic);
  let decodedString = base64.decode(basic[1]);
  let [username, password] = decodedString.split(':')
  console.log([username, password])
  try {
    req.user = await users.authenticateBasic(username, password)
    console.log(req.user)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

module.exports = basic;

