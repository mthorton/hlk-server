const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const UserModel = require("./user");
//const LogModel = require("./log"); // LogModel
const PostPrimaryModel = require("./postPrimary");
const PostSecondaryModel = require("./postSecondary");

// Grab Model Functions
//const DefineUser = require('./user')

//const User = DefineUser(sequelize, DataTypes)

// Define Associations
UserModel.hasMany(PostPrimaryModel)
PostPrimaryModel.belongsTo(UserModel)

PostPrimaryModel.hasMany(PostSecondaryModel)
PostSecondaryModel.belongsTo(PostPrimaryModel)

module.exports = { UserModel, PostPrimaryModel, PostSecondaryModel };