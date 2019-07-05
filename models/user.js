module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    return User;
};
