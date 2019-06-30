"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const BookModel = require("./book");
const UserModel = require("./user");

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
