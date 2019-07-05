module.exports = function(sequelize, DataTypes) {
  var AlreadyRead = sequelize.define("already_read", {
    comment: DataTypes.STRING,
  });
  return AlreadyRead;
};
