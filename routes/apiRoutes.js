const db = require("../models");
const crypto = require("crypto");

module.exports = function (app) {
    ////
    // User
    ////
    // Get userId
    app.get("/api/user", function (req, res) {
        const data = req.body;
        if (!data.username) {
            res.json({
                error: "username not provided"
            });
            return;
        }
        if (!data.password) {
            res.json({
                error: "password not provided"
            });
            return;
        }
        console.log(data);
        const shasum = crypto.createHash("sha1");
        const hashedPassword = shasum.update(data.password).digest("hex");
        console.log(hashedPassword);
        db.User.findOne({where: {username: data.username, password: hashedPassword}})
        .then(function (user) {
            if (!user) {
                res.json({error: `user with username: "${data.username}" not found matching this password`});
                return;
            }
            res.json({userId: user.id});
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Create a new User
    app.post("/api/user", function (req, res) {
        const data = req.body;
        if (!data.username) {
            res.json({
                error: "username not provided"
            });
            return;
        }
        if (!data.password) {
            res.json({
                error: "password not provided"
            });
            return;
        }
        if (!data.name) {
            res.json({
                error: "name not provided"
            });
            return;
        }
        console.log(data);
        const shasum = crypto.createHash("sha1");
        const hashedPassword = shasum.update(data.password).digest("hex");
        console.log(hashedPassword);
        body.password = hashedPassword;
        db.User.create(data)
        .then(function (user) {
            res.json(user);
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });


    ////
    // Books
    ////

    // Get all Books
    app.get("/api/books", function (req, res) {
        db.Book.findAll({})
        .then(function (dbBooks) {
            res.json(dbBooks);
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Create a new Book
    app.post("/api/books", function (req, res) {
        const data = req.body;
        if (!data.title) {
            res.json({
                error: "title not provided"
            });
            return;
        }
        if (!data.author) {
            res.json({
                error: "author not provided"
            });
            return;
        }
        if (!data.genre) {
            res.json({
                error: "genre not provided"
            });
            return;
        }
        if (!data.pages) {
            res.json({
                error: "pages not provided"
            });
            return;
        }
        if (!data.comments) {
            res.json({
                error: "comments not provided"
            });
            return;
        }
        if (!data.rating || data.rating < 1 || data.rating > 5) {
            res.json({
                error: "rating not provided or is not from 1 to 5"
            });
            return;
        }
        db.Book.create(data)
        .then(function (dbBook) {
            res.json(dbBook);
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Delete an Book by id
    app.delete("/api/books/:id", function (req, res) {
        const data = req.body;
        if (!data.id) {
            res.json({
                error: "id not provided"
            });
            return;
        }
        db.Book.destroy({
            where: {
                id: data.id
            }
        })
        .then(function (dbBook) {
            res.json(dbBook);
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    ////
    // Bookmark
    ////

    // Get all Bookmarks
    app.get("/api/bookmarks", function (req, res) {
        const data = req.body;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        db.Bookmark.findAll({where: {userId: data.userId}}).then(function (bookmarks) {
            res.json(bookmarks);
        });
    });

    // Create a new Bookmarks
    app.post("/api/bookmarks", function (req, res) {
        const data = req.body;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        if (!data.bookId) {
            res.json({
                error: "bookId not provided"
            });
            return;
        }
        if (!data.bookId) {
            res.json({
                error: "bookId not provided"
            });
            return;
        }
        db.Bookmark.create(req.body)
        .then(function (bookmark) {
            res.json(bookmark);
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Delete an Bookmarks by id
    app.delete("/api/bookmarks", function (req, res) {
        const data = req.body;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        if (!data.id) {
            res.json({
                error: "id not provided"
            });
            return;
        }
        db.Bookmark.destroy({
            where: {
                id: data.id,
                userId: data.userId
            }
        })
        .then(function () {
            res.json({});
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });
};
