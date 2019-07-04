// Get references to page elements
// eslint-disable-next-line no-unused-vars

var $userName = $("#userName")
var $bookTitle = $("#bookTitle");
var $bookDescription = $("#book-description");
var $authorFirstName = $("#authorFirst");
var $authorLastName = $("#authorLast");
var $genre = $("#genre");
var $pagesNumber = $("#pagesNumber");
var $comments = $("#book-description");
var $rating = $("#rating");
var $imageURL = $("#imageURL");
// eslint-disable-next-line no-unused-vars
var $submitBtnCurrent = $("#submitCurrent");
// eslint-disable-next-line no-unused-vars
var $submitBtnPast = $("#submitAlready");
// eslint-disable-next-line no-unused-vars
var $submitBtnWishlist = $("#submitWishlist");
var $bookList = $("#book-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBook: function(book) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/books",
      data: JSON.stringify(book)
    });
  },
  getBook: function() {
    return $.ajax({
      url: "api/books",
      type: "GET"
    });
  },
  deleteBook: function(id) {
    return $.ajax({
      url: "api/books/" + id,
      type: "DELETE"
    });
  }
};

// refreshbooks gets new books from the db and repopulates the list
var refreshbooks = function() {
  API.getbooks().then(function(data) {
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

    $bookList.empty();
    $bookList.append($books);
  });
};

// handleFormSubmit is called whenever we submit a new book
// Save the new book to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var book = {
    Name: 
    Title: $bookTitle.val().trim(),
    description: $bookDescription.val().trim()
  };

  if (!(book.text && book.description)) {
    alert("You must enter a title and description!");
    return;
  }

  API.saveBook(book).then(function() {
    refreshbooks();
  });

  $bookText.val("");
  $bookDescription.val("");
};

// handleDeleteBtnClick is called when an book's delete button is clicked
// Remove the book from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBook(idToDelete).then(function() {
    refreshbooks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtnCurrent.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);
