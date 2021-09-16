const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.SERVER);

module.exports = db;


