const { DataTypes } = require("sequelize");
const db = require("../db");

const PostPrimary = db.define("postprimary", { // pp = post primary
    date: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    post: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    thoughts: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = PostPrimary;