class BookService {
    constructor() {
        // user id null by default need to log in to get user id
        this.userId = null;
        this.loadUser();
    }

    loadUser() {
        const userInfoString = window.localStorage.getItem("project2_user_id_info");
        if (!!userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            if (userInfo.userId && userInfo.dateTimeString) {
                const dateTime = new Date(userInfo.dateTimeString);
                if (new Date() < dateTime) {
                    this.userId = userInfo.userId;
                    this.saveUser();
                }
            }
        }
    }
    saveUser() {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        window.localStorage.setItem("project2_user_id_info", JSON.stringify({
            userId: this.userId,
            dateTimeString: newDate.toISOString()
        }));
    }

    // User
    // userData contains username and password
    login(userData) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/user",
                    type: "GET",
                    data: $.param(userData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    if (!returnData.userId) {
                        reject({
                            error: "empty userId returned"
                        });
                        return;
                    }
                    this.userId = returnData.userId;
                    this.saveUser();
                    resolve({});
                });
        });

        return promise;
    }

    loggedIn() {
        return this.userId !== null;
    }

    // userData contains name, username, and password
    createUser(userData) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/user",
                    type: "POST",
                    data: JSON.stringify(userData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    if (!returnData.id) {
                        reject({
                            error: "empty userId returned"
                        });
                        return;
                    }
                    this.userId = returnData.id;
                    this.saveUser();
                    resolve({});
                });
        });

        return promise;
    }

    // Books
    getBooks() {
        return $.ajax({
            url: "api/books",
            type: "GET",
        });
    }

    createBook(bookData) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            url: "api/books",
            type: "POST",
            data: JSON.stringify(bookData)
        });
    }

    deleteBook(id) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            url: "api/books",
            type: "DELETE",
            data: JSON.stringify({
                id: id
            })
        });
    }

    // Bookmark
    getBookmarks() {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/bookmarks",
                    type: "GET",
                    data: $.param({
                        userId: this.userId
                    })
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // contains bookId, page, and comment
    createBookmark(bookmarkData) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!bookmarkData.bookId) {
                reject({
                    error: "Please provide bookId!"
                });
            }

            if (!bookmarkData.page) {
                reject({
                    error: "Please provide page!"
                });
            }

            if (!bookmarkData.comment) {
                reject({
                    error: "Please provide comment!"
                });
            }

            bookmarkData.userId = this.userId;

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/bookmarks",
                    type: "POST",
                    data: JSON.stringify(bookmarkData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    deleteBookmark(id) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!bookmarkData.id) {
                reject({
                    error: "Please provide id for bookmark!"
                });
            }

            bookmarkData.userId = this.userId;

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/bookmarks",
                    type: "DELETE",
                    data: JSON.stringify(bookmarkData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // AlreadyRead
    getAlreadyRead() {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/already-read",
                    type: "GET",
                    data: $.param({
                        userId: this.userId
                    })
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // contains bookId, and comment
    createAlreadyRead(alreadyReadData) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!alreadyReadData.bookId) {
                reject({
                    error: "Please provide bookId!"
                });
            }

            if (!alreadyReadData.comment) {
                reject({
                    error: "Please provide comment!"
                });
            }

            alreadyReadData.userId = this.userId;

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/already-read",
                    type: "POST",
                    data: JSON.stringify(alreadyReadData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    deleteAlreadyRead(id) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!id) {
                reject({
                    error: "Please provide id for alreadyRead!"
                });
            }

            const alreadyReadData = {
                userId: this.userId,
                id: id,
            };

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/already-read",
                    type: "DELETE",
                    data: JSON.stringify(alreadyReadData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // CurrentlyReading
    getCurrentlyReading() {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/currently-reading",
                    type: "GET",
                    data: $.param({
                        userId: this.userId
                    })
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // contains bookId, and comment
    createCurrentlyReading(currentlyReadingData) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!currentlyReadingData.bookId) {
                reject({
                    error: "Please provide bookId!"
                });
            }

            if (!currentlyReadingData.comment) {
                reject({
                    error: "Please provide comment!"
                });
            }

            currentlyReadingData.userId = this.userId;

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/currently-reading",
                    type: "POST",
                    data: JSON.stringify(currentlyReadingData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    deleteCurrentlyReading(id) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!id) {
                reject({
                    error: "Please provide id for currentlyReading!"
                });
            }

            const currentlyReadingData = {
                userId: this.userId,
                id: id,
            }

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/currently-reading",
                    type: "DELETE",
                    data: JSON.stringify(currentlyReadingData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // Wishlist
    getWishlist() {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/wishlist",
                    type: "GET",
                    data: $.param({
                        userId: this.userId
                    })
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    // contains bookId, order, and comment
    createWishlist(wishlistData) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!wishlistData.bookId) {
                reject({
                    error: "Please provide bookId!"
                });
            }

            if (!wishlistData.comment) {
                reject({
                    error: "Please provide comment!"
                });
            }

            if (!wishlistData.order) {
                reject({
                    error: "Please provide order!"
                });
            }

            wishlistData.userId = this.userId;

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/wishlist",
                    type: "POST",
                    data: JSON.stringify(wishlistData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    deleteWishlist(id) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!id) {
                reject({
                    error: "Please provide id for wishlist!"
                });
            }

            const wishlistData = {
                userId: this.userId,
                id: id,
            };

            $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "api/wishlist",
                    type: "DELETE",
                    data: JSON.stringify(wishlistData)
                })
                .then(returnData => {
                    if (returnData.error) {
                        reject(returnData);
                        return;
                    }
                    resolve(returnData);
                });
        });

        return promise;
    }

    moveWishlistToCurrentlyReading(wishlist) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!wishlist) {
                reject({
                    error: "Please provide wishlist!"
                });
            }

            const currentlyReadingData = {
                bookId: wishlist.book.id,
                comment: wishlist.comment,
            };

            this.deleteWishlist(wishlist.id).then(() => {
                this.createCurrentlyReading(currentlyReadingData).then(() => {
                    resolve();
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });

        return promise;
    }

    moveCurrentlyReadingToAlreadyRead(currentlyReading) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!currentlyReading) {
                reject({
                    error: "Please provide currentlyReading!"
                });
            }

            const alreadyReadData = {
                bookId: currentlyReading.book.id,
                comment: currentlyReading.comment,
            };

            this.deleteCurrentlyReading(currentlyReading.id).then(() => {
                this.createAlreadyRead(alreadyReadData).then(() => {
                    resolve();
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });

        return promise;
    }

    moveAlreadyReadToWishlist(alreadyRead) {
        const promise = new Promise((resolve, reject) => {
            if (!this.loggedIn()) {
                reject({
                    error: "Please login!"
                });
            }

            if (!alreadyRead) {
                reject({
                    error: "Please provide alreadyRead!"
                });
            }

            const wishlistData = {
                bookId: alreadyRead.book.id,
                comment: alreadyRead.comment,
                order: 1,
            };

            this.deleteAlreadyRead(alreadyRead.id).then(() => {
                this.createWishlist(wishlistData).then(() => {
                    resolve();
                }, (err) => {
                    reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });

        return promise;
    }
}

// for testing
/*
var bookService = new BookService();
if (!bookService.loggedIn()) {
    bookService.login({
        username: "allison",
        password: "password"
    }).then(response => {
        console.log(response);
        bookService.getBookmarks().then(response => {
            console.log(response);
        });
        // bookService.createBookmark({bookId: 1, page: Math.floor(Math.random() * 1000), comment: "Heyo!"}).then(response => {
        //     console.log(response);
        // });
        bookService.getAlreadyRead().then(response => {
            console.log(response);
        });
        // bookService.createAlreadyRead({bookId: 1, comment: "Heyo Already Read!"}).then(response => {
        //     console.log(response);
        // });
        bookService.getCurrentlyReading().then(response => {
            console.log(response);
        });
        // bookService.createCurrentlyReading({bookId: 1, comment: "Heyo Currently Reading!"}).then(response => {
        //     console.log(response);
        // });
        bookService.getWishlist().then(response => {
            console.log(response);
        });
        // bookService.createWishlist({bookId: 1, comment: "Heyo Wishlist!", order: 1}).then(response => {
        //     console.log(response);
        // });
    }, error => {
        console.log(error);
    });
} else {
    bookService.createWishlist({bookId: 1, comment: "Heyo Wishlist!", order: 1}).then(response => {
        console.log(response);
        bookService.deleteWishlist(response.id).then(response => {
            console.log(response);
            bookService.getWishlist().then(response => {
                console.log(response);
            });
        });
    });
}
*/
