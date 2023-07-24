'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { parse } = require('dotenv');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    
    user.password = hashedPass;
    
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
  
    const user = await this.findOne({where: { username: username }})
    const valid = await bcrypt.compare(password, user.dataValues.password)
    console.log('result', valid)
    if (valid) { return user; }
    throw new Error('Invalid User');
  }

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = await jwt.verify(token, process.env.SECRET);
      console.log('parsedToken', parsedToken, 'username', parsedToken.username)
      const user = await this.findOne({where: { username: parsedToken.username }})
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }
  return model;
}

module.exports = userSchema;
