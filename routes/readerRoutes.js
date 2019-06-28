var db = require("../models");

module.exports = function(app) {
  app.get("/api/readers", function(req, res) {
    db.Reader.findAll({
      include: [db.Book]
    }).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  app.get("/api/readers/:id", function(req, res) {
    db.Reader.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Book]
    }).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  app.Book("/api/Readers", function(req, res) {
    db.Reader.create(req.body).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  app.delete("/api/Readers/:id", function(req, res) {
    db.Reader.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReader) {
      res.json(dbReader);
    });
  });
};
