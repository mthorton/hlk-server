module.exports = (sequelize, DataTypes) => {
    const PostPrimary = sequelize.define("PostPrimary", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(100),
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
    return PostPrimary
}