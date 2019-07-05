module.exports = function (sequelize, DataTypes) {
    var Book = sequelize.define("book", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Book;
};
