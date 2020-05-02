/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
// Import our Controllers
const bookController = require("../controllers/bookController.js");

module.exports = function(app) {
  app
    .route("/api/books")
    .get(function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      bookController
        .getBooks()
        .then(library => res.status(200).json(library))
        .catch(e => res.status(400).send(e));
    })

    .post(function(req, res) {
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
      bookController
        .addBook(title)
        .then(book => res.status(200).json(book))
        .catch(e => res.status(400).send(e));
    })

    .delete(function(req, res) {
      //if successful response will be 'complete delete successful'
      bookController
        .deleteBooks()
        .then(queryRes => res.status(200).send(queryRes))
        .catch(e => res.status(400).send(e));
    });

  app
    .route("/api/books/:id")
    .get(function(req, res) {
      var bookid = req.params.id;
      // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      bookController
        .getBook(bookid)
        .then(book => res.status(200).send(book))
        .catch(e => res.status(400).send(e));
    })

    .post(function(req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      bookController
        .updateBook(bookid, comment)
        .then(book => res.status(200).send(book))
        .catch(e => res.status(400).send(e));
    })

    .delete(function(req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      bookController
        .deleteBook(bookid)
        .then(book => res.status(200).send(book))
        .catch(e => res.status(400).send(e));
    });
};
