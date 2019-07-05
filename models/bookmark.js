module.exports = function(sequelize, DataTypes) {
    var Bookmark = sequelize.define("bookmark", {
        comment: DataTypes.STRING,
        page: DataTypes.INTEGER
    });
    return Bookmark;
};
