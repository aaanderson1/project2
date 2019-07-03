module.exports = function(sequelize, DataTypes) {
  var Reader = sequelize.define("Reader", {
    name: DataTypes.STRING
  });
  Reader.associate = function(models) {
    console.log(models);
    Reader.hasMany(models.book, {
      onDelete: "cascade"
    });
  };
  return Reader;
};
