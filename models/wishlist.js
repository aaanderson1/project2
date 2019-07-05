module.exports = function (sequelize, DataTypes) {
    var WishList = sequelize.define("wishlist", {
        comment: DataTypes.STRING,
        order: DataTypes.INTEGER
    });
    return WishList;
};
