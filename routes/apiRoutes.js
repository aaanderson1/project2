const db = require("../models");
const crypto = require("crypto");

module.exports = function (app) {
    ////
    // User
    ////
    // Get userId
    app.get("/api/user", function (req, res) {
        const data = req.query;
        console.log(data);
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
        data.password = hashedPassword;
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
    app.delete("/api/books", function (req, res) {
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
        const data = req.query;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        db.Bookmark.findAll({
            where: {
                userId: data.userId
            },
            include: {
                model: db.Book,
            }
        }).then(function (bookmarks) {
            const returnData = bookmarks.map(bookmark => {
                return {
                    id: bookmark.id,
                    comment: bookmark.comment,
                    page: bookmark.page,
                    book: {
                        id: bookmark.book.id,
                        title: bookmark.book.title,
                        author: bookmark.book.author,
                        pages: bookmark.book.pages
                    }
                };
            });
            res.json(returnData);
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
        if (!data.page) {
            res.json({
                error: "page not provided"
            });
            return;
        }
        if (!data.comment) {
            res.json({
                error: "comment not provided"
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
    

    ////
    // AlreadyRead
    ////

    // Get all AlreadyReads
    app.get("/api/already-read", function (req, res) {
        const data = req.query;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        db.AlreadyRead.findAll({
            where: {
                userId: data.userId
            },
            include: {
                model: db.Book,
            }
        }).then(function (alreadyReads) {
            const returnData = alreadyReads.map(alreadyRead => {
                return {
                    id: alreadyRead.id,
                    comment: alreadyRead.comment,
                    book: {
                        id: alreadyRead.book.id,
                        title: alreadyRead.book.title,
                        author: alreadyRead.book.author,
                        pages: alreadyRead.book.pages
                    }
                };
            });
            res.json(returnData);
        });
    });

    // Create a new AlreadyReads
    app.post("/api/already-read", function (req, res) {
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
        if (!data.comment) {
            res.json({
                error: "comment not provided"
            });
            return;
        }
        db.AlreadyRead.create(req.body)
        .then(function (alreadyRead) {
            res.json(alreadyRead);
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Delete an AlreadyReads by id
    app.delete("/api/already-read", function (req, res) {
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
        db.AlreadyRead.destroy({
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
    

    ////
    // CurrentlyReading
    ////

    // Get all CurrentlyReadings
    app.get("/api/currently-reading", function (req, res) {
        const data = req.query;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        db.CurrentlyReading.findAll({
            where: {
                userId: data.userId
            },
            include: {
                model: db.Book,
            }
        }).then(function (currentlyReading) {
            const returnData = currentlyReading.map(currentlyReading => {
                return {
                    id: currentlyReading.id,
                    comment: currentlyReading.comment,
                    book: {
                        id: currentlyReading.book.id,
                        title: currentlyReading.book.title,
                        author: currentlyReading.book.author,
                        pages: currentlyReading.book.pages
                    }
                };
            });
            res.json(returnData);
        });
    });

    // Create a new CurrentlyReadings
    app.post("/api/currently-reading", function (req, res) {
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
        if (!data.comment) {
            res.json({
                error: "comment not provided"
            });
            return;
        }
        db.CurrentlyReading.create(req.body)
        .then(function (currentlyReading) {
            res.json(currentlyReading);
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Delete an CurrentlyReadings by id
    app.delete("/api/currently-reading", function (req, res) {
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
        db.CurrentlyReading.destroy({
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

    ////
    // Wishlist
    ////

    // Get all Wishlists
    app.get("/api/wishlist", function (req, res) {
        const data = req.query;
        if (!data.userId) {
            res.json({
                error: "userId not provided"
            });
            return;
        }
        db.Wishlist.findAll({
            where: {
                userId: data.userId
            },
            include: {
                model: db.Book,
            }
        }).then(function (wishlist) {
            const returnData = wishlist.map(wishlist => {
                return {
                    id: wishlist.id,
                    comment: wishlist.comment,
                    book: {
                        id: wishlist.book.id,
                        title: wishlist.book.title,
                        author: wishlist.book.author,
                        pages: wishlist.book.pages
                    }
                };
            });
            res.json(returnData);
        });
    });

    // Create a new Wishlists
    app.post("/api/wishlist", function (req, res) {
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
        if (!data.comment) {
            res.json({
                error: "comment not provided"
            });
            return;
        }
        if (!data.order) {
            res.json({
                error: "comment not provided"
            });
            return;
        }
        db.Wishlist.create(req.body)
        .then(function (wishlist) {
            res.json(wishlist);
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                error: err.name
            });
        });
    });

    // Delete an Wishlists by id
    app.delete("/api/wishlist", function (req, res) {
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
        db.Wishlist.destroy({
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
