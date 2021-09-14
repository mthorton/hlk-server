module.exports = (sequelize, DataTypes) => {
    const PostSecondary = sequelize.define("PostSecondary", {
            content: {
                type: DataTypes.STRING
            }
    })
    return PostSecondary
}