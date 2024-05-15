const express = require('express');

const { Books, Review, User } = require("../../db/models");


const router = express.Router();

router.get('/:bookId/reviews', async (req, res, next) => {

  const book = await Books.findByPk(req.params.bookId)

  if (!book) {
    return res.status(404).json({
      message: "Book couldn't be found"
    })
  }

  const reviews = await Review.findAll({
    where: { bookId: req.params.bookId },
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      }
    ],
    order: [['createdAt', 'DESC']]
  })

  let reviewList = [];

  reviews.forEach(review => {
    reviewList.push(review.toJSON())
  })

  if (!reviewList.length) {
    res.json({ Reviews: "Be the first to write a review"})
  }

  res.json(reviewList)

})

router.get('/:bookId', async (req, res, next) => {

  const book = await Books.findOne({
    where: { id: req.params.bookId },
    include: [
      {
        model: Review,
        attributes: ['stars']
      }
    ]
  })

  if (!book) {
    const err = Error('Book not found');
    err.message = "Book couldn't be found";
    err.status = 404;
    return next(err)
  } else {
    const bookData = book.toJSON()

    let stars = 0
    bookData.Reviews.forEach(review => {
      stars += review.stars
      bookData.numReviews = bookData.Reviews.length
      if (book.Reviews.length > 1) {
        bookData.avgStarRating = ( stars / bookData.Reviews.length).toFixed(1)
      } else {
        bookData.avgStarRating = review.stars.toFixed(1)
      }
    })

    if (!bookData.numReviews) {
      bookData.numReviews = null
    }
    if (!bookData.avgStarRating) {
      bookData.avgStarRating = "New"
    }

    delete bookData.Reviews

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
