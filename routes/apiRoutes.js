var db = require("../models");

module.exports = function(app) {
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.reader_id) {
      query.ReaderId = req.query.reader_id;
    }
    db.Book.findAll({
      where: query,
      include: [db.Reader]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
  // Get all Books
  app.get("/api/books", function(req, res) {
    db.Book.findAll({}).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Create a new Book
  app.post("/api/books", function(req, res) {
    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // Delete an Book by id
  app.delete("/api/books/:id", function(req, res) {
    db.Book.destroy({ where: { id: req.params.id } }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
};
