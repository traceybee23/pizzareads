const express = require('express');

const { Books } = require("../../db/models");

const router = express.Router();


router.get('/', async (req, res, next) => {

  let books = await Books.findAll({});

  let booksList = [];

  books.forEach(book => booksList.push(book.toJSON()))

  res.json({ Books: booksList })

})

module.exports = router
