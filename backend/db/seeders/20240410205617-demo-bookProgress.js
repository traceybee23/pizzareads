'use strict';

const { BookProgress } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await BookProgress.bulkCreate([
      {
        userId: 1,
        bookId: 1,
        pagesRead: 313,
        completed: false
      },
      {
        userId: 1,
        bookId: 4,
        pagesRead: 30,
        completed: false
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
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'BookProgresses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
