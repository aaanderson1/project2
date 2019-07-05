"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const BookModel = require("./book");
const UserModel = require("./user");
const BookmarkModel = require("./bookmark");
const AlreadyReadModel = require("./already_read");
const CurrentlyReadingModel = require("./currently_reading");
const WishlistModel = require("./wishlist");
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
const Bookmark = BookmarkModel(sequelize, Sequelize);
const AlreadyRead = AlreadyReadModel(sequelize, Sequelize);
const CurrentlyReading = CurrentlyReadingModel(sequelize, Sequelize);
const Wishlist = WishlistModel(sequelize, Sequelize);
// Book.belongsTo(User, {
//     foreignKey: {
//         allowNull: false
//     }
// });
Bookmark.belongsTo(User, {
});
Bookmark.belongsTo(Book, {
});
AlreadyRead.belongsTo(User, {
});
AlreadyRead.belongsTo(Book, {
});
CurrentlyReading.belongsTo(User, {
});
CurrentlyReading.belongsTo(Book, {
});
Wishlist.belongsTo(User, {
});
Wishlist.belongsTo(Book, {
});
Book.hasMany(CurrentlyReading, {
});
Book.hasMany(Bookmark, {
});
Book.hasMany(AlreadyRead, {
});
Book.hasMany(Wishlist, {
});
User.hasMany(Bookmark, {
    onDelete: "cascade"
});
User.hasMany(AlreadyRead, {
    onDelete: "cascade"
});
User.hasMany(CurrentlyReading, {
    onDelete: "cascade"
});
User.hasMany(Wishlist, {
    onDelete: "cascade"
});


module.exports = {
    sequelize,
    Book,
    User,
    Bookmark,
    AlreadyRead,
    CurrentlyReading,
    Wishlist,
};
