'use strict';

const { BookProgress } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoBookProg = [
  {
    userId: 1,
    bookId: 16,
    pagesRead: 313,
    completed: false
  },
  {
    userId: 1,
    bookId: 17,
    pagesRead: 30,
    completed: false
  },
  {
    userId: 1,
    bookId: 18,
    pagesRead: 227,
    completed: true
  },
  {
    userId: 1,
    bookId: 19,
    pagesRead: 141,
    completed: true
  },
  {
    userId: 1,
    bookId: 20,
    pagesRead: 274,
    completed: true
  },
  {
    userId: 1,
    bookId: 21,
    pagesRead: 481,
    completed: true
  },
  {
    userId: 2,
    bookId: 5,
    pagesRead: 50,
    completed: false
  },
  {
    userId: 3,
    bookId: 5,
    pagesRead: 60,
    completed: false
  },
  {
    userId: 2,
    bookId: 10,
    pagesRead: 55,
    completed: false
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await BookProgress.bulkCreate(demoBookProg)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'BookProgresses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      { [Op.or]: demoBookProg }, {});
  }
};
