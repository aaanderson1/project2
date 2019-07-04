"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const BookModel = require("./book");
const UserModel = require("./user");
var db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== __dirname && file.slice(-3) === ".js" && file !== "index.js"
    );
  }).forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


const Book = BookModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
Book.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});
User.hasMany(Book, {
  onDelete: "cascade"
});


module.exports = {
  sequelize,
  Book,
  User,
};