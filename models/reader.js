module.exports = function(sequelize, DataTypes) {
  var Reader = sequelize.define("Reader", {
    name: DataTypes.STRING
  });

  Reader.associate = function(models) {
    Reader.hasMany(models.Book, {
      onDelete: "cascade"
    });
  };
  return Reader;
};
