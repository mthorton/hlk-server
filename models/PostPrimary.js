module.exports = (sequelize, DataTypes) => {
    const PostPrimary = sequelize.define("PostPrimary", {
            content: {
                type: DataTypes.STRING
            }
    })
    return PostPrimary
}