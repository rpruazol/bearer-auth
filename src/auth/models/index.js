'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'development' ? 'sqlite:memory:' : process.env.DATABASE_URL;
console.log(DATABASE_URL)

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};
