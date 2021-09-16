module.exports = (sequelize, DataTypes) => {
    const PostSecondary = sequelize.define("PostSecondary", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        thoughts: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
    return PostSecondary
}