const express = require('express');

const { Books } = require("../../db/models");

const router = express.Router();

router.get('/:bookId', async (req, res, next) => {

  const book = await Books.findOne({
    where: { id: req.params.bookId }
  })

  if (!book) {
    const err = Error('Book not found');
    err.message = "Book couldn't be found";
    err.status = 404;
    return next(err)
  } else {
    const bookData = book.toJSON()

    res.json(bookData)
  }
})

router.get('/', async (req, res, next) => {

  let books = await Books.findAll({});

  let booksList = [];

  books.forEach(book => booksList.push(book.toJSON()))

  res.json({ Books: booksList })

})

module.exports = router
