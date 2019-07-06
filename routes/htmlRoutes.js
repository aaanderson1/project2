var db = require("../models");

module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Book.findAll({}).then(function(dbBooks) {
//       res.render("index", {
//         msg: "Welcome!",
//         Books: dbBooks
//       });
//     });
//   });

//   // Load Book page and pass in an Book by id
//   app.get("/Book/:id", function(req, res) {
//     db.Book.findOne({ where: { id: req.params.id } }).then(function(dbBook) {
//       res.render("Book", {
//         Book: dbBook
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
};
