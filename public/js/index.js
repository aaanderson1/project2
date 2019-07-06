$(document).ready(function() {
  $(".parallax").parallax();
// Get references to page elements
// eslint-disable-next-line no-unused-vars



// eslint-disable-next-line no-unused-vars
var submitBtnCurrent = $("#submitCurrent");
// eslint-disable-next-line no-unused-vars
var submitBtnPast = $("#submitAlready");
// eslint-disable-next-line no-unused-vars
var submitBtnWishlist = $("#submitWishlist");
var bookList = $("#book-list");

var bookService = new BookService();

// refreshbooks gets new books from the db and repopulates the list
var refreshbooks = function() {
    bookService.getbooks().then(function(data) {
    var $books = data.map(function(book) {
      var $a = $("<a>")
        .text(book.text)
        .attr("href", "/book/" + book.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": book.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn-large waves-effect waves-light blue-grey darken-1 fas fa-plus")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    bookList.empty();
    bookList.append($books);
  });
};

// handleFormSubmit is called whenever we submit a new book
// Save the new book to the db and refresh the list
var handleFormSubmit = function() {
  

<<<<<<< HEAD
  //API.saveBook(book).then(function() {
    //refreshbooks();
  //});
=======
  bookService.createBook(book).then(function() {
    refreshbooks();
  });
>>>>>>> master

 
};

// handleDeleteBtnClick is called when an book's delete button is clicked
// Remove the book from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  bookService.deleteBook(idToDelete).then(function() {
    refreshbooks();
  });
};

// Add event listeners to the submit and delete buttons
submitBtnCurrent.on("click", handleFormSubmit);
bookList.on("click", ".delete", handleDeleteBtnClick);
});