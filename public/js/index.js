

$(document).ready(function() {
  $(".parallax").parallax();
  $(".dropdown-trigger").dropdown();
  $(".collapsible").collapsible();
  $(".submitCurrent").click(function(){
    var title = $("#bookTitle").val().trim();
    var authorFirst = $("#authorFirst").val().trim();
    var authorLast = $("#authorLast").val().trim();
    var authorLast = $("#authorLast").val().trim();
    var pagesNumber = $("#pagesNumber").val().trim();
    var genre = $("#genre").val()
    var comments = $("#book-description").val().trim();
    var rating = $("#rating").val()
    var imageURL = $("#imageURL").val().trim();
  });
});

//When user clicks submitCurrent button
$("#submitCurrent").on("click", function(event) {
  event.preventDefault();
  //make a currentBook object
  var currentBook = {
    // eslint-disable-next-line prettier/prettier
    user: $("#userName").val().trim(),
    // eslint-disable-next-line prettier/prettier
    title: $("#bookTitle").val().trim(),
    // eslint-disable-next-line prettier/prettier
    authorFirst: $("#authorFirst").val().trim(),
    // eslint-disable-next-line prettier/prettier
    authorLast: $("#authorLast").val().trim(),
    // eslint-disable-next-line prettier/prettier
    genre: $("#genre").val(),
    pages: $("#pagesNumber").val().trim(),
    comments: $("#book-description").val().trim(),
    rating: $("#rating").val(),
    image: $("#imageURL").val().trim(),
  };
  // send ajax post-request with jquery
  $.post("/api/new", currentBook)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });
  // Empty each input box by replacing the value with an empty string
  $("#userName").val("");
  $("#bookTitle").val("");
  $("#authorFirst").val("");
  $("#authorLast").val("");
  //$("#genre").val("");
  $("#pagesNumber").val("");
  $("#book-description").val("");
  //$("#rating").val("");
  $("#imageURL").val("");

  //dynamically populate to currently reading card
  $("#bookComment").append("<p>Description: </p>" + currentBook);
});
// Get references to page elements
// eslint-disable-next-line no-unused-vars

var $bookText = $("#book-text");
var $bookDescription = $("#book-description");
// eslint-disable-next-line no-unused-vars
var $submitBtnCurrent = $("#submitCurrent");
// eslint-disable-next-line no-unused-vars
var $submitBtnPast = $("#submitPast");
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
        .addClass("btn btn-danger float-right delete")
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
    name: $bookText.val().trim(),
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
