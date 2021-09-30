///*
const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});

module.exports = User;
//*/

/*
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    })
    return User
}
*/
