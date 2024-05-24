const express = require('express');
const https = require('https');
const { requireAuth } = require('../../utils/auth');
const { Books, Review, User } = require("../../db/models");


const router = express.Router();

router.get('/google/:query', async (req, res, next) => {
  const { query } = req.params;
  const startIndex = req.query.startIndex || 0; // Default startIndex is 0
  const maxResults = req.query.maxResults || 10; // Default maxResults is 10
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;


  https.get(url, (response) => {
    let data = '';

    // A chunk of data has been received.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    response.on('end', () => {
      try {
        const apiResponse = JSON.parse(data);
        const books = apiResponse.items.map((item, index) => {
          const volumeInfo = item.volumeInfo;

          return {
            id: item.id,
            title: volumeInfo.title || 'No title available',
            author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
            genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No genre available',
            publicationDate: volumeInfo.publishedDate || 'No publication date available',
            isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.map(id => id.identifier).join(', ') : 'No ISBN available',
            description: volumeInfo.description || 'No description available',
            coverImageUrl: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'No cover image available',
            totalPages: volumeInfo.pageCount || 'No page count available',
          };
        });

        const pageCount = Math.ceil(apiResponse.totalItems / maxResults) || 1; // Calculate total pages based on totalItems and maxResults
        const pageNumber = startIndex
        res.json({ Books: books, pageCount, pageNumber });
      } catch (error) {
        res.status(500).json({ error: 'Error parsing response from Google Books API' });
      }
    });

  }).on('error', (err) => {
    res.status(500).json({ error: 'Error fetching data from Google Books API' });
  });
})


router.post('/:bookId/reviews', requireAuth, async (req, res, next) => {

  const { user } = req;
  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  const bookId = Number(req.params.bookId)

  const { review, stars } = req.body

  const book = await Books.findOne({
    where: { id: bookId },
    include: [
      {
        model: Review,
        attributes: ['userId']
      }
    ]
  })

  if (!book) {
    return res.status(404).json({
      message: "Book couldn't be found"
    })
  }

  try {
    let errors = [];

    book.Reviews.forEach(review => {
      if (review.userId === user.id) {
        const err = new Error("User already has a review for this book")
        errors.push(err)
      }
    })

    if (errors.length) {
      return res.status(500).json({
        "message": "User already has a review for this book"
      })
    }

    const newReview = await Review.create({ userId: user.id, bookId, review, stars })
    res.status(201).json(newReview)
  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }
})

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
    res.json({ Reviews: "New" })
  }

  res.json({ Reviews: reviewList })

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
        bookData.avgStarRating = (stars / bookData.Reviews.length).toFixed(1)
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
