// Get Data Models
const mongoose = require("mongoose");
const Book = require("../models/Book");

exports.getBooks = async () => {
  try {
    const library = await Book.find({});
    return library.map(book => ({
      _id: book._id,
      title: book.title,
      commentcount: book.comments.length
    }));
  } catch (err) {
    throw err.message;
  }
};

// Add a new book
exports.addBook = async title => {
  if (!title || title === '') {
    throw "missing title";
  }

  try {
    const issue = await Book.create({
      title: title
    });

    return {
      _id: issue._id,
      title: issue.title
    };
  } catch (err) {
    throw err.message;
  }
};

// Delete a car
exports.deleteBooks = async () => {
  try {
    const res = await Book.remove({});

    return `complete delete successful`;
  } catch (err) {
    throw err.message;
  }
};

exports.getBook = async id => {
  if (!id || id === "" || !mongoose.Types.ObjectId.isValid(id)) {
    throw "no valid id provided";
  }

  try {
    const book = await Book.findById(id);
    return book;
  } catch (err) {
    throw "book not found";
  }
};

// Update an existing car
exports.updateBook = async (id, comment) => {
  if (!id || id === "") {
    throw "no id provided";
  }
  
  if (!comment || comment === "") {
    throw "no comment provided";
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {$push: {comments: comment}},
      { useFindAndModify: false }
    );

    return updatedBook;
  } catch (err) {
    throw "could not update " + id;
  }
};

// Delete a car
exports.deleteBook = async id => {
  if (!id || id === "") {
    throw "no id provided";
  }

  try {
    const update = await Book.findByIdAndRemove(id, {
      useFindAndModify: false
    });

    return `delete successful`;
  } catch (err) {
    throw `could not delete ${id}`;
  }
};
