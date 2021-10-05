const { DataTypes } = require("sequelize");
const db = require("../db");

const PostSecondary = db.define("postsecondary", { // pp = post primary
    date: {
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
    postprimaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = PostSecondary;