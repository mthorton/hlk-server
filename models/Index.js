// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions and creates the tables
const DefineUser = require('./User')
const DefinePostPrimary = require('./PostPrimary')
const DefinePostSecondary = require('./PostSecondary')

const User = DefineUser(sequelize, DataTypes) // Defines the model
const PostPrimary = DefinePostPrimary(sequelize, DataTypes) // Defines the model
const PostSecondary = DefinePostSecondary(sequelize, DataTypes) // Defines the model
//const Profiles = DefineProfile(sequelize, DataTypes)

// Define Associations
User.hasMany(PostPrimary)
PostPrimary.belongsTo(User)

PostPrimary.hasMany(PostSecondary)

//User.hasOne(Profile)
//Profile.belongsTo(User)

// Sync
synceDb(sequelize, { alter:true })
//sequelize.sync({force: true})


module.exports = { User, PostPrimary, PostSecondary }