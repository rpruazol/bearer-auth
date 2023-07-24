'use strict';

const { users } = require('../models/index.js');
const bcrypt = require('bcrypt');

async function handleSignup(req, res, next) {
  try {
    // hashing the password
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    
    let userRecord = await users.create(req.body);
    const output = {
        user: userRecord,
        token: userRecord.token
      };
      console.log(output);
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  
  try {
    console.log('handleSignin...')
    console.log(req.user)
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  console.log(res.status(200))
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}
