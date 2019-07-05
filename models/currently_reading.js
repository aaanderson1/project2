module.exports = function (sequelize, DataTypes) {
    var CurrentlyReading = sequelize.define("currently_reading", {
        comment: DataTypes.STRING,
    });
    return CurrentlyReading;
};
